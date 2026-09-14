/**
 * Call the visitor back with a Decibyl worker.
 *
 * A demo lead lands in the form, the site asks our own workspace's front-desk
 * worker to ring the number, and the call outcome lands in the workspace's
 * call log. This is the "Decibyl runs Decibyl" front desk; see
 * docs/gtm/marketing-growth-finance-plan.md §5a.
 *
 * The target is the product's public trigger-call endpoint
 * (POST /public/agent/{uuid}, X-API-Key). It de-duplicates on event_id for 24
 * hours, so a retried request never rings the same person twice.
 */

const REQUEST_TIMEOUT_MS = 4000;
const INDIA_COUNTRY_CODE = '+91';
const INDIA_NATIONAL_LENGTH = 10;

export type CallbackLead = {
  id: string;
  name: string;
  phone: string;
  company?: string | null;
  vertical?: string | null;
  call_volume?: string | null;
  message?: string | null;
  source_page?: string | null;
  utm_campaign?: string | null;
};

export type CallbackRequest = {
  phone_number: string;
  initial_context: Record<string, string>;
  event_id: string;
};

/**
 * Turn what the form accepts (digits, spaces, +, -, brackets) into E.164.
 * A bare 10-digit Indian mobile gets +91; a number with a leading 0 loses it;
 * anything already carrying a + keeps its country code. Returns null when the
 * result is not a plausible number, so the caller can skip the call rather
 * than ring a wrong one.
 */
export function toE164(raw: string): string | null {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15) return null;
  if (hasPlus) return `+${digits}`;
  if (digits.length === INDIA_NATIONAL_LENGTH) return `${INDIA_COUNTRY_CODE}${digits}`;
  if (digits.length === INDIA_NATIONAL_LENGTH + 1 && digits.startsWith('0')) {
    return `${INDIA_COUNTRY_CODE}${digits.slice(1)}`;
  }
  if (digits.length === INDIA_NATIONAL_LENGTH + 2 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  return null;
}

/** Pure: what we send. Kept separate from the fetch so it can be checked. */
export function buildCallbackRequest(lead: CallbackLead): CallbackRequest | null {
  const phone = toE164(lead.phone);
  if (!phone) return null;
  const context: Record<string, string> = { name: lead.name };
  const optional: Array<[string, string | null | undefined]> = [
    ['company', lead.company],
    ['vertical', lead.vertical],
    ['call_volume', lead.call_volume],
    ['message', lead.message],
    ['source_page', lead.source_page],
    ['utm_campaign', lead.utm_campaign],
  ];
  for (const [key, value] of optional) {
    if (value) context[key] = value;
  }
  return { phone_number: phone, initial_context: context, event_id: `lead:${lead.id}` };
}

type CallbackConfig = { apiUrl: string; agentUuid: string; apiKey: string };

function readConfig(): CallbackConfig | null {
  const apiUrl = process.env.DECIBYL_API_URL;
  const agentUuid = process.env.DECIBYL_CALLBACK_AGENT_UUID;
  const apiKey = process.env.DECIBYL_API_KEY;
  if (!apiUrl || !agentUuid || !apiKey) return null;
  return { apiUrl: apiUrl.replace(/\/+$/, ''), agentUuid, apiKey };
}

export type CallbackResult =
  | { status: 'skipped'; reason: 'not-configured' | 'bad-phone' }
  | { status: 'initiated' | 'duplicate'; workflowRunId: number }
  | { status: 'failed'; reason: string };

/**
 * Ask the front-desk worker to call the lead. Never throws: the lead is
 * already saved, and a missed callback is a founder follow-up, not a lost
 * lead. Callers should log the result.
 */
export async function requestCallback(lead: CallbackLead): Promise<CallbackResult> {
  const config = readConfig();
  if (!config) return { status: 'skipped', reason: 'not-configured' };
  const payload = buildCallbackRequest(lead);
  if (!payload) return { status: 'skipped', reason: 'bad-phone' };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${config.apiUrl}/public/agent/${config.agentUuid}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'X-API-Key': config.apiKey },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) return { status: 'failed', reason: `http ${res.status}` };
    const body = (await res.json()) as { status?: string; workflow_run_id?: number };
    const status = body.status === 'duplicate' ? 'duplicate' : 'initiated';
    return { status, workflowRunId: body.workflow_run_id ?? 0 };
  } catch (err) {
    return { status: 'failed', reason: err instanceof Error ? err.message : 'unknown' };
  } finally {
    clearTimeout(timeout);
  }
}

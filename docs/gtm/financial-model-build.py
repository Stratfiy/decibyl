from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter as L

wb = Workbook()
BLUE = Font(name="Arial", color="0000FF"); BLK = Font(name="Arial"); BOLD = Font(name="Arial", bold=True)
GRN = Font(name="Arial", color="008000"); HDR = Font(name="Arial", bold=True, color="FFFFFF")
YEL = PatternFill("solid", fgColor="FFFF00"); DARK = PatternFill("solid", fgColor="1F1F1F"); GREY = PatternFill("solid", fgColor="EDEDED")
INR = '₹#,##0;(₹#,##0);-'; PCT = '0.0%'; NUM = '#,##0;(#,##0);-'; DEC = '₹#,##0.00;(₹#,##0.00);-'

def title(ws, text, sub=None):
    ws["A1"] = text; ws["A1"].font = Font(name="Arial", bold=True, size=14)
    if sub: ws["A2"] = sub; ws["A2"].font = Font(name="Arial", italic=True, color="666666")
def hdr(ws, row, labels, start=1):
    for i, l in enumerate(labels):
        c = ws.cell(row=row, column=start+i, value=l); c.font = HDR; c.fill = DARK; c.alignment = Alignment(horizontal="center", wrap_text=True)
def widths(ws, w):
    for i, x in enumerate(w): ws.column_dimensions[L(i+1)].width = x

# ───────────────────────── Assumptions ─────────────────────────
A = wb.active; A.title = "Assumptions"
title(A, "Decibyl financial model, assumptions", "Blue cells with yellow fill are inputs. Every other sheet computes from here. Dated 14 Sept 2026; sources in column D.")
A["A4"] = "LEGEND"; A["A4"].font = BOLD
A["A5"] = "Input, edit me"; A["A5"].font = BLUE; A["A5"].fill = YEL
A["A6"] = "Formula, do not edit"; A["A6"].font = BLK
A["A7"] = "Link from another sheet"; A["A7"].font = GRN
widths(A, [44, 16, 16, 70])
rows = {}
r = 9
def sec(name):
    global r
    A.cell(row=r, column=1, value=name).font = BOLD; A.cell(row=r, column=1).fill = GREY; r += 1
def inp(key, label, value, fmt=None, note=""):
    global r
    A.cell(row=r, column=1, value=label).font = BLK
    c = A.cell(row=r, column=2, value=value); c.font = BLUE; c.fill = YEL
    if fmt: c.number_format = fmt
    A.cell(row=r, column=4, value=note).font = Font(name="Arial", color="666666")
    rows[key] = r; r += 1
def ref(key): return f"Assumptions!$B${rows[key]}"

sec("General")
inp("fx", "INR per USD", 96, NUM, "data/pricing.ts USD_RATE")
inp("credit_inr", "Value of one credit, ₹", 0.50, DEC, "Pricing decision, 14 Sept: 1 credit = ₹0.50 of composed cost")
inp("opening_cash", "Opening cash, ₹", 500000, INR, "ROADMAP.md: about ₹5L runway. Founder-stated")
inp("razorpay", "Payment fee, % of revenue", 0.024, PCT, "Razorpay 2% + GST; baked into price")
inp("months", "Months modelled", 24, NUM, "Fixed at 24 in the Model sheet")
sec("Plans: price, credits, usage")
for k, label, price, credits, usage, topup, voice_share, churn, nums in [
    ("ev", "Everyday", 999, 2000, 0.60, 0.00, 0.00, 0.08, 0),
    ("bu", "Business", 2999, 5000, 0.70, 0.20, 0.85, 0.05, 1),
    ("gr", "Growth", 7999, 15000, 0.75, 0.25, 0.90, 0.03, 2),
    ("sc", "Scale", 19999, 40000, 0.80, 0.30, 0.90, 0.02, 4)]:
    inp(f"{k}_price", f"{label}: price ₹/month", price, INR, "Pricing decision, 14 Sept")
    inp(f"{k}_credits", f"{label}: credits per month", credits, NUM, "")
    inp(f"{k}_usage", f"{label}: share of plan credits actually used", usage, PCT, "Assumption; measure from the ledger after month 2")
    inp(f"{k}_topup", f"{label}: top-up and overage revenue, % of plan price", topup, PCT, "Assumption; voice plans buy top-ups, text plan does not")
    inp(f"{k}_voice", f"{label}: share of used credits spent on voice", voice_share, PCT, "Everyday has no voice by design")
    inp(f"{k}_churn", f"{label}: monthly churn", churn, PCT, "Assumption; Indian SMB SaaS benchmarks 3 to 8%")
    inp(f"{k}_nums", f"{label}: phone numbers included", nums, NUM, "Pricing ladder")
sec("Cost per credit, what a credit costs us to serve")
inp("voice_cost_min", "Provider cost per Indic voice minute, ₹ (after Sarvam 30%)", 2.78, DEC, "Sarvam page 14 Sept: STT ₹30/hr, TTS ₹3/1k chars at 850 chars/min, 105B LLM, Plivo ₹0.60. List is ₹3.71")
inp("voice_credits_min", "Credits charged per voice minute (Business)", 12, NUM, "Growth 11, Scale 10; blended here at 12 for a conservative COGS")
inp("text_cost_credit", "Provider cost per text credit, ₹", 0.03, DEC, "Gemini Flash-Lite tokens per reply plus DB; a reply sells for 1 credit = ₹0.50")
inp("number_cost", "Our cost per phone number, ₹/month", 300, INR, "Assumption: Plivo India DID rental; customer pays ₹559 for extras")
inp("saas_voice_acct", "Third-party SaaS per voice account, ₹/month", 60, INR, "Composio, Resend, verification share. Session estimate 14 Sept")
inp("saas_text_acct", "Third-party SaaS per text account, ₹/month", 5, INR, "")
inp("sarvam_credit", "Sarvam free credit, ₹/month", 25000, INR, "Founder-stated: ₹25,000 a month for 6 months, then 30% off forever")
inp("sarvam_months", "Months the Sarvam credit runs", 6, NUM, "")
inp("sarvam_speech_share", "Share of voice provider cost that is Sarvam speech", 0.77, PCT, "STT 0.35 + TTS 1.79 of ₹2.78")
sec("Knowledge base and embeddings")
for k, label, cap in [("ev","Everyday",500),("bu","Business",2000),("gr","Growth",10000),("sc","Scale",50000)]:
    inp(f"{k}_kbcap", f"{label}: knowledge pages included", cap, NUM, "Proposed cap; Free plan 50 pages")
inp("kb_pages_acct", "Average pages uploaded per account", 150, NUM, "Assumption")
inp("embed_cost_page", "Embedding compute per page, ₹ (self-hosted bge-m3)", 0.02, DEC, "CPU time on the embeddings service; no vendor fee")
inp("ocr_cost_page", "OCR per scanned page, ₹ (Sarvam Document AI)", 0.50, DEC, "Sarvam page 14 Sept: digitisation ₹0.50/page")
inp("scanned_share", "Share of uploaded pages that are scanned", 0.30, PCT, "Assumption")
inp("storage_cost_page", "Vector storage per page, ₹/month", 0.002, '₹0.000', "pgvector rows on RDS; negligible")
inp("kb_over_typed", "Credits per 10 typed pages over cap", 1, NUM, "Pricing decision")
inp("kb_over_scanned", "Credits per scanned page over cap", 1, NUM, "Pricing decision")
sec("Acquisition: ads, organic, champions")
inp("cps", "Ads cost per free signup, ₹", 150, INR, "Assumption: Meta/Google India SMB; measure in month 1")
inp("conv", "Free signup to paid conversion", 0.08, PCT, "India self-serve baseline 8%, top quartile 28% (richautomate.in, 2026)")
inp("mix_ev", "Paid mix: Everyday", 0.50, PCT, "Assumption")
inp("mix_bu", "Paid mix: Business", 0.35, PCT, "")
inp("mix_gr", "Paid mix: Growth", 0.12, PCT, "")
inp("mix_sc", "Paid mix: Scale", 0.03, PCT, "")
inp("ads_1", "Ads budget months 1 to 6, ₹/month", 25000, INR, "Bootstrapped plan, 14 Sept: step up only after CAC and conversion are measured")
inp("ads_2", "Ads budget months 7 to 12, ₹/month", 100000, INR, "Funded from revenue")
inp("ads_3", "Ads budget months 13 to 24, ₹/month", 200000, INR, "")
inp("org_base", "Organic free signups in month 1", 20, NUM, "SEO pages live; jobs and integrations pages shipped 14 Sept")
inp("org_growth", "Organic signups added per month", 15, NUM, "Assumption: compounding programmatic pages")
inp("champ_start", "Champions start in month", 4, NUM, "industry-champions.md")
inp("champ_n", "Number of champions", 2, NUM, "")
inp("champ_closes", "Business accounts closed per champion per month", 3, NUM, "Target from industry-champions.md")
inp("champ_retainer", "Champion retainer, ₹/month each", 0, INR, "Bootstrapped: commission only; ₹15k to ₹25k once revenue supports it")
inp("champ_comm", "Champion commission, % of their accounts' revenue", 0.25, PCT, "Paid through partner statements")
sec("Infrastructure, steps with monthly call minutes")
inp("infra_s0", "Stage 0 infra, ₹/month (up to 50k minutes)", 35000, INR, "m7i.xlarge, RDS, ElastiCache, S3; session estimate")
inp("infra_s1", "Stage 1 infra, ₹/month (up to 300k minutes)", 100000, INR, "Control + 2 media nodes, ALB, Multi-AZ")
inp("infra_s2", "Stage 2 infra, ₹/month (up to 1M minutes)", 350000, INR, "Autoscaling media, read replica, Redis cluster")
inp("infra_extra", "Above 1M: extra ₹/month per additional 1M minutes", 250000, INR, "Linear extension")
inp("infra_t1", "Stage 1 threshold, minutes/month", 50000, NUM, "")
inp("infra_t2", "Stage 2 threshold, minutes/month", 300000, NUM, "")
inp("infra_t3", "Stage 3 threshold, minutes/month", 1000000, NUM, "")
inp("saas_fixed_s0", "Fixed SaaS at stage 0, ₹/month", 6000, INR, "Composio, Resend, Cloudflare, Langfuse base plans")
inp("saas_fixed_s1", "Fixed SaaS at stage 1+, ₹/month", 25000, INR, "")
sec("Team")
inp("pay_1", "Payroll months 1 to 6, ₹/month", 200000, INR, "Bootstrapped: founder + 1 engineer")
inp("pay_2", "Payroll months 7 to 12, ₹/month", 300000, INR, "Second engineer once EBITDA is positive")
inp("pay_3", "Payroll months 13 to 24, ₹/month", 500000, INR, "")

# ───────────────────────── Plans (unit economics) ─────────────────────────
P = wb.create_sheet("Plans")
title(P, "Unit economics per plan, per customer per month", "All formulas from Assumptions. Gross margin is after provider cost, numbers, third-party SaaS and payment fees.")
hdr(P, 4, ["Line", "Everyday", "Business", "Growth", "Scale"])
widths(P, [46, 16, 16, 16, 16])
plans = ["ev", "bu", "gr", "sc"]
lines = [
 ("Plan price ₹", lambda k: f"={ref(k+'_price')}", INR),
 ("Top-up and overage revenue ₹", lambda k: f"={ref(k+'_price')}*{ref(k+'_topup')}", INR),
 ("Revenue per customer ₹", lambda k: None, INR),
 ("Credits used", lambda k: f"={ref(k+'_credits')}*{ref(k+'_usage')}*(1+{ref(k+'_topup')})", NUM),
 ("Voice credits used", lambda k: None, NUM),
 ("Text credits used", lambda k: None, NUM),
 ("Voice minutes", lambda k: None, NUM),
 ("Voice provider cost ₹", lambda k: None, INR),
 ("Text provider cost ₹", lambda k: None, INR),
 ("Phone numbers cost ₹", lambda k: f"={ref(k+'_nums')}*{ref('number_cost')}", INR),
 ("Knowledge base cost ₹", lambda k: f"={ref('kb_pages_acct')}*({ref('embed_cost_page')}+{ref('storage_cost_page')}+{ref('scanned_share')}*{ref('ocr_cost_page')})/12", INR),
 ("Third-party SaaS ₹", lambda k: (f"={ref('saas_text_acct')}" if k=="ev" else f"={ref('saas_voice_acct')}"), INR),
 ("Payment fee ₹", lambda k: None, INR),
 ("Total cost to serve ₹", lambda k: None, INR),
 ("Gross profit ₹", lambda k: None, INR),
 ("Gross margin %", lambda k: None, PCT),
 ("Monthly churn", lambda k: f"={ref(k+'_churn')}", PCT),
 ("Expected lifetime, months", lambda k: None, '0.0'),
 ("Lifetime gross profit ₹", lambda k: None, INR),
 ("Knowledge pages included", lambda k: f"={ref(k+'_kbcap')}", NUM),
]
for i, (label, f, fmt) in enumerate(lines):
    row = 5 + i; P.cell(row=row, column=1, value=label).font = BLK
    for j, k in enumerate(plans):
        col = 2 + j; C = L(col)
        v = f(k)
        if label == "Revenue per customer ₹": v = f"={C}5+{C}6"
        if label == "Voice credits used": v = f"={C}8*{ref(k+'_voice')}"
        if label == "Text credits used": v = f"={C}8-{C}9"
        if label == "Voice minutes": v = f"={C}9/{ref('voice_credits_min')}"
        if label == "Voice provider cost ₹": v = f"={C}11*{ref('voice_cost_min')}"
        if label == "Text provider cost ₹": v = f"={C}10*{ref('text_cost_credit')}"
        if label == "Payment fee ₹": v = f"={C}7*{ref('razorpay')}"
        if label == "Total cost to serve ₹": v = f"=SUM({C}12:{C}17)"
        if label == "Gross profit ₹": v = f"={C}7-{C}18"
        if label == "Gross margin %": v = f"=IF({C}7=0,0,{C}19/{C}7)"
        if label == "Expected lifetime, months": v = f"=IF({C}21=0,0,1/{C}21)"
        if label == "Lifetime gross profit ₹": v = f"={C}19*{C}22"
        c = P.cell(row=row, column=col, value=v); c.number_format = fmt
        c.font = GRN if (v and "Assumptions!" in v and v.count("!")==1 and "*" not in v and "/" not in v and "+" not in v) else BLK
P.cell(row=27, column=1, value="Row references: 5 price, 6 top-up, 7 revenue, 8 credits used, 9 voice credits, 10 text credits, 11 minutes, 12 voice cost, 13 text cost, 14 numbers, 15 KB, 16 SaaS, 17 fee, 18 total cost, 19 gross profit").font = Font(name="Arial", italic=True, color="666666")

# ───────────────────────── Model (24 months) ─────────────────────────
M = wb.create_sheet("Model")
title(M, "Monthly model, 24 months", "Customers by plan, revenue, cost to serve, infrastructure that steps with call minutes, acquisition, payroll, EBITDA, cash and breakeven.")
widths(M, [40] + [13]*24)
hdr(M, 4, ["Line"] + [f"M{m}" for m in range(1, 25)])
R = {}
labels = [
 "month", "ads_budget", "ads_signups", "org_signups", "signups", "new_paid",
 "new_ev", "new_bu", "new_gr", "new_sc", "champ_new",
 "cust_ev", "cust_bu", "cust_gr", "cust_sc", "cust_champ", "cust_total",
 "rev_ev", "rev_bu", "rev_gr", "rev_sc", "rev_champ", "revenue",
 "cts_ev", "cts_bu", "cts_gr", "cts_sc", "cts_champ", "cost_to_serve_gross", "sarvam_offset", "cost_to_serve",
 "gross_profit", "gross_margin",
 "minutes", "infra", "saas_fixed", "payroll", "champ_retainers", "champ_commission", "ads",
 "opex", "ebitda", "cum_cash", "breakeven",
]
names = {
 "month":"Month number","ads_budget":"Ads budget ₹","ads_signups":"Free signups from ads","org_signups":"Organic free signups","signups":"Total free signups","new_paid":"New paid customers from self-serve",
 "new_ev":"New Everyday","new_bu":"New Business","new_gr":"New Growth","new_sc":"New Scale","champ_new":"New Business via champions",
 "cust_ev":"Customers: Everyday","cust_bu":"Customers: Business","cust_gr":"Customers: Growth","cust_sc":"Customers: Scale","cust_champ":"Customers: Business (champion-sourced)","cust_total":"Paying customers, total",
 "rev_ev":"Revenue: Everyday ₹","rev_bu":"Revenue: Business ₹","rev_gr":"Revenue: Growth ₹","rev_sc":"Revenue: Scale ₹","rev_champ":"Revenue: champion accounts ₹","revenue":"REVENUE ₹",
 "cts_ev":"Cost to serve: Everyday ₹","cts_bu":"Cost to serve: Business ₹","cts_gr":"Cost to serve: Growth ₹","cts_sc":"Cost to serve: Scale ₹","cts_champ":"Cost to serve: champion accounts ₹","cost_to_serve_gross":"Cost to serve before Sarvam credit ₹","sarvam_offset":"Sarvam free credit applied ₹","cost_to_serve":"COST TO SERVE ₹",
 "gross_profit":"GROSS PROFIT ₹","gross_margin":"Gross margin %",
 "minutes":"Voice minutes this month","infra":"Infrastructure ₹ (auto-scaled by minutes)","saas_fixed":"Fixed SaaS ₹","payroll":"Payroll ₹","champ_retainers":"Champion retainers ₹","champ_commission":"Champion commission ₹","ads":"Ads spend ₹",
 "opex":"OPERATING EXPENSES ₹","ebitda":"EBITDA ₹","cum_cash":"Cash at month end ₹","breakeven":"Cumulative cash positive?",
}
for i, key in enumerate(labels):
    R[key] = 5 + i
    c = M.cell(row=R[key], column=1, value=names[key]); c.font = BOLD if key in ("revenue","cost_to_serve","gross_profit","opex","ebitda","cum_cash","cust_total") else BLK
    if key in ("revenue","cost_to_serve","gross_profit","opex","ebitda","cum_cash"): c.fill = GREY
def rr(key, m): return f"{L(m+1)}{R[key]}"
for m in range(1, 25):
    C = L(m+1); Pc = L(m)  # current col, previous col
    first = (m == 1)
    f = {}
    f["month"] = m
    f["ads_budget"] = f"=IF({C}{R['month']}<=6,{ref('ads_1')},IF({C}{R['month']}<=12,{ref('ads_2')},{ref('ads_3')}))"
    f["ads_signups"] = f"=IF({ref('cps')}=0,0,{C}{R['ads_budget']}/{ref('cps')})"
    f["org_signups"] = f"={ref('org_base')}+{ref('org_growth')}*({C}{R['month']}-1)"
    f["signups"] = f"={C}{R['ads_signups']}+{C}{R['org_signups']}"
    f["new_paid"] = f"={C}{R['signups']}*{ref('conv')}"
    for k in plans: f[f"new_{k}"] = f"={C}{R['new_paid']}*{ref('mix_'+k)}"
    f["champ_new"] = f"=IF({C}{R['month']}>={ref('champ_start')},{ref('champ_n')}*{ref('champ_closes')},0)"
    for k in plans:
        prev = "0" if first else f"{Pc}{R['cust_'+k]}"
        f[f"cust_{k}"] = f"={prev}*(1-{ref(k+'_churn')})+{C}{R['new_'+k]}"
    prev = "0" if first else f"{Pc}{R['cust_champ']}"
    f["cust_champ"] = f"={prev}*(1-{ref('bu_churn')})+{C}{R['champ_new']}"
    f["cust_total"] = f"=SUM({C}{R['cust_ev']}:{C}{R['cust_champ']})"
    for j, k in enumerate(plans):
        col = L(2+j)
        f[f"rev_{k}"] = f"={C}{R['cust_'+k]}*Plans!${col}$7"
        f[f"cts_{k}"] = f"={C}{R['cust_'+k]}*Plans!${col}$18"
    f["rev_champ"] = f"={C}{R['cust_champ']}*Plans!$C$7"
    f["revenue"] = f"=SUM({C}{R['rev_ev']}:{C}{R['rev_champ']})"
    f["cts_champ"] = f"={C}{R['cust_champ']}*Plans!$C$18"
    f["cost_to_serve_gross"] = f"=SUM({C}{R['cts_ev']}:{C}{R['cts_champ']})"
    voice_cost = f"({C}{R['cust_bu']}*Plans!$C$12+{C}{R['cust_gr']}*Plans!$D$12+{C}{R['cust_sc']}*Plans!$E$12+{C}{R['cust_champ']}*Plans!$C$12)"
    f["sarvam_offset"] = f"=IF({C}{R['month']}<={ref('sarvam_months')},MIN({ref('sarvam_credit')},{voice_cost}*{ref('sarvam_speech_share')}),0)"
    f["cost_to_serve"] = f"={C}{R['cost_to_serve_gross']}-{C}{R['sarvam_offset']}"
    f["gross_profit"] = f"={C}{R['revenue']}-{C}{R['cost_to_serve']}"
    f["gross_margin"] = f"=IF({C}{R['revenue']}=0,0,{C}{R['gross_profit']}/{C}{R['revenue']})"
    f["minutes"] = f"={C}{R['cust_bu']}*Plans!$C$11+{C}{R['cust_gr']}*Plans!$D$11+{C}{R['cust_sc']}*Plans!$E$11+{C}{R['cust_champ']}*Plans!$C$11"
    mm = f"{C}{R['minutes']}"
    f["infra"] = f"=IF({mm}<={ref('infra_t1')},{ref('infra_s0')},IF({mm}<={ref('infra_t2')},{ref('infra_s1')},IF({mm}<={ref('infra_t3')},{ref('infra_s2')},{ref('infra_s2')}+{ref('infra_extra')}*({mm}-{ref('infra_t3')})/1000000)))"
    f["saas_fixed"] = f"=IF({mm}<={ref('infra_t1')},{ref('saas_fixed_s0')},{ref('saas_fixed_s1')})"
    f["payroll"] = f"=IF({C}{R['month']}<=6,{ref('pay_1')},IF({C}{R['month']}<=12,{ref('pay_2')},{ref('pay_3')}))"
    f["champ_retainers"] = f"=IF({C}{R['month']}>={ref('champ_start')},{ref('champ_n')}*{ref('champ_retainer')},0)"
    f["champ_commission"] = f"={C}{R['rev_champ']}*{ref('champ_comm')}"
    f["ads"] = f"={C}{R['ads_budget']}"
    f["opex"] = f"=SUM({C}{R['infra']}:{C}{R['ads']})"
    f["ebitda"] = f"={C}{R['gross_profit']}-{C}{R['opex']}"
    prev_cash = ref('opening_cash') if first else f"{Pc}{R['cum_cash']}"
    f["cum_cash"] = f"={prev_cash}+{C}{R['ebitda']}"
    f["breakeven"] = f'=IF({C}{R["ebitda"]}>=0,"EBITDA +","")'
    for key, v in f.items():
        c = M.cell(row=R[key], column=m+1, value=v); c.font = BLK
        c.number_format = PCT if key == "gross_margin" else (NUM if key in ("month","ads_signups","org_signups","signups","new_paid","new_ev","new_bu","new_gr","new_sc","champ_new","cust_ev","cust_bu","cust_gr","cust_sc","cust_champ","cust_total","minutes") else INR)
        if key in ("revenue","cost_to_serve","gross_profit","opex","ebitda","cum_cash"): c.font = BOLD; c.fill = GREY
# summary block
S = R["breakeven"] + 2
M.cell(row=S, column=1, value="SUMMARY").font = BOLD
M.cell(row=S+1, column=1, value="First month with positive EBITDA").font = BLK
M.cell(row=S+1, column=2, value=f'=IFERROR(MATCH("EBITDA +",$B${R["breakeven"]}:$Y${R["breakeven"]},0),"not within 24 months")').font = BLK
M.cell(row=S+2, column=1, value="Lowest cash balance ₹ (peak funding need if negative)").font = BLK
M.cell(row=S+2, column=2, value=f"=MIN($B${R['cum_cash']}:$Y${R['cum_cash']})").number_format = INR
M.cell(row=S+3, column=1, value="Paying customers at month 24").font = BLK
M.cell(row=S+3, column=2, value=f"=$Y${R['cust_total']}").number_format = NUM
M.cell(row=S+4, column=1, value="Monthly revenue at month 24 ₹").font = BLK
M.cell(row=S+4, column=2, value=f"=$Y${R['revenue']}").number_format = INR
M.cell(row=S+5, column=1, value="Revenue needed per month to cover opex at month 24, at current gross margin ₹").font = BLK
M.cell(row=S+5, column=2, value=f"=IF($Y${R['gross_margin']}=0,0,$Y${R['opex']}/$Y${R['gross_margin']})").number_format = INR
M.cell(row=S+6, column=1, value="Blended CAC from ads ₹ (ads spend / new paid from self-serve, month 24)").font = BLK
M.cell(row=S+6, column=2, value=f"=IF($Y${R['new_paid']}=0,0,$Y${R['ads']}/$Y${R['new_paid']})").number_format = INR
M.freeze_panes = "B5"

# ───────────────────────── Balance sheet ─────────────────────────
B = wb.create_sheet("BalanceSheet")
title(B, "Balance sheet snapshot, end of each month", "Simplified: prepaid SaaS has no receivables; unused prepaid credits are a liability (deferred revenue). No debt, no fixed assets, no tax.")
widths(B, [44] + [13]*24)
hdr(B, 4, ["Line"] + [f"M{m}" for m in range(1, 25)])
brows = ["Cash ₹", "Total assets ₹", "Deferred revenue: unused prepaid credits ₹", "Total liabilities ₹", "Equity (assets less liabilities) ₹", "Runway at this month's burn, months"]
for i, lab in enumerate(brows):
    B.cell(row=5+i, column=1, value=lab).font = BOLD if i in (1,3,4) else BLK
for m in range(1, 25):
    C = L(m+1)
    B.cell(row=5, column=m+1, value=f"=Model!{C}{R['cum_cash']}").font = GRN
    B.cell(row=6, column=m+1, value=f"={C}5").font = BLK
    deferred = "+".join([f"Model!{C}{R['cust_'+k]}*{ref(k+'_price')}*(1-{ref(k+'_usage')})" for k in plans] + [f"Model!{C}{R['cust_champ']}*{ref('bu_price')}*(1-{ref('bu_usage')})"])
    B.cell(row=7, column=m+1, value=f"={deferred}").font = BLK
    B.cell(row=8, column=m+1, value=f"={C}7").font = BLK
    B.cell(row=9, column=m+1, value=f"={C}6-{C}8").font = BLK
    B.cell(row=10, column=m+1, value=f"=IF(Model!{C}{R['ebitda']}>=0,\"profitable\",IF({C}5<=0,0,{C}5/-Model!{C}{R['ebitda']}))").font = BLK
    for rw in range(5, 10): B.cell(row=rw, column=m+1).number_format = INR
    B.cell(row=10, column=m+1).number_format = '0.0'
B.freeze_panes = "B5"

# ───────────────────────── Knowledge ─────────────────────────
K = wb.create_sheet("Knowledge")
title(K, "Knowledge base caps, embedding cost and what we charge", "Embeddings run on our own CPU (bge-m3), so the cost is compute and storage, not a vendor fee. Scanned pages go through Sarvam OCR.")
widths(K, [44, 16, 16, 16, 16])
hdr(K, 4, ["Line", "Everyday", "Business", "Growth", "Scale"])
klines = ["Pages included", "Cost to us of the included pages ₹ (one-time)", "Storage of included pages ₹/month", "Credits charged per 10 typed pages over cap", "Credits charged per scanned page over cap", "Our cost per scanned page over cap ₹", "Our cost per 10 typed pages over cap ₹", "Margin per scanned page over cap ₹", "Margin per 10 typed pages over cap ₹"]
for i, lab in enumerate(klines): K.cell(row=5+i, column=1, value=lab).font = BLK
for j, k in enumerate(plans):
    C = L(2+j)
    K.cell(row=5, column=2+j, value=f"={ref(k+'_kbcap')}").font = GRN
    K.cell(row=6, column=2+j, value=f"={C}5*({ref('embed_cost_page')}+{ref('scanned_share')}*{ref('ocr_cost_page')})").number_format = INR
    K.cell(row=7, column=2+j, value=f"={C}5*{ref('storage_cost_page')}").number_format = DEC
    K.cell(row=8, column=2+j, value=f"={ref('kb_over_typed')}").font = GRN
    K.cell(row=9, column=2+j, value=f"={ref('kb_over_scanned')}").font = GRN
    K.cell(row=10, column=2+j, value=f"={ref('ocr_cost_page')}+{ref('embed_cost_page')}").number_format = DEC
    K.cell(row=11, column=2+j, value=f"=10*{ref('embed_cost_page')}").number_format = DEC
    K.cell(row=12, column=2+j, value=f"={C}9*{ref('credit_inr')}-{C}10").number_format = DEC
    K.cell(row=13, column=2+j, value=f"={C}8*{ref('credit_inr')}-{C}11").number_format = DEC
K.cell(row=15, column=1, value="Notes").font = BOLD
K.cell(row=16, column=1, value="Query-time embedding is inside the 2-credit knowledge answer. Re-embedding on a model change is free. Free plan: 50 pages, no OCR.").font = Font(name="Arial", color="666666")

wb.save("Decibyl-Financial-Model.xlsx"); print("saved")

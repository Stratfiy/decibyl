import type { Metadata } from 'next';
import { LeadForm } from '@/components/forms/LeadForm';
import { pageMetadata } from '@/lib/seo';
import s from '@/components/marketing/action-home.module.css';
export const metadata: Metadata = pageMetadata({title:'Join the waitlist',description:'Free, invite-only early access to Decibyl. Join the waitlist for personal or business use. Get approved, receive your invite and start using your bots.',path:'/waitlist',ogTitle:'Your next “done” starts here.'});
export default function WaitlistPage(){return <div className={s.home}><section className={s.waitlist}><div><span className={s.accessBadge}><span className={s.liveDot}/> FREE EARLY ACCESS · INVITE ONLY</span><h1>A little less busy.<br/>A little more you.</h1><p>Join the Decibyl waitlist. Bots for your everyday life and your business, ready to help with the boring work.</p><ol><li>01 &nbsp; Join the list with your email.</li><li>02 &nbsp; Get approved and receive your invitation.</li><li>03 &nbsp; Give your first bot a job.</li></ol><small>Already invited? <a href="https://app.decibyl.ai/auth/signup">Activate your account ↗</a></small></div><LeadForm variant="waitlist"/></section></div>}

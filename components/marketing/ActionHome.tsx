'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import s from './action-home.module.css';

const jobs = {
  personal: [
    { title: 'Turn my notes into a plan', tag: 'A little less life admin', request: 'Turn these messy notes into a clear plan for my week.', steps: ['Reading your notes', 'Finding the priorities', 'Putting a plan together'], result: 'Your week. A little more organised.', detail: 'A clear plan, with the next steps ready for you.', icon: '✳', color: 'pink' },
    { title: 'Research it for me', tag: 'Skip the twenty open tabs', request: 'Compare these options and tell me what I should know.', steps: ['Understanding your brief', 'Comparing the options', 'Preparing your summary'], result: 'The research, ready to read.', detail: 'Key differences and a useful summary in one place.', icon: '↗', color: 'blue' },
    { title: 'Give me my daily brief', tag: 'Start one step ahead', request: 'Put together a morning brief from my connected tools.', steps: ['Checking your connected apps', 'Collecting what matters', 'Writing your morning brief'], result: 'Your morning, made simpler.', detail: 'The updates you need, without the app hopping.', icon: '☀', color: 'yellow' },
  ],
  business: [
    { title: 'Follow up with leads', tag: 'Keep the conversation going', request: 'Follow up with new enquiries and update our CRM.', steps: ['Checking new enquiries', 'Following your approved instructions', 'Updating the customer record'], result: 'Follow-ups handled. Team in the loop.', detail: 'A record of the action and what needs your attention.', icon: '↗', color: 'green' },
    { title: 'Handle customer calls', tag: 'A helpful voice for your business', request: 'Answer customer questions and help book appointments.', steps: ['Using your business knowledge', 'Helping the customer', 'Recording the next step'], result: 'A conversation that moves things forward.', detail: 'Voice, context and the next action, working together.', icon: '◖', color: 'pink' },
    { title: 'Get the report ready', tag: 'Make reporting feel lighter', request: 'Bring our weekly updates together into a team report.', steps: ['Reading your connected sources', 'Pulling together the updates', 'Preparing the team report'], result: 'The weekly update. Already organised.', detail: 'One report your whole team can work from.', icon: '▤', color: 'blue' },
  ],
};

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Bot({ small = false }: { small?: boolean }) {
  return <div className={`${s.bot} ${small ? s.botSmall : ''}`} aria-hidden="true"><i /><i /><span /></div>;
}
const faqs = [
  ['Who is Decibyl for?', 'For you, your business, or your team. Use the same platform for personal research and everyday tasks, or connect it to your business tools for repeatable work.'],
  ['Is Decibyl free right now?', 'Yes. Decibyl is free during early access and access is invite only. Join the waitlist; once approved, you’ll receive an invitation to start using it. Usage allowances apply.'],
  ['How do I get access?', 'Join the waitlist with your email. We review requests and invite approved users. Already received an invite? Use your invite code to create your account.'],
  ['Can I build my own bot?', 'Yes. Start with a ready-made agent or describe the work you want it to do. Add the knowledge, connected tools and instructions it needs, and use the workflow canvas for more control.'],
  ['What stays in my control?', 'You choose the connected tools and access you give your agents. Set instructions and approval rules for the work they do. Available actions depend on your agent’s setup and permissions.'],
];

export function ActionHome() {
  const root = useRef<HTMLDivElement>(null);
  const [demoVisible, setDemoVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.setAttribute('data-visible', 'true');
      if (entry.target.id === 'see-it-work') setDemoVisible(true);
      observer.unobserve(entry.target);
    }), { threshold: 0.15 });
    root.current?.querySelectorAll('section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const [audience, setAudience] = useState<'personal' | 'business'>('personal');
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const job = jobs[audience][active];
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(4); return; }
    if (!playing || !demoVisible || step >= 4) return;
    const timer = window.setTimeout(() => setStep(value => value + 1), step === 3 ? 4200 : 2400);
    return () => window.clearTimeout(timer);
  }, [playing, audience, active, demoVisible, step]);
  function choose(kind: 'personal' | 'business') { setAudience(kind); setActive(0); setStep(0); }
  return <div ref={root} className={s.home}>
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroCenter}>
        <a href="#early-access" className={s.accessBadge}>Free early access <span>·</span> Invite only <Arrow /></a>
        <h1 id="hero-title">Your life.<br />Less busywork.</h1>
        <p>AI that gets things done.<br />For you. For your business. For the time back.</p>
        <div className={s.heroActions}><Link href="/waitlist" className={s.primary}>Join the waitlist <Arrow /></Link><a href="#see-it-work" className={s.secondary}>Meet Decibyl <span aria-hidden="true">↓</span></a></div>
      </div>
      <div className={s.collage} aria-label="More time for life and your business">
        <div className={s.photoPersonal}><Image src="/images/home/more-life.webp" alt="A woman enjoying a quiet moment at a café" fill priority sizes="(max-width: 768px) 90vw, 55vw" /></div>
        <div className={s.photoBusiness}><Image src="/images/home/more-life.webp" alt="Two business owners sharing ideas in their studio" fill priority sizes="(max-width: 768px) 90vw, 55vw" /></div>
        <div className={s.helloSticker}><Bot /><span>hi, I’m Decibyl.</span></div>
        <span className={s.star} aria-hidden="true">✳</span>
      </div>
    </section>

    <section className={s.tasks} id="see-it-work" aria-labelledby="tasks-title">
      <div className={s.sectionTop}><div><h2 id="tasks-title">What’s on your list?</h2></div><div className={s.switch} aria-label="Choose example audience"><button aria-pressed={audience==='personal'} onClick={()=>choose('personal')}>For you</button><button aria-pressed={audience==='business'} onClick={()=>choose('business')}>For business</button></div></div>
      <p className={s.intro}>The little things that fill your day. Hand a few over.</p>
      <div className={s.demoGrid}><div className={s.jobList}>{jobs[audience].map((item,i)=><button key={item.title} onClick={()=>{setActive(i);setStep(0);}} aria-pressed={active===i} className={active===i?s.jobActive:''}><span className={`${s.tile} ${s[item.color]}`}>{item.icon}</span><span><strong>{item.title}</strong><small>{item.tag}</small></span><span aria-hidden="true">↗</span></button>)}<p>Pick a task. See how it could work.</p></div>
        <div className={s.demo} aria-label="Illustrative task demo"><div className={s.demoBar}><span><Bot small /> Decibyl</span><span>INTERACTIVE EXAMPLE <button onClick={()=>{ if(step>=4){setStep(0);setPlaying(true);}else setPlaying(v=>!v);}} aria-label={step>=4?'Replay demo':playing?'Pause demo animation':'Play demo animation'}>{step>=4?'↻':playing?'Ⅱ':'▶'}</button></span></div><div className={s.request} key={`${audience}-${active}`}>{job.request}</div><div className={s.steps}>{job.steps.map((text,i)=><div key={text} data-done={step>i} data-active={step===i}><span>{step>i?'✓':i+1}</span>{text}<small>{step>i?'Done':step===i?'Working…':''}</small></div>)}</div><div className={s.result} data-ready={step>=3}><span className={s.tick}>✓</span><div><strong>{step>=3?job.result:'A little work happening in the background.'}</strong><p>{step>=3?job.detail:'From your request to a useful result.'}</p></div></div><p className={s.demoDisclaimer}>Illustrative workflow. Actions depend on connected apps and permissions.</p></div>
      </div>
    </section>

    <section className={s.audiences} aria-label="Personal and business">
      <header><h2>One assistant.<br />Both sides of your life.</h2><p>Because your to-do list doesn’t stop at work.</p></header>
      <article id="for-you" className={s.personal}>
        <div className={s.audiencePhoto}><Image src="/images/home/more-life.webp" alt="A peaceful moment away from the to-do list" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
        <div className={s.audienceCopy}><span className={s.eyebrow}>FOR YOU</span><h2>Less life admin.<br />More actual life.</h2><p>Research the options. Untangle your notes. Get your day in order. Make room for the things you want to do.</p><Link href="/waitlist?vertical=personal" className={s.textLink}>Find your everyday sidekick <Arrow /></Link></div>
      </article>
      <article id="for-business" className={s.business}>
        <div className={s.audienceCopy}><span className={s.eyebrow}>FOR BUSINESS</span><h2>Small team.<br />More follow-through.</h2><p>Follow up with leads. Help customers. Prepare the report. Give your team a helping hand with the work that keeps coming.</p><Link href="/waitlist?vertical=business" className={s.textLink}>Give your team a hand <Arrow /></Link></div>
        <div className={s.audiencePhoto}><Image src="/images/home/more-life.webp" alt="A creative team discussing their next project" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
      </article>
    </section>
    <section className={s.platform}><h2>It remembers.<br />It connects.<br /><span>It gets to work.</span></h2><div><p>Your context, your tools and your instructions. Together, in an assistant that can take the next step.</p><Link href="/platform" className={s.textLink}>Explore the platform <Arrow /></Link><ul><li>Personal memory &amp; shared knowledge</li><li>Voice &amp; connected tools</li><li>Scheduled routines &amp; custom agents</li></ul></div></section>

    <section className={s.control}><div><h2>Give it work.<br />Keep the say-so.</h2></div><div>{[['01','You choose the connections.','Give your bots the tools and context they need for the job.'],['02','You set the boundaries.','Use instructions and approval rules to control how work gets done.'],['03','You see what happened.','Follow tasks, review results and step in when your judgment is needed.']].map(([n,title,body])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>

    <section className={s.access} id="early-access"><div className={s.accessIntro}><span className={s.accessBadge}><span className={s.liveDot} /> NOW INVITING EARLY USERS</span><h2>Your next “done”<br />starts here.</h2><p>Decibyl is free during early access.<br />For people with a lot on their plate. And teams, too.</p><Link href="/waitlist" className={s.primary}>Join the waitlist <Arrow /></Link><small>Already have an invite? <a href="https://app.decibyl.ai/auth/signup">Activate your account ↗</a></small></div><ol className={s.accessSteps}><li><span>1</span><div><h3>Put your name on the list.</h3><p>Tell us where to send your invitation.</p></div></li><li><span>2</span><div><h3>Get your invite.</h3><p>We review requests and approve access.</p></div></li><li><span>3</span><div><h3>Hand over your first task.</h3><p>Connect your tools and make yourself at home.</p></div></li></ol></section>
    <section className={s.faq}><h2>A few good questions.</h2><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
    <div className={s.signoff}><Bot small /><span>Less busywork. More you.</span><a href="#hero-title" aria-label="Back to top">↑</a></div>
  </div>;
}

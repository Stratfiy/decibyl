'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  const [audience, setAudience] = useState<'personal' | 'business'>('personal');
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const job = jobs[audience][active];
  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setStep(value => (value + 1) % 5), 1700);
    return () => window.clearInterval(timer);
  }, [playing, audience, active]);
  function choose(kind: 'personal' | 'business') { setAudience(kind); setActive(0); setStep(0); }
  return <div className={s.home}>
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={`${s.floatCard} ${s.cardResearch}`}><span className={`${s.tile} ${s.blue}`}>↗</span><div><small>Research bot</small><strong>Twenty tabs. One answer.</strong></div><span className={s.tick}>✓</span></div>
      <div className={`${s.floatCard} ${s.cardCalendar}`}><span className={`${s.tile} ${s.pink}`}>▦</span><div><small>Life, a little lighter</small><strong>Your week, sorted.</strong></div></div>
      <div className={`${s.floatCard} ${s.cardVoice}`}><div className={s.voiceTop}><span className={s.liveDot} /> Voice bot <small>Example</small></div><div className={s.wave}>{Array.from({length:23},(_,i)=><i key={i} style={{height:`${12+(i*17%36)}px`, animationDelay:`${i*0.08}s`}} />)}</div><strong>“I can help with that.”</strong><span className={s.voiceCaption}>A voice. And a next step.</span></div>
      <div className={`${s.floatCard} ${s.cardMail}`}><span className={`${s.tile} ${s.yellow}`}>✉</span><div><small>Follow-up bot</small><strong>Consider it handled.</strong></div><span className={s.tick}>✓</span></div>
      <span className={`${s.spark} ${s.sparkOne}`} aria-hidden="true">✳</span><span className={`${s.spark} ${s.sparkTwo}`} aria-hidden="true">✧</span>
      <div className={s.heroCenter}>
        <a href="#early-access" className={s.accessBadge}><span className={s.liveDot} /> Free early access <span>·</span> Invite only <Arrow /></a>
        <div className={s.mascot}><Bot /><span className={s.hello}>hi, I’m on it!</span></div>
        <h1 id="hero-title">Big plans.<br />Less boring work.</h1>
        <p>Meet Decibyl. Bots that take care of the busywork.<br className={s.desktopBreak} /> For your everyday life. And your business.</p>
        <div className={s.heroActions}><Link href="/waitlist" className={s.primary}>Join the waitlist <Arrow /></Link><a href="#see-it-work" className={s.secondary}>See it in action <span aria-hidden="true">↓</span></a></div>
        <span className={s.heroNote}>You bring the ideas. We’ll help with the to-dos.</span>
      </div>
      <div className={s.heroFoot}><span>BOTS THAT DO THE BORING WORK</span><span>Scroll for the good part ↓</span></div>
    </section>

    <section className={s.tasks} id="see-it-work" aria-labelledby="tasks-title">
      <div className={s.sectionTop}><div><span className={s.eyebrow}>LESS “I NEED TO”. MORE “IT’S DONE”.</span><h2 id="tasks-title">What’s on your list?</h2></div><div className={s.switch} aria-label="Choose example audience"><button aria-pressed={audience==='personal'} onClick={()=>choose('personal')}>For you</button><button aria-pressed={audience==='business'} onClick={()=>choose('business')}>For business</button></div></div>
      <p className={s.intro}>The little things that fill your day. Hand a few over.</p>
      <div className={s.demoGrid}><div className={s.jobList}>{jobs[audience].map((item,i)=><button key={item.title} onClick={()=>{setActive(i);setStep(0);}} aria-pressed={active===i} className={active===i?s.jobActive:''}><span className={`${s.tile} ${s[item.color]}`}>{item.icon}</span><span><strong>{item.title}</strong><small>{item.tag}</small></span><span aria-hidden="true">↗</span></button>)}<p>Pick a task. See how it could work.</p></div>
        <div className={s.demo} aria-label="Illustrative task demo"><div className={s.demoBar}><span><Bot small /> Decibyl</span><span>INTERACTIVE EXAMPLE <button onClick={()=>setPlaying(v=>!v)} aria-label={playing?'Pause demo animation':'Play demo animation'}>{playing?'Ⅱ':'▶'}</button></span></div><div className={s.request} key={`${audience}-${active}`}>{job.request}</div><div className={s.steps}>{job.steps.map((text,i)=><div key={text} data-done={step>i} data-active={step===i}><span>{step>i?'✓':i+1}</span>{text}<small>{step>i?'Done':step===i?'Working…':''}</small></div>)}</div><div className={s.result} data-ready={step>=3}><span className={s.tick}>✓</span><div><strong>{step>=3?job.result:'A little work happening in the background.'}</strong><p>{step>=3?job.detail:'From your request to a useful result.'}</p></div></div><p className={s.demoDisclaimer}>Illustrative workflow. Actions depend on connected apps and permissions.</p></div>
      </div>
    </section>

    <section className={s.statement}><span>RESEARCH. REMEMBER. CALL. CONNECT. DO.</span><h2>A helpful chat.<br />A whole lot of follow-through.</h2><p>Give it context. Connect your tools. Let Decibyl take the next step.</p><div className={s.appRow} aria-label="Connected tools"><span>G<span className={s.appName}>Google</span></span><span>✳<span className={s.appName}>Slack</span></span><span>▦<span className={s.appName}>Microsoft</span></span><span>n8n<span className={s.appName}>Workflows</span></span><Link href="/integrations">Explore integrations <Arrow /></Link></div></section>

    <section className={s.audiences} aria-label="Personal and business"><article id="for-you" className={s.personal}><div className={s.audienceCopy}><span className={s.eyebrow}>FOR YOU</span><h2>A little help.<br />A lot more headspace.</h2><p>Research the options. Make sense of a document. Get your day in order. Make room for the things you actually want to do.</p><Link href="/waitlist?vertical=personal" className={s.textLink}>Find your everyday sidekick <Arrow /></Link></div><div className={s.noteBoard}><div className={s.note}><span>THE SMALL STUFF</span><p><del>Read that long document</del><br /><del>Pull my notes together</del><br />Make time for the good stuff <span>♡</span></p></div><span className={s.sticker}>more life,<br />less admin.</span></div></article>
    <article id="for-business" className={s.business}><div className={s.audienceCopy}><span className={s.eyebrow}>FOR BUSINESS</span><h2>Your team’s new<br />“leave it with me”.</h2><p>Follow up with leads, help customers, prepare reports and keep work moving. Shared bots, shared context, and a clear view of what happened.</p><Link href="/waitlist?vertical=business" className={s.textLink}>Give your team a hand <Arrow /></Link></div><div className={s.businessBoard}><div><span className={s.liveDot} /> THE TEAM’S WORK, IN ONE PLACE <small>Example</small></div>{[['↗','Sales follow-up','CRM updated'],['◖','Customer care','Next step recorded'],['▤','Weekly report','Ready for review']].map(([icon,title,status])=><div key={title}><span>{icon}</span><strong>{title}</strong><small>{status} ✓</small></div>)}</div></article></section>

    <section className={s.capabilities}><div className={s.sectionTop}><div><span className={s.eyebrow}>SIMPLE ON THE SURFACE. CAPABLE UNDERNEATH.</span><h2>More than a one-task wonder.</h2></div><Link href="/platform" className={s.textLink}>Meet the platform <Arrow /></Link></div><div className={s.capGrid}>
      <article><div className={s.memoryArt}><span>You</span><i /><Bot small /><i /><span>Your context</span></div><h3>A memory for what matters.</h3><p>Personal context and shared business knowledge help your bots pick up where the work left off.</p><Link href="/knowledge">Explore memory <Arrow /></Link></article>
      <article><div className={s.routineArt}><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><b>↻ &nbsp; Your morning brief</b></div><h3>Good work. On repeat.</h3><p>Turn repeatable jobs into routines. Give them a schedule and keep track of what runs.</p><Link href="/platform">Explore routines <Arrow /></Link></article>
      <article><div className={s.builderArt}><span>Tell me what you want to build…</span><div><i>Trigger</i><b>→</b><i>Agent</i><b>→</b><i>Action</i></div></div><h3>Your bot. Your way.</h3><p>Choose a ready-made agent or build from a conversation. Open the canvas when you want more control.</p><Link href="/developers">Explore building <Arrow /></Link></article>
    </div></section>

    <section className={s.control}><div><span className={s.eyebrow}>A HELPING HAND. YOU’RE STILL IN CHARGE.</span><h2>Give it work.<br />Keep the say-so.</h2></div><div>{[['01','You choose the connections.','Give your bots the tools and context they need for the job.'],['02','You set the boundaries.','Use instructions and approval rules to control how work gets done.'],['03','You see what happened.','Follow tasks, review results and step in when your judgment is needed.']].map(([n,title,body])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>

    <section className={s.access} id="early-access"><div className={s.accessIntro}><span className={s.accessBadge}><span className={s.liveDot} /> NOW INVITING EARLY USERS</span><h2>Your next “done”<br />starts here.</h2><p>Decibyl is free during early access.<br />For people with a lot on their plate. And teams, too.</p><Link href="/waitlist" className={s.primary}>Join the waitlist <Arrow /></Link><small>Already have an invite? <a href="https://app.decibyl.ai/auth/signup">Activate your account ↗</a></small></div><ol className={s.accessSteps}><li><span>1</span><div><h3>Put your name on the list.</h3><p>Tell us where to send your invitation.</p></div></li><li><span>2</span><div><h3>Get your invite.</h3><p>We review requests and approve access.</p></div></li><li><span>3</span><div><h3>Hand over your first task.</h3><p>Connect your tools and make yourself at home.</p></div></li></ol></section>
    <section className={s.faq}><h2>A few good questions.</h2><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
    <div className={s.signoff}><Bot small /><span>Less busywork. More you.</span><a href="#hero-title" aria-label="Back to top">↑</a></div>
  </div>;
}

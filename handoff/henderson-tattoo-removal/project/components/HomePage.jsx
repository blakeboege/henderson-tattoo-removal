// Home page body — process, before/after preview, pricing, FAQ, final CTA
const { useState: useStateHome } = React;

function Process() {
  const steps = [
    { n: '01', h: 'Free consult', b: 'A 30-minute visit. We assess the tattoo, take baseline photos, explain the plan, and quote a session range. You leave with paperwork. No pressure to book.' },
    { n: '02', h: 'Treatment sessions', b: '15–30 minutes each. Six to eight weeks apart. Zimmer cooling keeps it tolerable. You\'ll see visible fading by session three.' },
    { n: '03', h: 'Progress review', b: 'At session five and every three after, we re-photograph and compare. If you\'re clear before the estimate, you\'re done. No pressure to keep going.' },
    { n: '04', h: 'Follow-up', b: 'Twelve weeks after your final session we re-photograph one last time. If you need another pass, we do it at our regular per-session rate — never a penalty fee.' },
  ];
  return (
    <section style={prStyles.section}>
      <div style={prStyles.inner}>
        <div style={prStyles.eyebrow}>How it works</div>
        <h2 style={prStyles.h}>Four steps. No surprises.</h2>
        <div style={prStyles.grid}>
          {steps.map(s => (
            <div key={s.n} style={prStyles.step}>
              <div style={prStyles.num}>{s.n}</div>
              <div style={prStyles.stepH}>{s.h}</div>
              <div style={prStyles.stepB}>{s.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const prStyles = {
  section: { background: '#000', color: '#fff', padding: '112px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#2997ff', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 48, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  grid: { marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 },
  step: { background: '#1d1d1f', borderRadius: 12, padding: 28 },
  num: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, color: '#2997ff', letterSpacing: '-0.12px', marginBottom: 16 },
  stepH: { fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 24, fontWeight: 600, lineHeight: 1.14, letterSpacing: '0.196px' },
  stepB: { marginTop: 10, fontSize: 15, lineHeight: 1.47, letterSpacing: '-0.224px', color: 'rgba(255,255,255,0.72)' },
};

function BeforeAfterPreview() {
  const cases = [
    { ink: 'Black ink · forearm', sessions: 7, before: 'assets/forearm-before.jpg', after: 'assets/forearm-after.jpg' },
    { ink: 'Black ink · shoulder', sessions: 9, before: 'assets/shoulder-before.jpg', after: 'assets/shoulder-after.jpg' },
    { ink: 'Mixed color · wrist', sessions: 10, before: 'assets/wrist-before.jpg', after: 'assets/wrist-after.jpg' },
  ];
  return (
    <section style={baStyles.section}>
      <div style={baStyles.inner}>
        <div style={baStyles.head}>
          <div>
            <div style={baStyles.eyebrow}>Before &amp; after</div>
            <h2 style={baStyles.h}>Real clients. Real sessions.</h2>
          </div>
          <a href="#/results" style={baStyles.viewAll}>View full gallery ›</a>
        </div>
        <p style={baStyles.sub}>Same lighting. Same angle. Shot on a plain background with no filters. Every photo is captioned with the session count.</p>
        <div style={baStyles.grid}>
          {cases.map((c, i) => (
            <div key={i} style={baStyles.case}>
              <div style={baStyles.pair}>
                <div style={baStyles.imgWrap}>
                  <img src={c.before} alt="" style={baStyles.img}/>
                  <div style={baStyles.stamp}>Before</div>
                </div>
                <div style={baStyles.imgWrap}>
                  <img src={c.after} alt="" style={baStyles.img}/>
                  <div style={baStyles.stamp}>Session {c.sessions}</div>
                </div>
              </div>
              <div style={baStyles.caption}>{c.ink}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const baStyles = {
  section: { background: '#f5f5f7', color: '#1d1d1f', padding: '112px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#0066cc', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 48, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  viewAll: { color: '#0066cc', fontSize: 15, textDecoration: 'none', letterSpacing: '-0.224px' },
  sub: { marginTop: 16, maxWidth: 640, fontSize: 17, lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.72)' },
  grid: { marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 },
  case: { display: 'flex', flexDirection: 'column', gap: 10 },
  pair: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 },
  imgWrap: { position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#e8e6e4' },
  img: { width: '100%', display: 'block' },
  stamp: { position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, letterSpacing: '-0.08px', padding: '3px 8px', borderRadius: 5 },
  caption: { fontSize: 14, color: 'rgba(0,0,0,0.8)', letterSpacing: '-0.224px' },
};

function Pricing() {
  const tiers = [
    { name: 'Palm-sized', size: 'up to 2 in²', price: 125, note: 'Small hand, wrist, ankle' },
    { name: 'Medium',     size: '2 – 10 in²',  price: 225, note: 'Forearm, calf, shoulder', featured: true },
    { name: 'Large',      size: '10 in² and up', price: 375, note: 'Sleeve, back piece, chest' },
  ];
  return (
    <section id="pricing" style={pcStyles.section}>
      <div style={pcStyles.inner}>
        <div style={pcStyles.eyebrow}>Pricing</div>
        <h2 style={pcStyles.h}>Flat per session. No packages.</h2>
        <p style={pcStyles.sub}>Pay per visit. Cancel whenever. Most black ink clears in 6 to 10 sessions. What you see is what you pay.</p>
        <div style={pcStyles.grid}>
          {tiers.map(t => (
            <div key={t.name} style={{...pcStyles.card, ...(t.featured ? pcStyles.cardFeatured : {})}}>
              {t.featured && <div style={pcStyles.badge}>Most common</div>}
              <div style={pcStyles.tierName}>{t.name}</div>
              <div style={pcStyles.tierSize}>{t.size}</div>
              <div style={pcStyles.priceRow}>
                <span style={pcStyles.dollar}>$</span>
                <span style={pcStyles.price}>{t.price}</span>
                <span style={pcStyles.per}>/ session</span>
              </div>
              <div style={pcStyles.note}>{t.note}</div>
              <a href="#book" style={pcStyles.link}>Book this size ›</a>
            </div>
          ))}
        </div>
        <div style={pcStyles.asterisks}>
          <div>Consultation — <strong>$0</strong></div>
          <div>Touch-up session after completion — <strong>same flat rate</strong></div>
          <div>Financing via Cherry — <strong>0% APR for 6 months</strong></div>
        </div>
      </div>
    </section>
  );
}
const pcStyles = {
  section: { background: '#000', color: '#fff', padding: '112px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  eyebrow: { fontSize: 14, fontWeight: 600, letterSpacing: '-0.224px', color: '#2997ff', marginBottom: 10 },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 48, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  sub: { marginTop: 16, maxWidth: 640, fontSize: 19, lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(255,255,255,0.72)' },
  grid: { marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 },
  card: { position: 'relative', background: '#1d1d1f', borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', gap: 10 },
  cardFeatured: { background: '#fff', color: '#1d1d1f' },
  badge: { position: 'absolute', top: 16, right: 16, fontSize: 11, fontWeight: 600, letterSpacing: '-0.12px', color: '#0066cc', background: 'rgba(0,113,227,0.08)', padding: '4px 10px', borderRadius: 980 },
  tierName: { fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 21, fontWeight: 700, letterSpacing: '0.231px' },
  tierSize: { fontSize: 13, opacity: 0.56, letterSpacing: '-0.224px' },
  priceRow: { display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 16 },
  dollar: { fontSize: 20, fontWeight: 600 },
  price: { fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 56, fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1 },
  per: { fontSize: 13, opacity: 0.56, marginLeft: 6 },
  note: { fontSize: 14, opacity: 0.8, letterSpacing: '-0.224px', marginTop: 4 },
  link: { marginTop: 12, color: 'inherit', fontSize: 14, textDecoration: 'none', opacity: 0.72 },
  asterisks: { marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, fontSize: 14, color: 'rgba(255,255,255,0.64)', letterSpacing: '-0.224px', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.12)' },
};

function FAQ() {
  const qs = [
    { q: 'Does it hurt?', a: 'Most clients describe it as a rubber band snap or hot oil spatter. We use a Zimmer cooling device that blows −30°F air across the skin during treatment. Topical numbing cream is available on request.' },
    { q: 'How many sessions will I need?', a: 'Most black-ink tattoos clear in six to ten sessions. Multi-color tattoos typically take eight to twelve. After your consult, we give you a written estimate with a range.' },
    { q: 'How long between sessions?', a: 'Six to eight weeks. The ink breaks down between visits; treating sooner doesn\'t speed it up, it just irritates the skin.' },
    { q: 'Will there be scarring?', a: 'Very rarely — and almost always tied to aftercare. Follow the aftercare sheet we send you home with and the risk is below 1%.' },
    { q: 'Is the consultation really free?', a: 'Yes. $0. It takes about 30 minutes. We assess the tattoo, take baseline photos, and give you a session estimate. No pressure to book.' },
    { q: 'Do you do fade-for-coverup?', a: 'Yes. A typical coverup fade is 3–5 sessions, enough to give your tattoo artist a workable canvas. Bring your coverup design to the consult and we\'ll plan around it.' },
  ];
  const [open, setOpen] = useStateHome(0);
  return (
    <section id="faq" style={fqStyles.section}>
      <div style={fqStyles.inner}>
        <div style={fqStyles.eyebrow}>FAQ</div>
        <h2 style={fqStyles.h}>Questions we hear often.</h2>
        <div style={fqStyles.list}>
          {qs.map((item, i) => (
            <div key={i} style={fqStyles.row}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={fqStyles.qBtn}>
                <span>{item.q}</span>
                <span style={{...fqStyles.plus, transform: open === i ? 'rotate(45deg)' : 'none'}}>+</span>
              </button>
              {open === i && <div style={fqStyles.a}>{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const fqStyles = {
  section: { background: '#f5f5f7', color: '#1d1d1f', padding: '112px 24px' },
  inner: { maxWidth: 820, margin: '0 auto' },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#0066cc', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: '0 0 32px', fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 48, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  list: { display: 'flex', flexDirection: 'column' },
  row: { borderBottom: '1px solid rgba(0,0,0,0.08)' },
  qBtn: { width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', padding: '22px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 21, fontWeight: 400, lineHeight: 1.19, letterSpacing: '0.231px', color: '#1d1d1f', textAlign: 'left' },
  plus: { fontSize: 22, color: 'rgba(0,0,0,0.48)', lineHeight: 1, transition: 'transform 240ms cubic-bezier(0.4,0,0.2,1)' },
  a: { padding: '0 4px 24px', fontSize: 17, lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.8)', maxWidth: 640 },
};

function FinalCTA({ onBook }) {
  return (
    <section style={cxStyles.section}>
      <div style={cxStyles.inner}>
        <h2 style={cxStyles.h}>A clearer start.</h2>
        <p style={cxStyles.sub}>Your first visit is a 30-minute consult. It's $0.</p>
        <div style={cxStyles.row}>
          <button onClick={onBook} style={cxStyles.primary}>Book a consult</button>
          <a href="tel:+17026597135" style={cxStyles.ghost}>Call (702) 659-7135 ›</a>
        </div>
      </div>
    </section>
  );
}
const cxStyles = {
  section: { background: '#000', color: '#fff', padding: '128px 24px', textAlign: 'center' },
  inner: { maxWidth: 720, margin: '0 auto' },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 64, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.5px' },
  sub: { marginTop: 16, fontSize: 21, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.231px' },
  row: { marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' },
  primary: { background: '#0071e3', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 980, fontFamily: 'inherit', fontSize: 17, cursor: 'pointer', letterSpacing: '-0.374px' },
  ghost: { background: 'transparent', color: '#2997ff', border: '1px solid #2997ff', padding: '12px 24px', borderRadius: 980, textDecoration: 'none', fontFamily: 'inherit', fontSize: 17, letterSpacing: '-0.374px' },
};

function HomePage({ onBook }) {
  return (
    <div data-screen-label="Home">
      <HomeHero onBook={onBook}/>
      <TrustSection/>
      <BeforeAfterPreview/>
      <EmailCapture/>
      <Process/>
      <Pricing/>
      <FAQ/>
      <FinalCTA onBook={onBook}/>
    </div>
  );
}

Object.assign(window, { HomePage, Process, BeforeAfterPreview, Pricing, FAQ, FinalCTA });

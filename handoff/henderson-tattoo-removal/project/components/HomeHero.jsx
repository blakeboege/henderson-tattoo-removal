// Home page — full marketing flow.
function HomeHero({ onBook }) {
  return (
    <section style={hhStyles.section}>
      <div style={hhStyles.inner}>
        <div style={hhStyles.eyebrowPill}>Henderson, Nevada · Licensed medical spa</div>
        <h1 style={hhStyles.headline}>Remove your tattoo,<br/>safely and cleanly.</h1>
        <p style={hhStyles.sub}>
          Evidence-based laser tattoo removal with PicoWay technology. Transparent pricing. Realistic timelines. No package upsells.
        </p>
        <div style={hhStyles.ctaRow}>
          <button onClick={onBook} style={hhStyles.primaryPill}>Book a consult — free</button>
          <a href="#/results" style={hhStyles.ghostPill}>See results ›</a>
        </div>
        <div style={hhStyles.artWrap}>
          <img src="assets/hero-result.jpg" alt="Before and after chest tattoo removal — full clearance" style={hhStyles.art}/>
        </div>
        <div style={hhStyles.statRow}>
          <Stat n="2,400+" l="Sessions delivered"/>
          <Stat n="6–10" l="Sessions for black ink"/>
          <Stat n="<1%" l="Scarring rate"/>
          <Stat n="$0" l="Consultation fee"/>
        </div>
      </div>
    </section>
  );
}
function Stat({ n, l }) {
  return (
    <div style={{textAlign: 'left'}}>
      <div style={{fontFamily:'-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 32, fontWeight: 600, letterSpacing: '-0.28px', color:'#fff'}}>{n}</div>
      <div style={{marginTop: 4, fontSize: 13, letterSpacing: '-0.224px', color: 'rgba(255,255,255,0.64)'}}>{l}</div>
    </div>
  );
}
const hhStyles = {
  section: { background: '#000', color: '#fff', padding: '80px 24px 64px', textAlign: 'center' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  eyebrowPill: {
    display: 'inline-block', padding: '6px 14px', borderRadius: 980,
    border: '1px solid rgba(255,255,255,0.24)',
    fontSize: 12, letterSpacing: '-0.12px', color: 'rgba(255,255,255,0.72)', marginBottom: 28,
  },
  headline: {
    margin: 0,
    fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif',
    fontSize: 72, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.5px',
  },
  sub: {
    marginTop: 20, marginLeft: 'auto', marginRight: 'auto', maxWidth: 640,
    fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif',
    fontSize: 21, fontWeight: 400, lineHeight: 1.35, letterSpacing: '0.231px',
    color: 'rgba(255,255,255,0.84)',
  },
  ctaRow: { marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' },
  primaryPill: {
    background: '#0071e3', color: '#fff', border: 'none',
    padding: '12px 24px', borderRadius: 980,
    fontFamily: '-apple-system, "SF Pro Text", Inter, sans-serif',
    fontSize: 17, fontWeight: 400, cursor: 'pointer', letterSpacing: '-0.374px',
  },
  ghostPill: {
    background: 'transparent', color: '#2997ff', border: '1px solid #2997ff',
    padding: '12px 24px', borderRadius: 980, textDecoration: 'none',
    fontFamily: '-apple-system, "SF Pro Text", Inter, sans-serif',
    fontSize: 17, letterSpacing: '-0.374px',
  },
  artWrap: { marginTop: 56 },
  art: {
    width: '100%', maxWidth: 900, display: 'block', margin: '0 auto',
    borderRadius: 12,
    boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
  },
  statRow: {
    marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
    paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.12)',
  },
};

function TrustSection() {
  const items = [
    { icon: 'shield-check', h: 'FDA-cleared technology', b: 'PicoWay picosecond laser — the standard of care for effective ink breakdown on all skin tones.' },
    { icon: 'stethoscope', h: 'Medically supervised', b: 'Every session is performed by a certified laser technician under a Nevada-licensed medical director.' },
    { icon: 'snowflake', h: 'Zimmer cooling', b: '−30°F chilled air blown across the skin throughout treatment. The single biggest factor in patient comfort.' },
    { icon: 'file-text', h: 'Written session plan', b: 'You leave the consult with a printed estimate. Session count, total cost, realistic timeline. No surprises.' },
  ];
  return (
    <section style={tsStyles.section}>
      <div style={tsStyles.inner}>
        <div style={tsStyles.eyebrow}>Why clients choose us</div>
        <h2 style={tsStyles.h}>A medical clinic, not a tattoo shop.</h2>
        <p style={tsStyles.sub}>
          Tattoo removal is a medical procedure. We treat it like one — with credentialed staff, clinical-grade equipment, and the quiet seriousness you'd expect from a dermatology office.
        </p>
        <div style={tsStyles.grid}>
          {items.map(it => (
            <div key={it.h} style={tsStyles.card}>
              <Icon name={it.icon}/>
              <div style={tsStyles.cardH}>{it.h}</div>
              <div style={tsStyles.cardB}>{it.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Icon({ name, size = 22, color = '#0071e3' }) {
  const paths = {
    'shield-check': <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>,
    'stethoscope': <><path d="M6 3v4a4 4 0 0 0 8 0V3"/><path d="M6 3h2M14 3h2"/><path d="M10 11v3a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="12" r="2"/></>,
    'snowflake': <><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></>,
    'file-text': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6M9 9h2"/></>,
    'calendar': <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    'camera': <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
    'clock': <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    'credit-card': <><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></>,
    'map-pin': <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    'mail': <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></>,
    'phone': <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z"/></>,
    'award': <><circle cx="12" cy="8" r="6"/><path d="M15.5 13L17 22l-5-3-5 3 1.5-9"/></>,
    'leaf': <><path d="M20 4c0 8-6 14-14 14H4v-2C4 8 10 4 18 4z"/><path d="M4 18c8 0 12-4 14-10"/></>,
    'check': <><path d="M20 6L9 17l-5-5"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const tsStyles = {
  section: { background: '#f5f5f7', color: '#1d1d1f', padding: '112px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#0066cc', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 48, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  sub: { marginTop: 16, maxWidth: 640, fontSize: 19, lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.72)' },
  grid: { marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 },
  card: { background: '#fff', borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', gap: 12 },
  cardH: { fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 19, fontWeight: 600, letterSpacing: '0.231px', marginTop: 4 },
  cardB: { fontSize: 15, lineHeight: 1.47, letterSpacing: '-0.224px', color: 'rgba(0,0,0,0.8)' },
};

Object.assign(window, { HomeHero, TrustSection, Icon, Stat });

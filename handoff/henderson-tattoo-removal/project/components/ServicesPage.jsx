// Services page
function ServicesPage({ onBook }) {
  return (
    <div data-screen-label="Services">
      <PageHero
        eyebrow="Our services"
        headline="Laser tattoo removal, done cleanly."
        sub="A single, focused practice. We don't do microneedling, fillers, or cosmetic tattooing. Tattoo removal is all we do — which is why we do it well."
        onBook={onBook}
      />
      <ServiceDetail/>
      <Technology/>
      <AfterCare/>
      <ServicesFAQBlock/>
      <FinalCTA onBook={onBook}/>
    </div>
  );
}

function PageHero({ eyebrow, headline, sub, onBook }) {
  return (
    <section style={phStyles.section}>
      <div style={phStyles.inner}>
        <div style={phStyles.eyebrow}>{eyebrow}</div>
        <h1 style={phStyles.h}>{headline}</h1>
        <p style={phStyles.sub}>{sub}</p>
        {onBook && (
          <div style={phStyles.row}>
            <button onClick={onBook} style={phStyles.primary}>Book a consult</button>
            <a href="#/results" style={phStyles.ghost}>See results ›</a>
          </div>
        )}
      </div>
    </section>
  );
}
const phStyles = {
  section: { background: '#000', color: '#fff', padding: '112px 24px 96px' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#2997ff', letterSpacing: '-0.224px', marginBottom: 12 },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 64, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.5px', maxWidth: 820 },
  sub: { marginTop: 20, maxWidth: 720, fontSize: 21, lineHeight: 1.42, letterSpacing: '0.231px', color: 'rgba(255,255,255,0.72)' },
  row: { marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' },
  primary: { background: '#0071e3', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 980, fontFamily: 'inherit', fontSize: 17, cursor: 'pointer', letterSpacing: '-0.374px' },
  ghost: { background: 'transparent', color: '#2997ff', border: '1px solid #2997ff', padding: '12px 24px', borderRadius: 980, textDecoration: 'none', fontFamily: 'inherit', fontSize: 17, letterSpacing: '-0.374px' },
};

function ServiceDetail() {
  const services = [
    {
      tag: 'Full removal',
      h: 'Complete tattoo removal',
      b: 'Our most common treatment. We work until your skin is clear — typically 6 to 10 sessions for black ink, 8 to 12 for multi-color. Booked a session at a time, priced a session at a time. You can stop at any point and keep what you\'ve already paid for.',
      bullets: ['All ink colors treated', 'PicoWay laser, medically supervised', 'Written session estimate at consult', '6 to 8 weeks between visits'],
    },
    {
      tag: 'Fade for coverup',
      h: 'Fade-for-coverup sessions',
      b: 'You don\'t need full removal — just enough fade for a new piece to sit cleanly on top. We work directly with your tattoo artist. Typical fade-for-coverup is 3 to 5 sessions.',
      bullets: ['Collaborate with your artist', 'Planned around your design', 'Typically 3–5 sessions', 'Discounted from the regular rate'],
    },
    {
      tag: 'Scar-conscious',
      h: 'Previously-treated tattoos',
      b: 'If a previous clinic caused scarring, hypopigmentation, or left stubborn residual ink — bring us the photos and we\'ll give you an honest assessment. Sometimes the right answer is not to treat.',
      bullets: ['Complimentary scar consult', 'Second-opinion photography', 'Honest yes/no assessment', 'Referral out if we aren\'t the right fit'],
    },
  ];
  return (
    <section style={sdStyles.section}>
      <div style={sdStyles.inner}>
        {services.map((s, i) => (
          <div key={s.h} style={{...sdStyles.row, flexDirection: i % 2 === 0 ? 'row' : 'row-reverse'}}>
            <div style={sdStyles.copy}>
              <div style={sdStyles.tag}>{s.tag}</div>
              <h2 style={sdStyles.h}>{s.h}</h2>
              <p style={sdStyles.b}>{s.b}</p>
              <ul style={sdStyles.list}>
                {s.bullets.map(bu => (
                  <li key={bu} style={sdStyles.li}>
                    <span style={sdStyles.dot}><Icon name="check" size={14} color="#0071e3"/></span>
                    <span>{bu}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={sdStyles.art}>
              <ServiceArt variant={i}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceArt({ variant }) {
  const bg = ['#e8e6e4', '#1d1d1f', '#e8e6e4'][variant];
  const fg = ['#d9d4cf', '#2a2a2d', '#d9d4cf'][variant];
  const inkColor = variant === 1 ? '#0a0a0b' : '#2a2a2d';
  return (
    <svg viewBox="0 0 500 380" width="100%" style={{display:'block', borderRadius: 12}}>
      <rect width="500" height="380" fill={bg}/>
      <rect x="50" y="40" width="400" height="300" rx="12" fill={fg}/>
      {variant === 0 && (
        <g transform="translate(250 190)" opacity="0.7">
          <path d="M -80 -50 Q -40 -100 0 -60 Q 40 -100 80 -50 Q 100 0 50 60 Q 0 90 -50 60 Q -100 0 -80 -50 Z" fill={inkColor}/>
          <path d="M -30 -20 Q 0 -40 30 -20 Q 40 10 0 30 Q -40 10 -30 -20 Z" fill="#5a5050"/>
        </g>
      )}
      {variant === 1 && (
        <>
          <g transform="translate(250 190)" opacity="0.4">
            <path d="M -80 -50 Q -40 -100 0 -60 Q 40 -100 80 -50 Q 100 0 50 60 Q 0 90 -50 60 Q -100 0 -80 -50 Z" fill="#fff"/>
          </g>
          <circle cx="250" cy="190" r="130" fill="none" stroke="#0071e3" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6"/>
          <circle cx="250" cy="190" r="90" fill="none" stroke="#0071e3" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4"/>
        </>
      )}
      {variant === 2 && (
        <g transform="translate(250 190)">
          <path d="M -80 -50 Q -40 -100 0 -60 Q 40 -100 80 -50 Q 100 0 50 60 Q 0 90 -50 60 Q -100 0 -80 -50 Z" fill="#2a2a2d" opacity="0.5"/>
          <path d="M -30 -20 Q 0 -40 30 -20 Q 40 10 0 30 Q -40 10 -30 -20 Z" fill="#6a5050" opacity="0.6"/>
        </g>
      )}
    </svg>
  );
}

const sdStyles = {
  section: { background: '#f5f5f7', color: '#1d1d1f', padding: '96px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 96 },
  row: { display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' },
  copy: { flex: '1 1 360px' },
  tag: { display: 'inline-block', fontSize: 12, fontWeight: 600, letterSpacing: '-0.12px', color: '#0066cc', background: 'rgba(0,113,227,0.08)', padding: '4px 10px', borderRadius: 980, marginBottom: 14 },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 40, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  b: { marginTop: 16, fontSize: 17, lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.72)' },
  list: { marginTop: 20, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 },
  li: { display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, letterSpacing: '-0.224px', color: 'rgba(0,0,0,0.84)' },
  dot: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,113,227,0.1)', flexShrink: 0, marginTop: 1 },
  art: { flex: '1 1 360px' },
};

function Technology() {
  return (
    <section style={tcStyles.section}>
      <div style={tcStyles.inner}>
        <div style={tcStyles.eyebrow}>Our technology</div>
        <h2 style={tcStyles.h}>One laser. The right one.</h2>
        <p style={tcStyles.sub}>Not every clinic uses the same equipment. Here's what we use, and why.</p>
        <div style={tcStyles.grid}>
          <div style={tcStyles.big}>
            <div style={tcStyles.bigInner}>
              <div style={tcStyles.bigTag}>PicoWay</div>
              <div style={tcStyles.bigH}>Picosecond Nd:YAG laser</div>
              <p style={tcStyles.bigB}>
                PicoWay fires in picoseconds — a trillionth of a second. That's short enough to shatter ink pigment into particles small enough for your lymphatic system to carry away. Older Q-switched lasers work in nanoseconds and rely on heat; PicoWay relies on mechanical shockwave. The result is faster clearance, less thermal damage, and a reliable safety profile on darker skin tones.
              </p>
              <div style={tcStyles.specs}>
                <Spec k="Pulse width" v="450 ps"/>
                <Spec k="Wavelengths" v="532 / 785 / 1064 nm"/>
                <Spec k="FDA cleared" v="All Fitzpatrick types"/>
                <Spec k="Footprint" v="2.1m × 0.9m"/>
              </div>
            </div>
          </div>
          <div style={tcStyles.small}>
            <SmallCard icon="snowflake" h="Zimmer Cryo 7" b="Chilled-air cooling at −30°F, delivered through a directional hose. Runs the entire session. The single biggest factor in patient comfort."/>
            <SmallCard icon="camera" h="Medical-grade photography" b="Standardized lighting, angle, and distance at every visit. You see the same image the clinician does, and you can watch the fade progress over time."/>
          </div>
        </div>
      </div>
    </section>
  );
}
function Spec({ k, v }) {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.12)', fontSize: 14, letterSpacing: '-0.224px'}}>
      <span style={{color: 'rgba(255,255,255,0.56)'}}>{k}</span>
      <span style={{color: '#fff'}}>{v}</span>
    </div>
  );
}
function SmallCard({ icon, h, b }) {
  return (
    <div style={tcStyles.smallCard}>
      <Icon name={icon} size={22} color="#0071e3"/>
      <div style={{marginTop: 14, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 21, fontWeight: 600, letterSpacing: '0.231px'}}>{h}</div>
      <div style={{marginTop: 8, fontSize: 15, lineHeight: 1.47, letterSpacing: '-0.224px', color: 'rgba(0,0,0,0.72)'}}>{b}</div>
    </div>
  );
}
const tcStyles = {
  section: { background: '#000', color: '#fff', padding: '112px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#2997ff', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 48, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  sub: { marginTop: 16, maxWidth: 640, fontSize: 19, lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(255,255,255,0.72)' },
  grid: { marginTop: 48, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 },
  big: { background: '#1d1d1f', borderRadius: 12, padding: 40 },
  bigInner: {},
  bigTag: { display: 'inline-block', fontSize: 12, fontWeight: 600, letterSpacing: '-0.12px', color: '#2997ff', background: 'rgba(41,151,255,0.12)', padding: '4px 10px', borderRadius: 980, marginBottom: 16 },
  bigH: { fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 32, fontWeight: 600, letterSpacing: '-0.196px' },
  bigB: { marginTop: 14, fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.224px', color: 'rgba(255,255,255,0.72)' },
  specs: { marginTop: 24 },
  small: { display: 'flex', flexDirection: 'column', gap: 16 },
  smallCard: { background: '#fff', color: '#1d1d1f', borderRadius: 12, padding: 28, flex: 1 },
};

function AfterCare() {
  const days = [
    { n: 'Hours 0–24', h: 'Cool, cover, rest', b: 'Apply the aftercare sheet\'s instructions. Cold compress for 10 minutes an hour. Don\'t remove the bandage before bedtime.' },
    { n: 'Days 1–3', h: 'Blistering is normal', b: 'Small blisters are part of the healing response and prove the laser worked. Don\'t pop them. Keep the area dry.' },
    { n: 'Week 1', h: 'Gentle wash twice daily', b: 'Fragrance-free cleanser, pat dry. Aquaphor or similar, thin layer. No soaking, no swimming, no gym until cleared.' },
    { n: 'Weeks 2–6', h: 'Fading accelerates', b: 'The ink is breaking down under the skin. Wear sunscreen religiously over the area — UV is the single biggest risk factor for hyperpigmentation.' },
  ];
  return (
    <section style={acStyles.section}>
      <div style={acStyles.inner}>
        <div style={acStyles.eyebrow}>Aftercare</div>
        <h2 style={acStyles.h}>What to expect after a session.</h2>
        <p style={acStyles.sub}>A printed aftercare sheet comes home with you. Here's the short version.</p>
        <div style={acStyles.grid}>
          {days.map(d => (
            <div key={d.n} style={acStyles.card}>
              <div style={acStyles.cardN}>{d.n}</div>
              <div style={acStyles.cardH}>{d.h}</div>
              <div style={acStyles.cardB}>{d.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const acStyles = {
  section: { background: '#f5f5f7', color: '#1d1d1f', padding: '112px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#0066cc', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 48, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  sub: { marginTop: 16, maxWidth: 640, fontSize: 19, lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.72)' },
  grid: { marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 },
  card: { background: '#fff', borderRadius: 12, padding: 24 },
  cardN: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, color: '#0066cc', letterSpacing: '-0.12px', marginBottom: 14 },
  cardH: { fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 19, fontWeight: 600, letterSpacing: '0.196px' },
  cardB: { marginTop: 8, fontSize: 14, lineHeight: 1.47, letterSpacing: '-0.224px', color: 'rgba(0,0,0,0.72)' },
};

function ServicesFAQBlock() {
  const qs = [
    { q: 'Do you treat all skin tones?', a: 'Yes. PicoWay is FDA-cleared for all Fitzpatrick types (I through VI). We calibrate energy per-client, per-session — never one-size-fits-all.' },
    { q: 'Can you remove colored ink?', a: 'Yes. PicoWay has three wavelengths (532, 785, 1064 nm) that between them address every common tattoo pigment — including notoriously stubborn greens and blues.' },
    { q: 'What if I only want partial removal?', a: 'We can target any region of a tattoo you want. Bring a marked photo to the consult and we\'ll only treat what you specify.' },
    { q: 'Are there medical reasons I shouldn\'t get this?', a: 'A few. Active skin infection in the area, recent sunburn, recent Accutane use, and certain pregnancy considerations. We screen for all of these at the consult.' },
  ];
  const [open, setOpen] = React.useState(-1);
  return (
    <section style={fqStyles2.section}>
      <div style={fqStyles2.inner}>
        <div style={fqStyles2.eyebrow}>Service FAQ</div>
        <h2 style={fqStyles2.h}>More questions.</h2>
        <div style={{display:'flex', flexDirection:'column'}}>
          {qs.map((item, i) => (
            <div key={i} style={fqStyles2.row}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={fqStyles2.qBtn}>
                <span>{item.q}</span>
                <span style={{...fqStyles2.plus, transform: open === i ? 'rotate(45deg)' : 'none'}}>+</span>
              </button>
              {open === i && <div style={fqStyles2.a}>{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const fqStyles2 = {
  section: { background: '#000', color: '#fff', padding: '112px 24px' },
  inner: { maxWidth: 820, margin: '0 auto' },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#2997ff', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: '0 0 32px', fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 48, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  row: { borderBottom: '1px solid rgba(255,255,255,0.12)' },
  qBtn: { width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', padding: '22px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 21, fontWeight: 400, lineHeight: 1.19, letterSpacing: '0.231px', color: '#fff', textAlign: 'left' },
  plus: { fontSize: 22, color: 'rgba(255,255,255,0.48)', lineHeight: 1, transition: 'transform 240ms cubic-bezier(0.4,0,0.2,1)' },
  a: { padding: '0 4px 24px', fontSize: 17, lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(255,255,255,0.72)', maxWidth: 640 },
};

Object.assign(window, { ServicesPage, PageHero });

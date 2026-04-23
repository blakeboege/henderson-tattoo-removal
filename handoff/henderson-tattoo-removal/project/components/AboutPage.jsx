// About page
function AboutPage({ onBook }) {
  return (
    <div data-screen-label="About">
      <PageHero
        eyebrow="About"
        headline="We do one thing."
        sub="Henderson Tattoo Removal is a single-focus clinic. No fillers, no microneedling, no cosmetic tattooing. Tattoo removal is the whole practice — which is why we've gotten good at it."
      />
      <Mission/>
      <TeamBlock/>
      <Facility/>
      <Principles/>
      <FinalCTA onBook={onBook}/>
    </div>
  );
}

function Mission() {
  return (
    <section style={msStyles.section}>
      <div style={msStyles.inner}>
        <div style={msStyles.left}>
          <div style={msStyles.eyebrow}>Mission</div>
          <h2 style={msStyles.h}>Competent care. No theatre.</h2>
        </div>
        <div style={msStyles.right}>
          <p style={msStyles.p}>Most clients come to us after a cycle of disappointing visits elsewhere. Oversold package deals. Vague timelines. A chair behind a bead curtain in a tattoo parlor. We built Henderson Tattoo Removal to be the opposite of that.</p>
          <p style={msStyles.p}>We charge per session, at a flat rate. We take photos every visit and we show them to you. We tell you if you're on track, and we tell you if you aren't. If the right answer is to stop, we say so.</p>
          <p style={msStyles.p}>Our clients are adults who made a decision once and want a clean slate now. They're past embarrassment. They want competent care from a licensed provider in a quiet room — and that's what we're here to provide.</p>
        </div>
      </div>
    </section>
  );
}
const msStyles = {
  section: { background: '#f5f5f7', color: '#1d1d1f', padding: '112px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64 },
  left: {},
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#0066cc', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 44, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  right: {},
  p: { margin: '0 0 16px', fontSize: 17, lineHeight: 1.5, letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.8)' },
};

function TeamBlock() {
  const team = [
    { name: 'Dr. Mira Adeyemi, MD', role: 'Medical director', bio: 'Board-certified dermatologist. Oversees clinical protocols, supervises complex cases, and signs off on every treatment plan.', years: '12 yrs', photo: 'assets/team-mira.jpg' },
    { name: 'Jordan Reyes, CLT', role: 'Lead laser technician', bio: 'Certified laser technician, 2,000+ sessions delivered. Specializes in multi-color and Fitzpatrick V–VI treatment.', years: '7 yrs', photo: 'assets/team-jordan.jpg' },
    { name: 'Priya Chen, RN', role: 'Clinical coordinator', bio: 'Registered nurse. Runs consults, handles aftercare questions, manages the progress photography archive.', years: '9 yrs', photo: 'assets/team-priya.jpg' },
  ];
  return (
    <section style={tmStyles.section}>
      <div style={tmStyles.inner}>
        <div style={tmStyles.eyebrow}>The team</div>
        <h2 style={tmStyles.h}>Small practice. Credentialed staff.</h2>
        <div style={tmStyles.grid}>
          {team.map(m => (
            <div key={m.name} style={tmStyles.card}>
              <div style={tmStyles.portrait}>
                {m.photo ? (
                  <img src={m.photo} alt={m.name} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 28%', display: 'block'}}/>
                ) : (
                  <svg viewBox="0 0 120 120" width="100%">
                    <rect width="120" height="120" fill="#2a2a2d"/>
                    <circle cx="60" cy="50" r="18" fill="#3a3a3d"/>
                    <path d="M 20 120 Q 20 80 60 80 Q 100 80 100 120 Z" fill="#3a3a3d"/>
                  </svg>
                )}
              </div>
              <div style={tmStyles.cardBody}>
                <div style={tmStyles.name}>{m.name}</div>
                <div style={tmStyles.role}>{m.role} · {m.years}</div>
                <div style={tmStyles.bio}>{m.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const tmStyles = {
  section: { background: '#000', color: '#fff', padding: '112px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#2997ff', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: '0 0 48px', fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 48, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 },
  card: { background: '#1d1d1f', borderRadius: 12, overflow: 'hidden' },
  portrait: { aspectRatio: '1', background: '#2a2a2d' },
  cardBody: { padding: 24 },
  name: { fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 21, fontWeight: 600, letterSpacing: '0.231px' },
  role: { marginTop: 4, fontSize: 13, color: '#2997ff', letterSpacing: '-0.224px' },
  bio: { marginTop: 14, fontSize: 15, lineHeight: 1.5, color: 'rgba(255,255,255,0.72)', letterSpacing: '-0.224px' },
};

function Facility() {
  return (
    <section style={fcStyles.section}>
      <div style={fcStyles.inner}>
        <div style={fcStyles.copy}>
          <div style={fcStyles.eyebrow}>Service area</div>
          <h2 style={fcStyles.h}>Henderson, Nevada.</h2>
          <p style={fcStyles.p}>We serve Henderson, Las Vegas, Summerlin, and surrounding areas by appointment. Consults are booked one at a time — no reception scrum, no overlapping sessions. When your appointment starts, we're ready for you.</p>
          <dl style={fcStyles.dl}>
            <FacilityRow k="Service area" v="Henderson · Las Vegas · Summerlin"/>
            <FacilityRow k="Hours" v="Tue–Sat · 9:00–18:00"/>
            <FacilityRow k="Booking" v="By appointment only"/>
            <FacilityRow k="Languages" v="English · Spanish"/>
          </dl>
        </div>
        <div style={fcStyles.art}>
          <img src="assets/clinic-interior.jpg" alt="Treatment room — Henderson Tattoo Removal" style={{width: '100%', borderRadius: 12, display: 'block', aspectRatio: '16/10', objectFit: 'cover'}}/>
        </div>
      </div>
    </section>
  );
}
function FacilityRow({ k, v }) {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '1px solid rgba(0,0,0,0.08)'}}>
      <dt style={{fontSize: 14, color: 'rgba(0,0,0,0.56)', letterSpacing: '-0.224px'}}>{k}</dt>
      <dd style={{margin: 0, fontSize: 14, color: '#1d1d1f', letterSpacing: '-0.224px', fontWeight: 500}}>{v}</dd>
    </div>
  );
}
const fcStyles = {
  section: { background: '#f5f5f7', color: '#1d1d1f', padding: '112px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' },
  copy: {},
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#0066cc', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 44, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  p: { marginTop: 16, fontSize: 17, lineHeight: 1.5, letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.8)' },
  dl: { marginTop: 32, padding: 0 },
  art: {},
};

function Principles() {
  const items = [
    { k: '01', h: 'Per session, every session.', b: 'No packages. No "save $600 by prepaying ten visits." You pay for what you get, one visit at a time.' },
    { k: '02', h: 'We photograph every visit.', b: 'Same lighting, same angle. You see your progress. So do we. No gaslighting about "look how far you\'ve come."' },
    { k: '03', h: 'Realistic timelines.', b: 'We quote a range, not a minimum. Most black ink is 6–10 sessions. If your tattoo is an outlier, we\'ll tell you at the consult.' },
    { k: '04', h: 'Honest when we aren\'t the answer.', b: 'Some tattoos don\'t respond. Some skin should rest. If removal isn\'t right for you right now, we say so and we don\'t charge for the consult.' },
  ];
  return (
    <section style={pnStyles.section}>
      <div style={pnStyles.inner}>
        <div style={pnStyles.eyebrow}>How we work</div>
        <h2 style={pnStyles.h}>Four principles.</h2>
        <div style={pnStyles.grid}>
          {items.map(i => (
            <div key={i.k} style={pnStyles.item}>
              <div style={pnStyles.k}>{i.k}</div>
              <div style={pnStyles.itemH}>{i.h}</div>
              <div style={pnStyles.itemB}>{i.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const pnStyles = {
  section: { background: '#000', color: '#fff', padding: '112px 24px' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#2997ff', letterSpacing: '-0.224px', marginBottom: 10 },
  h: { margin: '0 0 48px', fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 48, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 48 },
  item: {},
  k: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, color: '#2997ff', letterSpacing: '-0.12px', marginBottom: 14 },
  itemH: { fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 28, fontWeight: 600, lineHeight: 1.14, letterSpacing: '-0.196px' },
  itemB: { marginTop: 12, fontSize: 17, lineHeight: 1.5, color: 'rgba(255,255,255,0.72)', letterSpacing: '-0.374px' },
};

Object.assign(window, { AboutPage });

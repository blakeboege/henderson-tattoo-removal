// Before & After / Results page
const { useState: useStateRP } = React;

function ResultsPage({ onBook }) {
  const [filter, setFilter] = useStateRP('All');
  const cases = [
    { ink: 'Black ink', loc: 'Forearm', sessions: 7, age: '11 years old', size: 'Medium', notes: 'Tribal band. Client stopped at session 7 — satisfied.', before: 'assets/forearm-before.jpg', after: 'assets/forearm-after.jpg' },
    { ink: 'Black ink', loc: 'Shoulder', sessions: 9, age: '8 years old', size: 'Large', notes: 'Dense black. 95% clearance at session 9.', before: 'assets/shoulder-before.jpg', after: 'assets/shoulder-after.jpg' },
    { ink: 'Multi-color', loc: 'Wrist', sessions: 10, age: '6 years old', size: 'Palm-sized', notes: 'Red and green pigment. Full clearance.', before: 'assets/wrist-before.jpg', after: 'assets/wrist-after.jpg' },
    { ink: 'Black ink', loc: 'Hand', sessions: 6, age: '4 years old', size: 'Palm-sized', notes: 'Single initial. Fast clearance on young ink.', before: 'assets/hand-before.jpg', after: 'assets/hand-after.jpg' },
    { ink: 'Fade for coverup', loc: 'Upper arm', sessions: 4, age: '9 years old', size: 'Medium', notes: 'Prepped for a half-sleeve coverup. Client\'s artist confirmed workable.', before: 'assets/upperarm-before.jpg', after: 'assets/upperarm-after.jpg' },
    { ink: 'Multi-color', loc: 'Ankle', sessions: 11, age: '12 years old', size: 'Medium', notes: 'Old school Americana. Yellow pigment was the slow piece.', before: 'assets/ankle-before.jpg', after: 'assets/ankle-after.jpg' },
    { ink: 'Black ink', loc: 'Chest', sessions: 8, age: '7 years old', size: 'Large', notes: 'Full clearance. Client pursued other tattoos post-removal.', before: 'assets/chest-before.jpg', after: 'assets/chest-after.jpg' },
    { ink: 'Black ink', loc: 'Neck', sessions: 9, age: '10 years old', size: 'Palm-sized', notes: 'Behind-ear script. Careful low-fluence protocol for thin skin.', before: 'assets/neck-before.jpg', after: 'assets/neck-after.jpg' },
    { ink: 'Fade for coverup', loc: 'Ribs', sessions: 3, age: '5 years old', size: 'Medium', notes: 'Light fade only. Artist overlay planned for 60-day mark.', before: 'assets/ribs-before.jpg', after: 'assets/ribs-after.jpg' },
  ];
  const filters = ['All', 'Black ink', 'Multi-color', 'Fade for coverup'];
  const filtered = filter === 'All' ? cases : cases.filter(c => c.ink === filter);
  return (
    <div data-screen-label="Results">
      <PageHero
        eyebrow="Before & after"
        headline="Real clients. Real sessions."
        sub="Nothing retouched. Nothing flattered. Shot under standardized clinical lighting at every visit. Captions list the session count so you can judge the pace for yourself."
      />
      <section style={rpStyles.filterSection}>
        <div style={rpStyles.filterInner}>
          <div style={rpStyles.filterRow}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{...rpStyles.chip, ...(filter === f ? rpStyles.chipActive : {})}}>
                {f}
              </button>
            ))}
          </div>
          <div style={rpStyles.count}>{filtered.length} case{filtered.length === 1 ? '' : 's'}</div>
        </div>
      </section>
      <section style={rpStyles.gallery}>
        <div style={rpStyles.galleryInner}>
          <div style={rpStyles.grid}>
            {filtered.map((c, i) => <CaseCard key={i} c={c}/>)}
          </div>
        </div>
      </section>
      <DisclaimerBlock/>
      <EmailCapture/>
      <FinalCTA onBook={onBook}/>
    </div>
  );
}

function CaseCard({ c }) {
  return (
    <div style={rpStyles.case}>
      <div style={rpStyles.pair}>
        <div style={rpStyles.imgWrap}>
          <img src={c.before || 'assets/before.svg'} alt="" style={rpStyles.img}/>
          <div style={rpStyles.stamp}>Before</div>
        </div>
        <div style={rpStyles.imgWrap}>
          <img src={c.after || 'assets/after.svg'} alt="" style={rpStyles.img}/>
          <div style={rpStyles.stamp}>Session {c.sessions}</div>
        </div>
      </div>
      <div style={rpStyles.meta}>
        <div style={rpStyles.metaTop}>
          <span style={rpStyles.loc}>{c.loc}</span>
          <span style={rpStyles.pill}>{c.ink}</span>
        </div>
        <div style={rpStyles.facts}>
          <Fact k="Size" v={c.size}/>
          <Fact k="Age of tattoo" v={c.age}/>
          <Fact k="Sessions" v={c.sessions}/>
        </div>
        <div style={rpStyles.notes}>{c.notes}</div>
      </div>
    </div>
  );
}
function Fact({ k, v }) {
  return (
    <div>
      <div style={{fontSize: 11, color: 'rgba(0,0,0,0.48)', letterSpacing: '-0.12px', textTransform: 'uppercase'}}>{k}</div>
      <div style={{marginTop: 2, fontSize: 14, color: '#1d1d1f', letterSpacing: '-0.224px', fontWeight: 500}}>{v}</div>
    </div>
  );
}

function DisclaimerBlock() {
  return (
    <section style={rpStyles.disclaimer}>
      <div style={rpStyles.disclaimerInner}>
        <div style={{fontSize: 14, fontWeight: 600, color: '#2997ff', letterSpacing: '-0.224px', marginBottom: 10}}>Transparency</div>
        <h2 style={rpStyles.dH}>What these photos are, and what they aren't.</h2>
        <div style={rpStyles.dGrid}>
          <div><strong style={{color:'#fff'}}>Real clients.</strong> Every photo shown with written consent. No stock imagery, no borrowed cases.</div>
          <div><strong style={{color:'#fff'}}>Not guarantees.</strong> Results vary with ink type, skin tone, location, age of tattoo, and immune response. Your plan is yours.</div>
          <div><strong style={{color:'#fff'}}>Not retouched.</strong> Same camera, same lighting, same distance. Cropping only — no color correction.</div>
          <div><strong style={{color:'#fff'}}>Not cherry-picked.</strong> We publish the outliers too. Ask to see cases that took longer than average — we have those.</div>
        </div>
      </div>
    </section>
  );
}

const rpStyles = {
  filterSection: { background: '#f5f5f7', padding: '32px 24px 0' },
  filterInner: { maxWidth: 1080, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 },
  filterRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  chip: { background: '#fff', border: '1px solid transparent', color: '#1d1d1f', padding: '8px 16px', borderRadius: 980, fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', letterSpacing: '-0.224px' },
  chipActive: { background: '#1d1d1f', color: '#fff' },
  count: { fontSize: 13, color: 'rgba(0,0,0,0.56)', letterSpacing: '-0.224px' },
  gallery: { background: '#f5f5f7', padding: '32px 24px 112px' },
  galleryInner: { maxWidth: 1080, margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 },
  case: { background: '#fff', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  pair: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: '#fff' },
  imgWrap: { position: 'relative', overflow: 'hidden', background: '#e8e6e4' },
  img: { width: '100%', display: 'block' },
  stamp: { position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, letterSpacing: '-0.08px', padding: '3px 8px', borderRadius: 5 },
  meta: { padding: 20 },
  metaTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  loc: { fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 17, fontWeight: 600, letterSpacing: '0.231px' },
  pill: { fontSize: 11, fontWeight: 600, letterSpacing: '-0.12px', color: '#0066cc', background: 'rgba(0,113,227,0.08)', padding: '3px 10px', borderRadius: 980 },
  facts: { marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, paddingBottom: 14, borderBottom: '1px solid rgba(0,0,0,0.08)' },
  notes: { marginTop: 14, fontSize: 13, lineHeight: 1.5, color: 'rgba(0,0,0,0.72)', letterSpacing: '-0.224px' },
  disclaimer: { background: '#000', color: 'rgba(255,255,255,0.72)', padding: '96px 24px' },
  disclaimerInner: { maxWidth: 1080, margin: '0 auto' },
  dH: { margin: 0, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 40, fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.3px', color: '#fff', marginBottom: 32 },
  dGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.224px' },
};

Object.assign(window, { ResultsPage });

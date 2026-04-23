// Contact page
const { useState: useStateCP } = React;

function ContactPage() {
  const [form, setForm] = useStateCP({ name: '', email: '', phone: '', topic: 'Book a consult', message: '' });
  const [sent, setSent] = useStateCP(false);
  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div data-screen-label="Contact">
      <PageHero
        eyebrow="Contact"
        headline="Get in touch."
        sub="Book a free consult, ask a question, or just get a quick estimate. We reply to every inquiry within one business day."
      />
      <section style={cpStyles.section}>
        <div style={cpStyles.inner}>
          <div style={cpStyles.formCol}>
            {!sent ? (
              <form onSubmit={submit} style={cpStyles.form}>
                <div style={cpStyles.eyebrow}>Send us a message</div>
                <div style={cpStyles.fieldGrid}>
                  <Field label="Full name" val={form.name} on={upd('name')} placeholder="Alex Martinez" required/>
                  <Field label="Email" val={form.email} on={upd('email')} placeholder="you@example.com" type="email" required/>
                  <Field label="Phone (optional)" val={form.phone} on={upd('phone')} placeholder="(702) 555-0193" type="tel"/>
                  <div style={cpStyles.field}>
                    <label style={cpStyles.label}>What's this about?</label>
                    <select style={cpStyles.input} value={form.topic} onChange={upd('topic')}>
                      <option>Book a consult</option>
                      <option>Pricing question</option>
                      <option>Fade for coverup</option>
                      <option>Scar-conscious assessment</option>
                      <option>Something else</option>
                    </select>
                  </div>
                </div>
                <div style={cpStyles.field}>
                  <label style={cpStyles.label}>Message</label>
                  <textarea style={{...cpStyles.input, minHeight: 120, resize: 'vertical', padding: '12px'}}
                            placeholder="Tell us about the tattoo — size, location, age, ink colors — and any timing you have in mind."
                            value={form.message} onChange={upd('message')}/>
                </div>
                <div style={cpStyles.footer}>
                  <div style={cpStyles.disclaimer}>We reply within one business day. No marketing emails — we don't do those.</div>
                  <button type="submit" style={cpStyles.submit}>Send message</button>
                </div>
              </form>
            ) : (
              <div style={cpStyles.sent}>
                <div style={cpStyles.sentIcon}><Icon name="check" size={28} color="#0071e3"/></div>
                <div style={cpStyles.sentH}>Message sent.</div>
                <div style={cpStyles.sentB}>We'll reply to {form.email || 'your email'} within one business day. If it's urgent, call us at <a href="tel:+17026597135" style={{color:'#0066cc', textDecoration:'none'}}>(702) 659-7135</a>.</div>
                <button onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', topic:'Book a consult', message:'' }); }} style={cpStyles.ghost}>Send another</button>
              </div>
            )}
          </div>
          <aside style={cpStyles.sideCol}>
            <SideBlock icon="map-pin" h="Service area" lines={['Serving Henderson, Las Vegas,', 'Summerlin, and surrounding areas.', 'By appointment only.']}/>
            <SideBlock icon="phone" h="Call" lines={[<a href="tel:+17026597135" style={{color:'#0066cc', textDecoration:'none'}} key="c">(702) 659-7135</a>, 'Tue–Sat · 9:00–18:00']}/>
            <SideBlock icon="mail" h="Email" lines={[<a href="mailto:estimates@hendersontattooremoval.com" style={{color:'#0066cc', textDecoration:'none', wordBreak: 'break-all'}} key="e">estimates@hendersontattooremoval.com</a>]}/>
            <SideBlock icon="clock" h="Hours" lines={['Mon · Closed', 'Tue–Fri · 9:00–18:00', 'Sat · 10:00–16:00', 'Sun · Closed']}/>
          </aside>
        </div>
      </section>
      <MapBlock/>
    </div>
  );
}

function Field({ label, val, on, placeholder, type = 'text', required }) {
  return (
    <div style={cpStyles.field}>
      <label style={cpStyles.label}>{label}</label>
      <input style={cpStyles.input} value={val} onChange={on} placeholder={placeholder} type={type} required={required}/>
    </div>
  );
}
function SideBlock({ icon, h, lines }) {
  return (
    <div style={cpStyles.sideBlock}>
      <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 10}}>
        <Icon name={icon} size={18} color="#0071e3"/>
        <span style={cpStyles.sideH}>{h}</span>
      </div>
      <div style={cpStyles.sideLines}>
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

function MapBlock() {
  return (
    <section style={{background: '#f5f5f7', padding: '0 24px 112px'}}>
      <div style={{maxWidth: 1080, margin: '0 auto'}}>
        <div style={{position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '21/8', background: '#e8e8ea'}}>
          <svg viewBox="0 0 1080 412" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <rect width="1080" height="412" fill="#eceff3"/>
            {/* grid streets */}
            <g stroke="#dcdfe4" strokeWidth="1">
              {Array.from({length:12}).map((_,i)=>(<line key={'h'+i} x1="0" y1={34*i+10} x2="1080" y2={34*i+10}/>))}
              {Array.from({length:26}).map((_,i)=>(<line key={'v'+i} x1={44*i+10} y1="0" x2={44*i+10} y2="412"/>))}
            </g>
            {/* wider roads — 215, 515, 15 */}
            <g stroke="#cfd3d9" strokeWidth="4" fill="none">
              <path d="M 0 180 Q 400 150 700 200 T 1080 210"/>
              <path d="M 300 0 Q 340 180 420 412"/>
              <path d="M 760 0 Q 720 200 820 412"/>
            </g>
            {/* parks / greenspace */}
            <rect x="80" y="40" width="140" height="90" rx="4" fill="#dce6d6"/>
            <rect x="880" y="260" width="150" height="110" rx="4" fill="#dce6d6"/>
            {/* Lake Mead hint */}
            <path d="M 900 20 Q 1020 60 1080 40 L 1080 0 L 900 0 Z" fill="#d6e2ec"/>

            {/* Service area — three coverage circles */}
            <g>
              {/* Las Vegas */}
              <circle cx="380" cy="160" r="92" fill="rgba(0,113,227,0.12)" stroke="rgba(0,113,227,0.55)" strokeWidth="2" strokeDasharray="5 4"/>
              <circle cx="380" cy="160" r="5" fill="#0071e3"/>
              <text x="380" y="142" textAnchor="middle" fontFamily="-apple-system, 'SF Pro Text', Inter, sans-serif" fontSize="13" fontWeight="600" fill="#1d1d1f" letterSpacing="-0.224">Las Vegas</text>

              {/* Summerlin */}
              <circle cx="205" cy="230" r="72" fill="rgba(0,113,227,0.12)" stroke="rgba(0,113,227,0.55)" strokeWidth="2" strokeDasharray="5 4"/>
              <circle cx="205" cy="230" r="5" fill="#0071e3"/>
              <text x="205" y="212" textAnchor="middle" fontFamily="-apple-system, 'SF Pro Text', Inter, sans-serif" fontSize="13" fontWeight="600" fill="#1d1d1f" letterSpacing="-0.224">Summerlin</text>

              {/* Henderson */}
              <circle cx="680" cy="260" r="108" fill="rgba(0,113,227,0.18)" stroke="rgba(0,113,227,0.7)" strokeWidth="2.5"/>
              <circle cx="680" cy="260" r="6" fill="#0071e3"/>
              <text x="680" y="238" textAnchor="middle" fontFamily="-apple-system, 'SF Pro Text', Inter, sans-serif" fontSize="14" fontWeight="700" fill="#1d1d1f" letterSpacing="-0.224">Henderson</text>
            </g>

            <text x="540" y="385" textAnchor="middle" fontFamily="-apple-system, 'SF Pro Text', Inter, sans-serif" fontSize="12" fill="rgba(0,0,0,0.56)" letterSpacing="-0.12">Serving Henderson, Las Vegas, Summerlin, and surrounding areas</text>
          </svg>
          <div style={{
            position: 'absolute', top: 16, right: 16,
            background: '#fff', color: '#1d1d1f',
            padding: '8px 14px', borderRadius: 980, fontSize: 13, letterSpacing: '-0.224px',
            boxShadow: 'rgba(0,0,0,0.12) 0 2px 8px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{width: 8, height: 8, borderRadius: '50%', background: '#30d158', display: 'inline-block'}}/>
            By appointment · (702) 659-7135
          </div>
        </div>
      </div>
    </section>
  );
}

const cpStyles = {
  section: { background: '#f5f5f7', color: '#1d1d1f', padding: '64px 24px 96px' },
  inner: { maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 },
  formCol: { background: '#fff', borderRadius: 12, padding: 40 },
  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  eyebrow: { fontSize: 14, fontWeight: 600, color: '#0066cc', letterSpacing: '-0.224px' },
  fieldGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 12, fontWeight: 600, letterSpacing: '-0.12px', color: '#1d1d1f' },
  input: {
    background: '#fafafc', border: '3px solid rgba(0,0,0,0.04)', borderRadius: 11,
    padding: '10px 12px', fontSize: 15, letterSpacing: '-0.374px', color: '#1d1d1f',
    fontFamily: 'inherit', outline: 'none',
  },
  footer: { marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' },
  disclaimer: { fontSize: 13, color: 'rgba(0,0,0,0.56)', letterSpacing: '-0.224px', maxWidth: 320 },
  submit: {
    background: '#0071e3', color: '#fff', border: 'none',
    padding: '12px 24px', borderRadius: 980, fontFamily: 'inherit', fontSize: 15, cursor: 'pointer', letterSpacing: '-0.374px',
  },
  sent: { padding: '32px 8px', textAlign: 'center' },
  sentIcon: { width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' },
  sentH: { marginTop: 20, fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 28, fontWeight: 600, letterSpacing: '-0.196px' },
  sentB: { marginTop: 10, fontSize: 16, color: 'rgba(0,0,0,0.72)', letterSpacing: '-0.224px', maxWidth: 380, margin: '10px auto 0' },
  ghost: { marginTop: 24, background: 'transparent', color: '#0066cc', border: '1px solid #0066cc', padding: '10px 22px', borderRadius: 980, fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', letterSpacing: '-0.374px' },
  sideCol: { display: 'flex', flexDirection: 'column', gap: 2 },
  sideBlock: { background: '#fff', borderRadius: 12, padding: 24, marginBottom: 10 },
  sideH: { fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif', fontSize: 17, fontWeight: 600, letterSpacing: '0.231px' },
  sideLines: { fontSize: 14, lineHeight: 1.6, color: 'rgba(0,0,0,0.72)', letterSpacing: '-0.224px' },
};

Object.assign(window, { ContactPage });

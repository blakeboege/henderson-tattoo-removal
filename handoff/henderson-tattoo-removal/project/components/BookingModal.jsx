// Two-step booking modal — lifted from Clearline UI kit, prefixed styles.
const { useState: useStateBM } = React;

function BookingModal({ open, onClose }) {
  const [step, setStep] = useStateBM(0);
  const [slot, setSlot] = useStateBM(null);
  if (!open) return null;
  return (
    <div style={bmStyles.backdrop} onClick={onClose}>
      <div style={bmStyles.card} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={bmStyles.close} aria-label="Close">×</button>
        {step === 0 && (
          <>
            <div style={bmStyles.eyebrow}>Step 1 of 2</div>
            <div style={bmStyles.h}>Tell us about the tattoo.</div>
            <div style={bmStyles.sub}>This helps us estimate your session count before you come in.</div>
            <div style={bmStyles.fieldGrid}>
              <div style={bmStyles.field}><label style={bmStyles.label}>Location on body</label><input style={bmStyles.input} placeholder="e.g. left forearm"/></div>
              <div style={bmStyles.field}><label style={bmStyles.label}>Approximate size</label>
                <select style={bmStyles.input}><option>Palm-sized (up to 2 in²)</option><option>Medium (2–10 in²)</option><option>Large (10 in²+)</option></select>
              </div>
              <div style={bmStyles.field}><label style={bmStyles.label}>Ink color</label>
                <select style={bmStyles.input}><option>Black only</option><option>Black + gray</option><option>Multi-color</option></select>
              </div>
              <div style={bmStyles.field}><label style={bmStyles.label}>Years old</label><input style={bmStyles.input} placeholder="5"/></div>
            </div>
            <div style={bmStyles.cta}>
              <button onClick={() => setStep(1)} style={bmStyles.primary}>Continue</button>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div style={bmStyles.eyebrow}>Step 2 of 2</div>
            <div style={bmStyles.h}>Pick a consult time.</div>
            <div style={bmStyles.sub}>Consults are free and take 30 minutes.</div>
            <div style={bmStyles.slotGrid}>
              {['Tue · May 5 · 10:00', 'Tue · May 5 · 11:30', 'Wed · May 6 · 14:00', 'Thu · May 7 · 09:00', 'Thu · May 7 · 16:30', 'Fri · May 8 · 12:00'].map(t => (
                <button key={t} onClick={() => setSlot(t)} style={{...bmStyles.slot, ...(slot === t ? bmStyles.slotActive : {})}}>{t}</button>
              ))}
            </div>
            <div style={bmStyles.cta}>
              <button onClick={() => setStep(0)} style={bmStyles.ghost}>Back</button>
              <button onClick={onClose} style={bmStyles.primary} disabled={!slot}>Confirm booking</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const bmStyles = {
  backdrop: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.48)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24,
  },
  card: {
    position: 'relative',
    background: '#fff', borderRadius: 12, padding: 40, width: '100%', maxWidth: 540,
    fontFamily: '-apple-system, "SF Pro Text", Inter, sans-serif',
  },
  close: {
    position: 'absolute', top: 12, right: 12,
    width: 32, height: 32, borderRadius: '50%', border: 'none',
    background: 'rgba(210,210,215,0.64)', color: 'rgba(0,0,0,0.48)',
    fontSize: 20, cursor: 'pointer', lineHeight: 1,
  },
  eyebrow: { fontSize: 12, fontWeight: 600, letterSpacing: '-0.12px', color: 'rgba(0,0,0,0.48)' },
  h: {
    marginTop: 6,
    fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif',
    fontSize: 28, fontWeight: 400, lineHeight: 1.14, letterSpacing: '0.196px',
    color: '#1d1d1f',
  },
  sub: { marginTop: 8, fontSize: 14, lineHeight: 1.47, letterSpacing: '-0.224px', color: 'rgba(0,0,0,0.8)' },
  fieldGrid: { marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 12, fontWeight: 600, letterSpacing: '-0.12px', color: '#1d1d1f' },
  input: {
    background: '#fafafc', border: '3px solid rgba(0,0,0,0.04)', borderRadius: 11,
    padding: '8px 12px', fontSize: 15, letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.8)',
    fontFamily: 'inherit', outline: 'none',
  },
  slotGrid: { marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 },
  slot: {
    background: '#f5f5f7', border: '2px solid transparent', borderRadius: 8,
    padding: '10px 8px', fontSize: 13, letterSpacing: '-0.224px', color: '#1d1d1f',
    fontFamily: 'inherit', cursor: 'pointer',
  },
  slotActive: { border: '2px solid #0071e3', background: '#fff' },
  cta: { marginTop: 28, display: 'flex', justifyContent: 'flex-end', gap: 10 },
  primary: {
    background: '#0071e3', color: '#fff', border: 'none',
    padding: '10px 22px', borderRadius: 980, fontSize: 15, cursor: 'pointer',
    fontFamily: 'inherit', letterSpacing: '-0.374px',
  },
  ghost: {
    background: 'transparent', color: '#0066cc', border: '1px solid #0066cc',
    padding: '10px 22px', borderRadius: 980, fontSize: 15, cursor: 'pointer',
    fontFamily: 'inherit', letterSpacing: '-0.374px',
  },
};

window.BookingModal = BookingModal;

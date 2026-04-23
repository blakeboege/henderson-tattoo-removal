// Lead capture — full-width primary section. Two-step progressive form.
// Sits after results/before-after content, before footer.
// Also exposes a delayed exit-intent / time-based popup (session-throttled).

const { useState: useStateEC, useEffect: useEffectEC, useRef: useRefEC } = React;

function EmailCapture() {
  // step: 'email' | 'phone' | 'done'
  const [step, setStep] = useStateEC('email');
  const [email, setEmail] = useStateEC('');
  const [phone, setPhone] = useStateEC('');
  const phoneRef = useRefEC(null);

  const submitEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    setStep('phone');
    // focus phone field after the step transition
    setTimeout(() => phoneRef.current && phoneRef.current.focus(), 80);
  };
  const submitPhone = (e) => {
    e.preventDefault();
    setStep('done');
  };
  const skipPhone = () => setStep('done');

  return (
    <section style={ecStyles.section} aria-labelledby="ec-headline">
      <div style={ecStyles.inner}>
        <div style={ecStyles.eyebrow}>Free estimate</div>
        <h2 id="ec-headline" style={ecStyles.h}>Want to know what your tattoo will take to remove?</h2>
        <p style={ecStyles.sub}>We'll send realistic pricing and session timelines based on your tattoo. Serving Henderson and Las Vegas.</p>

        {step === 'email' && (
          <form onSubmit={submitEmail} style={ecStyles.form} noValidate>
            <div style={ecStyles.stepDots}>
              <Dot active/> <DotSep/> <Dot/>
              <span style={ecStyles.stepLabel}>Step 1 of 2 · Email</span>
            </div>
            <div style={ecStyles.row}>
              <label htmlFor="ec-email" style={ecStyles.srOnly}>Email address</label>
              <input
                id="ec-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={ecStyles.input}
                autoComplete="email"
              />
              <button type="submit" style={ecStyles.btn}>Get my estimate →</button>
            </div>
            <div style={ecStyles.trust}>
              <LockIcon/>
              <span>We respect your privacy. No spam.</span>
            </div>
          </form>
        )}

        {step === 'phone' && (
          <form onSubmit={submitPhone} style={ecStyles.form} noValidate>
            <div style={ecStyles.stepDots}>
              <Dot done/> <DotSep active/> <Dot active/>
              <span style={ecStyles.stepLabel}>Step 2 of 2 · Phone (optional)</span>
            </div>
            <div style={ecStyles.stepCopy}>
              Saved <strong style={{color:'#fff'}}>{email}</strong>. Add a phone number and we'll text your estimate as well — much faster than waiting on email.
            </div>
            <div style={ecStyles.row}>
              <label htmlFor="ec-phone" style={ecStyles.srOnly}>Phone number</label>
              <input
                ref={phoneRef}
                id="ec-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(702) 555-0123"
                style={ecStyles.input}
                autoComplete="tel"
              />
              <button type="submit" style={ecStyles.btn}>
                {phone ? 'Send my estimate →' : 'Finish →'}
              </button>
            </div>
            <div style={ecStyles.trust}>
              <button type="button" onClick={skipPhone} style={ecStyles.skipBtn}>Skip — email only</button>
              <span style={{opacity:0.4}}>·</span>
              <LockIcon/>
              <span>We respect your privacy. No spam.</span>
            </div>
          </form>
        )}

        {step === 'done' && (
          <div style={ecStyles.done}>
            <div style={ecStyles.doneIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div style={ecStyles.doneH}>Got it — your estimate is on its way.</div>
            <div style={ecStyles.doneB}>
              We'll send pricing and session timelines to <strong style={{color:'#fff'}}>{email}</strong>{phone ? <> and text <strong style={{color:'#fff'}}>{phone}</strong></> : null} within one business day.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Dot({ active, done }) {
  return (
    <span style={{
      width: 8, height: 8, borderRadius: '50%',
      background: done ? '#30d158' : active ? '#2997ff' : 'rgba(255,255,255,0.22)',
      display: 'inline-block',
    }}/>
  );
}
function DotSep({ active }) {
  return <span style={{width: 18, height: 1, background: active ? '#2997ff' : 'rgba(255,255,255,0.22)', display: 'inline-block'}}/>;
}
function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flexShrink:0}}>
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

// Delayed popup — unchanged behavior; uses the primary lead copy now.
function EmailCapturePopup() {
  const [open, setOpen] = useStateEC(false);
  const [email, setEmail] = useStateEC('');
  const [sent, setSent] = useStateEC(false);

  useEffectEC(() => {
    if (typeof window === 'undefined') return;
    let seen = false;
    try { seen = sessionStorage.getItem('htr_ec_popup_seen') === '1'; } catch (e) {}
    if (seen) return;

    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      try { sessionStorage.setItem('htr_ec_popup_seen', '1'); } catch (e) {}
      setOpen(true);
    };

    const t = setTimeout(fire, 40000);
    const onLeave = (e) => {
      if (e.clientY <= 0 && e.relatedTarget === null) fire();
    };
    document.addEventListener('mouseleave', onLeave);
    return () => { clearTimeout(t); document.removeEventListener('mouseleave', onLeave); };
  }, []);

  if (!open) return null;
  const close = () => setOpen(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(close, 1800);
  };

  return (
    <div style={ecStyles.pop} role="dialog" aria-modal="true" aria-labelledby="ec-pop-h" onClick={close}>
      <div style={ecStyles.popCard} onClick={(e) => e.stopPropagation()}>
        <button onClick={close} style={ecStyles.popClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        {!sent ? (
          <>
            <h3 id="ec-pop-h" style={ecStyles.popH}>Want a free estimate?</h3>
            <p style={ecStyles.popP}>Realistic pricing and session timelines, based on your tattoo. No sales emails.</p>
            <form onSubmit={submit} style={ecStyles.popForm} noValidate>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" style={ecStyles.popInput} autoFocus
              />
              <button type="submit" style={ecStyles.popBtn}>Get my estimate</button>
            </form>
            <div style={ecStyles.popTrust}>
              <LockIcon/>
              <span>We respect your privacy. No spam.</span>
            </div>
          </>
        ) : (
          <div style={ecStyles.popDone}>
            <div style={ecStyles.doneIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div>
              <div style={{fontSize: 17, fontWeight: 600, letterSpacing: '-0.224px', color: '#1d1d1f'}}>Got it — check your inbox.</div>
              <div style={{fontSize: 14, color: 'rgba(0,0,0,0.56)', letterSpacing: '-0.224px', marginTop: 2}}>We'll reply within one business day.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ecStyles = {
  section: {
    background: '#000',
    color: '#fff',
    padding: '120px 24px',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
  },
  inner: {
    maxWidth: 760, margin: '0 auto', position: 'relative',
  },
  eyebrow: {
    fontSize: 14, fontWeight: 600, color: '#2997ff',
    letterSpacing: '-0.224px', marginBottom: 16,
    textTransform: 'none',
  },
  h: {
    margin: 0,
    fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif',
    fontSize: 52, fontWeight: 600, lineHeight: 1.07,
    letterSpacing: '-0.4px',
    textWrap: 'balance',
  },
  sub: {
    margin: '20px auto 0', maxWidth: 560,
    fontSize: 19, lineHeight: 1.47, letterSpacing: '-0.374px',
    color: 'rgba(255,255,255,0.72)',
  },
  form: {
    marginTop: 48,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
  },
  stepDots: {
    display: 'flex', alignItems: 'center', gap: 6,
    fontSize: 12, letterSpacing: '-0.12px', color: 'rgba(255,255,255,0.56)',
  },
  stepLabel: { marginLeft: 8 },
  stepCopy: {
    fontSize: 15, lineHeight: 1.5, letterSpacing: '-0.224px',
    color: 'rgba(255,255,255,0.72)',
    maxWidth: 520, margin: '4px auto 0',
  },
  row: {
    display: 'flex', gap: 10,
    width: '100%', maxWidth: 520, margin: '8px auto 0',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1 1 260px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.16)',
    borderRadius: 980,
    padding: '14px 20px',
    fontSize: 16, letterSpacing: '-0.374px', color: '#fff',
    fontFamily: 'inherit', outline: 'none',
    minWidth: 0,
  },
  btn: {
    background: '#0071e3', color: '#fff', border: 'none',
    padding: '14px 24px', borderRadius: 980,
    fontFamily: 'inherit', fontSize: 16, fontWeight: 500,
    letterSpacing: '-0.374px', cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  trust: {
    marginTop: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontSize: 12, letterSpacing: '-0.12px',
    color: 'rgba(255,255,255,0.48)',
    flexWrap: 'wrap',
  },
  skipBtn: {
    background: 'transparent', border: 'none',
    color: 'rgba(255,255,255,0.72)', cursor: 'pointer',
    fontFamily: 'inherit', fontSize: 12, letterSpacing: '-0.12px',
    padding: 0, textDecoration: 'underline',
  },
  srOnly: {
    position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
    overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
  },

  // success state
  done: {
    marginTop: 48,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
  },
  doneIcon: {
    width: 56, height: 56, borderRadius: '50%',
    background: 'rgba(48,209,88,0.12)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  doneH: {
    fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif',
    fontSize: 28, fontWeight: 600, letterSpacing: '-0.3px',
  },
  doneB: {
    maxWidth: 520, fontSize: 16, lineHeight: 1.5,
    letterSpacing: '-0.224px', color: 'rgba(255,255,255,0.72)',
  },

  // popup
  pop: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: 20,
    animation: 'ec-fade 220ms ease-out',
  },
  popCard: {
    position: 'relative',
    background: '#fff', borderRadius: 18, padding: '36px 32px 28px',
    maxWidth: 420, width: '100%',
    color: '#1d1d1f',
    boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
    animation: 'ec-pop 260ms cubic-bezier(0.2, 0.9, 0.3, 1.2)',
    textAlign: 'left',
  },
  popClose: {
    position: 'absolute', top: 14, right: 14,
    width: 28, height: 28, borderRadius: '50%',
    border: 'none', background: 'rgba(0,0,0,0.04)',
    color: 'rgba(0,0,0,0.56)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  popH: {
    margin: 0,
    fontFamily: '-apple-system, "SF Pro Display", Inter, sans-serif',
    fontSize: 24, fontWeight: 600, letterSpacing: '-0.3px',
  },
  popP: {
    margin: '8px 0 20px',
    fontSize: 15, lineHeight: 1.5, color: 'rgba(0,0,0,0.64)',
    letterSpacing: '-0.224px',
  },
  popForm: {
    display: 'flex', flexDirection: 'column', gap: 8,
  },
  popInput: {
    background: '#fafafc',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: 980,
    padding: '12px 18px',
    fontSize: 15, letterSpacing: '-0.374px', color: '#1d1d1f',
    fontFamily: 'inherit', outline: 'none',
  },
  popBtn: {
    background: '#0071e3', color: '#fff', border: 'none',
    padding: '12px 22px', borderRadius: 980,
    fontFamily: 'inherit', fontSize: 15, cursor: 'pointer', letterSpacing: '-0.374px',
  },
  popTrust: {
    marginTop: 14,
    display: 'flex', alignItems: 'center', gap: 6,
    fontSize: 12, letterSpacing: '-0.12px',
    color: 'rgba(0,0,0,0.48)',
  },
  popDone: {
    display: 'flex', alignItems: 'center', gap: 14,
  },
};

Object.assign(window, { EmailCapture, EmailCapturePopup });

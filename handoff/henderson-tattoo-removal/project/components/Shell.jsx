// Nav + Footer, adapted for Henderson Tattoo Removal, with hash-route links.
const { useState: useStateShell, useEffect: useEffectShell } = React;

function useRoute() {
  const [hash, setHash] = useStateShell(() => window.location.hash || '#/');
  useEffectShell(() => {
    const on = () => {
      setHash(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}

function Logomark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2" opacity=".25"/>
      <path d="M 12 32 A 20 20 0 0 1 52 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="2.5" fill="currentColor"/>
    </svg>
  );
}

function Nav({ onBook }) {
  const route = useRoute();
  const items = [
    { label: 'Services', href: '#/services' },
    { label: 'Before & after', href: '#/results' },
    { label: 'About', href: '#/about' },
    { label: 'Contact', href: '#/contact' },
  ];
  const isActive = (href) => route.startsWith(href);
  return (
    <nav style={navStyles.bar}>
      <div style={navStyles.inner}>
        <a href="#/" style={navStyles.brand}>
          <Logomark/>
          <span>Henderson Tattoo Removal</span>
        </a>
        <div style={navStyles.links}>
          {items.map(i => (
            <a key={i.href} href={i.href}
               style={{...navStyles.link, color: isActive(i.href) ? '#fff' : 'rgba(255,255,255,0.72)'}}>
              {i.label}
            </a>
          ))}
        </div>
        <div style={navStyles.actions}>
          <button onClick={onBook} style={navStyles.bookPill}>Book a consult</button>
        </div>
      </div>
    </nav>
  );
}

const navStyles = {
  bar: {
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'saturate(180%) blur(20px)',
    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
    height: 48,
  },
  inner: {
    maxWidth: 1080, margin: '0 auto', height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 22px', color: '#fff', gap: 24,
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 8,
    color: '#fff', textDecoration: 'none',
    fontSize: 14, fontWeight: 600, letterSpacing: '-0.224px',
    whiteSpace: 'nowrap',
  },
  links: { display: 'flex', gap: 28, flex: 1, justifyContent: 'center' },
  link: {
    textDecoration: 'none',
    fontSize: 12, fontWeight: 400, letterSpacing: '-0.12px',
    transition: 'color 120ms ease',
  },
  actions: { display: 'flex', gap: 16, alignItems: 'center' },
  bookPill: {
    color: '#fff', textDecoration: 'none', border: 'none',
    fontSize: 12, fontWeight: 500, letterSpacing: '-0.12px',
    background: '#0071e3', borderRadius: 980, padding: '6px 14px',
    cursor: 'pointer', fontFamily: 'inherit',
  },
};

function Footer() {
  const cols = [
    { h: 'Treatment', items: [
      ['Laser tattoo removal', '#/services'],
      ['Pricing', '#/#pricing'],
      ['Before & after', '#/results'],
      ['Aftercare', '#/services'],
    ]},
    { h: 'Service area', items: [
      ['Henderson, NV', '#/contact'],
      ['Las Vegas', '#/contact'],
      ['Summerlin', '#/contact'],
      ['Hours', '#/contact'],
    ]},
    { h: 'Company', items: [
      ['About', '#/about'],
      ['The team', '#/about'],
      ['Press', '#/about'],
    ]},
    { h: 'Support', items: [
      ['Contact', '#/contact'],
      ['FAQ', '#/#faq'],
      ['Accessibility', '#/contact'],
    ]},
  ];
  return (
    <footer style={footerStyles.section}>
      <div style={footerStyles.inner}>
        <div style={footerStyles.cols}>
          {cols.map(c => (
            <div key={c.h}>
              <div style={footerStyles.colH}>{c.h}</div>
              {c.items.map(([label, href]) => (
                <a key={label} href={href} style={footerStyles.colLink}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={footerStyles.legal}>
          <div>© 2026 Henderson Tattoo Removal · Serving Henderson, Las Vegas, Summerlin, and surrounding areas · (702) 659-7135</div>
          <div style={{display:'flex', gap: 18}}>
            <a href="#/contact" style={footerStyles.legalLink}>Privacy</a>
            <a href="#/contact" style={footerStyles.legalLink}>Terms</a>
            <a href="#/contact" style={footerStyles.legalLink}>HIPAA notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerStyles = {
  section: { background: '#000', color: '#fff', padding: '56px 24px 32px' },
  inner: { maxWidth: 1080, margin: '0 auto' },
  cols: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.12)' },
  colH: { fontSize: 12, fontWeight: 600, letterSpacing: '-0.12px', color: '#fff', marginBottom: 12 },
  colLink: { display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '4px 0', letterSpacing: '-0.12px' },
  legal: {
    marginTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
    fontSize: 12, color: 'rgba(255,255,255,0.48)', letterSpacing: '-0.12px',
  },
  legalLink: { color: 'rgba(255,255,255,0.7)', textDecoration: 'none' },
};

Object.assign(window, { Nav, Footer, useRoute, Logomark });

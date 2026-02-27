import { PhoneIcon as Phone, EnvelopeSimpleIcon as EnvelopeSimple, MapPinIcon as MapPin, FacebookLogoIcon as FacebookLogo, XLogoIcon as XLogo, InstagramLogoIcon as InstagramLogo, LinkedinLogoIcon as LinkedinLogo } from '@phosphor-icons/react/dist/ssr';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
      <div className="container" style={{ padding: '64px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>

          {/* Column 1 - Company Info */}
          <div>
            <h2 className="h2 mb-16" style={{ fontSize: '24px', fontWeight: 700 }}>Company Name</h2>
            <p className="text-body" style={{ lineHeight: '1.6', maxWidth: '90%', marginBottom: '32px', fontSize: '14px', color: 'var(--fg-muted)' }}>
              Experience a world of fresh possibilities at our online grocery store.
            </p>

            {/* Download App */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: 'var(--fg-primary)' }}>Download our app</h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href="#" style={{ display: 'inline-block' }}>
                  <div style={{
                    background: '#000',
                    color: '#fff',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    lineHeight: 1.2,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                    <div>
                      <div style={{ fontSize: '8px', opacity: 0.8 }}>Download on the</div>
                      <div style={{ fontSize: '12px', fontWeight: 600 }}>App Store</div>
                    </div>
                  </div>
                </a>
                <a href="#" style={{ display: 'inline-block' }}>
                  <div style={{
                    background: '#000',
                    color: '#fff',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    lineHeight: 1.2,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                    <div>
                      <div style={{ fontSize: '8px', opacity: 0.8 }}>GET IT ON</div>
                      <div style={{ fontSize: '12px', fontWeight: 600 }}>Google Play</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: 'var(--fg-primary)' }}>Follow us on</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="#" style={{ color: '#1877f2' }}><FacebookLogo size={28} weight="fill" /></a>
                <a href="#" style={{ color: '#000' }}><XLogo size={28} weight="fill" /></a>
                <a href="#" style={{ color: '#e1306c' }}><InstagramLogo size={28} weight="fill" /></a>
                <a href="#" style={{ color: '#0077b5' }}><LinkedinLogo size={28} weight="fill" /></a>
              </div>
            </div>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="h4 mb-16" style={{ fontSize: '18px', fontWeight: 600 }}>Links</h4>
            <ul className="flex-col gap-12" style={{ listStyle: 'none', color: 'var(--fg-secondary)', fontSize: '16px' }}>
              <li><a href="#" style={{ transition: 'color 0.15s' }} onMouseEnter={e => e.target.style.color = '#059669'} onMouseLeave={e => e.target.style.color = 'inherit'}>About Us</a></li>
              <li><a href="#" style={{ transition: 'color 0.15s' }} onMouseEnter={e => e.target.style.color = '#059669'} onMouseLeave={e => e.target.style.color = 'inherit'}>Privacy Policy</a></li>
              <li><a href="#" style={{ transition: 'color 0.15s' }} onMouseEnter={e => e.target.style.color = '#059669'} onMouseLeave={e => e.target.style.color = 'inherit'}>Return Policy</a></li>
              <li><a href="#" style={{ transition: 'color 0.15s' }} onMouseEnter={e => e.target.style.color = '#059669'} onMouseLeave={e => e.target.style.color = 'inherit'}>Terms & Condition</a></li>
              <li><a href="#" style={{ transition: 'color 0.15s' }} onMouseEnter={e => e.target.style.color = '#059669'} onMouseLeave={e => e.target.style.color = 'inherit'}>FAQs</a></li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="h4 mb-16" style={{ fontSize: '18px', fontWeight: 600 }}>Contact us</h4>
            <div className="flex-col gap-12">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <Phone size={20} color="var(--accent-primary)" />
                <span style={{ fontSize: '16px' }}>+91 59874568</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <EnvelopeSimple size={20} color="var(--accent-primary)" />
                <span style={{ fontSize: '16px' }}>contact@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <MapPin size={20} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '16px' }}>Rz-65/32 Indiranagar, Bangalore</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        marginTop: '48px',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '48px auto 0',
        width: '100%',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}>
        <span style={{ fontSize: '14px', color: 'var(--fg-muted)' }}>All Right Reserved 2022-23</span>
        <a href="#" style={{ fontSize: '14px', color: 'var(--fg-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => e.target.style.color = '#059669'}
          onMouseLeave={e => e.target.style.color = 'var(--fg-muted)'}
        >
          Terms and Condition
        </a>
      </div>
    </footer>
  );
}

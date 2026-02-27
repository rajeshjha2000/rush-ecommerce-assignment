import { Phone, EnvelopeSimple } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)', padding: '64px 0', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
          
          <div>
            <h2 className="h2 mb-16" style={{ fontSize: '24px', fontWeight: 600 }}>Company Name</h2>
            <p className="text-body" style={{ lineHeight: '1.6', maxWidth: '80%' }}>
              Experience a world of fresh possibilities at our online grocery store.
            </p>
          </div>

          <div>
            <h4 className="h4 mb-16" style={{ fontSize: '18px', fontWeight: 600 }}>Links</h4>
            <ul className="flex-col gap-12" style={{ listStyle: 'none', color: 'var(--fg-secondary)', fontSize: '16px' }}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

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
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

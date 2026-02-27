import { ShoppingCartIcon as ShoppingCart, MagnifyingGlassIcon as MagnifyingGlass, MapPinIcon as MapPin, CaretDownIcon as CaretDown, HeartIcon as Heart } from '@phosphor-icons/react/dist/ssr';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/?search=${encodeURIComponent(search)}`);
    }
  };

  const dropdownItems = [
    { label: 'Profile', path: '/profile' },
    { label: 'Orders', path: '/profile/orders' },
    { label: 'Addresses', path: '/profile/addresses' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'Logout', path: '/logout', isLogout: true },
  ];

  return (
    <header style={{ background: '#fff', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container flex items-center justify-between">

        <div className="flex items-center gap-32">
          <Link to="/" style={{ fontSize: '28px', fontWeight: 700, color: '#059669', textDecoration: 'none' }}>RuSH</Link>
          <div className="flex items-center gap-4" style={{ color: 'var(--fg-primary)', cursor: 'pointer' }}>
            <MapPin size={20} />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Sector 15 Faridabad</span>
            <CaretDown size={14} />
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: '500px', margin: '0 32px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for products (e.g. apple, oil, fish)"
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                borderRadius: '6px',
                border: '1px solid #75B798',
                fontSize: '14px',
                outline: 'none',
                color: 'var(--fg-primary)'
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
            <MagnifyingGlass
              size={20}
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#75B798' }}
            />
          </div>
        </div>

        <nav className="flex items-center gap-24">
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              style={{
                fontSize: '18px',
                color: 'var(--fg-secondary)',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontWeight: 400
              }}
            >
              Login
            </button>

            {showUserDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '12px',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                zIndex: 2000,
                width: '180px',
              }}>
                {dropdownItems.map((item, index) => (
                  <div key={item.label} style={{ padding: '0 16px' }}>
                    <Link
                      to={item.isLogout ? '#' : item.path}
                      onClick={() => {
                        setShowUserDropdown(false);
                        if (item.isLogout) {
                          // Handle logout logic if needed
                          alert('Logging out...');
                        }
                      }}
                      style={{
                        display: 'block',
                        padding: '14px 0',
                        color: '#334155',
                        textDecoration: 'none',
                        fontSize: '18px',
                        borderBottom: index === dropdownItems.length - 1 ? 'none' : '1px solid #e5e7eb',
                        transition: 'color 0.2s',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#059669'}
                      onMouseLeave={(e) => e.target.style.color = '#334155'}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#059669', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontSize: '18px', fontWeight: 500 }}>
            <ShoppingCart size={24} color="white" />
            My Cart
          </Link>
        </nav>

      </div>
    </header>
  );
}

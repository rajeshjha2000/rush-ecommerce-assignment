import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategories, getProducts } from '../services/api';
import ProductCard from '../components/product/ProductCard';

export default function Home() {
  const [searchParams] = useSearchParams();
  const searchQ = searchParams.get('search');

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  // Also fetch pulses separately to show statically below
  const [pulses, setPulses] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
    getProducts('Pulses', '').then(setPulses).catch(() => setPulses([]));
  }, []);

  useEffect(() => {
    getProducts(activeCategory, searchQ).then(res => setProducts(res)).catch(() => setProducts([]));
  }, [activeCategory, searchQ]);

  // Mock image mapping for categories
  const categoryImages = {
    'Wheat': 'https://rush-ecommerce-assignment.onrender.com/images/atta.png',
    'Pulses': 'https://rush-ecommerce-assignment.onrender.com/images/dal.png',
    'Dairy Products': 'https://rush-ecommerce-assignment.onrender.com/images/paneer.png',
    'Drinks & Juices': 'https://rush-ecommerce-assignment.onrender.com/images/snacks.png',
    'Atta, Rice & Dal': 'https://rush-ecommerce-assignment.onrender.com/images/atta.png',
    'Masala': 'https://rush-ecommerce-assignment.onrender.com/images/dal.png',
    'Snacks': 'https://rush-ecommerce-assignment.onrender.com/images/snacks.png',
  };

  const heroBanners = [
    {
      id: 1,
      bg: '#EFE5D8',
      circleBg: '#E2D1B8',
      title: 'Wheat',
      subtitle: 'Fresh and Healthy',
      titleColor: '#6B7A56',
      img: '/assets/Wheat.png',
      imgStyle: { right: '-30px', top: '10px', height: '320px' }
    },
    {
      id: 2,
      bg: '#FFF0D9',
      circleBg: '#FFDEB5',
      title: 'Pulses',
      subtitle: 'Exotic and Delicious',
      titleColor: '#C88A3B',
      img: '/assets/Pulses.png',
      imgStyle: { right: '20px', top: '70px', height: '220px' }
    },
    {
      id: 3,
      bg: '#EFE5D8',
      circleBg: '#E2D1B8',
      title: 'Wheat',
      subtitle: 'Fresh and Healthy',
      titleColor: '#6B7A56',
      img: '/assets/Wheat.png',
      imgStyle: { right: '-30px', top: '10px', height: '320px' }
    },
    {
      id: 4,
      bg: '#FFF0D9',
      circleBg: '#FFDEB5',
      title: 'Pulses',
      subtitle: 'Exotic and Delicious',
      titleColor: '#C88A3B',
      img: '/assets/Pulses.png',
      imgStyle: { right: '20px', top: '70px', height: '220px' }
    }
  ];

  return (
    <div className="container" style={{ paddingBottom: '64px' }}>
      {/* Hero Carousel Section */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '64px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '16px' }}>
        {heroBanners.map(banner => (
          <div key={banner.id} style={{
            flex: '0 0 auto',
            width: '600px',
            background: banner.bg,
            borderRadius: '24px',
            padding: '48px 64px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '340px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <div style={{ position: 'absolute', top: '-100px', right: '40px', width: '400px', height: '400px', background: banner.circleBg, borderRadius: '50%', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '200px', height: '200px', background: banner.circleBg, borderRadius: '50%', zIndex: 0, opacity: 0.6 }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <span style={{ fontSize: '18px', fontWeight: 500, color: '#111' }}>{banner.subtitle}</span>
              <h2 style={{ fontSize: '56px', fontWeight: 700, color: banner.titleColor, margin: '8px 0 0 0' }}>{banner.title}</h2>
            </div>
            <img src={banner.img} alt={banner.title} style={{ position: 'absolute', objectFit: 'contain', zIndex: 1, ...banner.imgStyle }} />
          </div>
        ))}
      </div>

      {/* Featured Categories */}
      <div className="mb-48">
        <h3 className="h3 mb-24" style={{ fontSize: '20px' }}>Featured Categories</h3>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <div key={cat} style={{ flex: '0 0 auto', width: '130px', background: '#FDFBF4', borderRadius: '12px', padding: '16px', textAlign: 'center', cursor: 'pointer', border: '1px solid #F3F1E7' }} onClick={() => setActiveCategory(cat)}>
              <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <img src={categoryImages[cat] || 'http://localhost:5000/images/snacks.png'} alt={cat} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-secondary)' }}>
                {cat}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Products Header with Inline Categories */}
      <div className="mb-48">
        <div className="flex items-center justify-between mb-24" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <h2 className="h2" style={{ fontSize: '22px' }}>Popular Products</h2>
          <div className="flex gap-24" style={{ overflowX: 'auto', paddingBottom: '4px', whiteSpace: 'nowrap' }}>
            {['All', 'Dairy', 'Pulses', 'Masala', 'Drinks'].map(tab => (
              <span
                key={tab}
                onClick={() => setActiveCategory(tab === 'All' ? 'All' : tab)}
                style={{
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: activeCategory.includes(tab) || (tab === 'All' && activeCategory === 'All') ? 600 : 500,
                  color: activeCategory.includes(tab) || (tab === 'All' && activeCategory === 'All') ? 'var(--accent-primary)' : 'var(--fg-secondary)',
                  borderBottom: activeCategory.includes(tab) || (tab === 'All' && activeCategory === 'All') ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  paddingBottom: '4px'
                }}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Static Pulses Section */}
      {pulses.length > 0 && (
        <div className="mb-48">
          <h2 className="h2 mb-24" style={{ fontSize: '22px' }}>Pulses</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {pulses.map(product => (
              <ProductCard key={`${product.id}-pulse`} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Category Quick Links */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '64px', flexWrap: 'wrap' }}>
        {[
          { name: 'Pulses', img: categoryImages['Pulses'] || 'http://localhost:5000/images/dal.png' },
          { name: 'Oil', img: categoryImages['Drinks & Juices'] || 'http://localhost:5000/images/snacks.png' },
          { name: 'Wheat & Rice', img: categoryImages['Wheat'] || 'http://localhost:5000/images/atta.png' },
        ].map(cat => (
          <div
            key={cat.name}
            onClick={() => setActiveCategory(cat.name === 'Wheat & Rice' ? 'Wheat' : cat.name)}
            style={{
              flex: '1 1 200px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 24px',
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <img src={cat.img} alt={cat.name} style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--fg-primary)' }}>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Stay Home CTA Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
        borderRadius: '24px',
        padding: '48px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '500px', zIndex: 1 }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e', lineHeight: 1.3, marginBottom: '12px' }}>
            Stay home & get your daily needs from our shop
          </h2>
          <p style={{ fontSize: '16px', color: '#555', marginBottom: '24px' }}>
            Start your Daily shopping with Fresh
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#e53935',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#c62828'}
            onMouseLeave={e => e.currentTarget.style.background = '#e53935'}
          >
            Shop Now
            <span style={{ fontSize: '20px' }}>›</span>
          </a>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img
            src="/assets/shopping_illustration.png"
            alt="Online grocery shopping"
            style={{ width: '250px', height: '250px', objectFit: 'contain' }}
          />
        </div>
      </div>

    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { ShoppingCartIcon as ShoppingCart, HeartIcon as Heart } from '@phosphor-icons/react/dist/ssr';
import axios from 'axios';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  useEffect(() => {
    // We fetch all products and find to simulate API for a single product easily
    axios.get(`http://localhost:5000/api/products?category=All`).then(res => {
      const found = res.data.find(p => p.id.toString() === id);
      setProduct(found);
    });
  }, [id]);

  if (!product) return <div className="container" style={{ paddingTop: '64px' }}>Loading...</div>;

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const selectedVariant = product.variants[selectedVariantIdx];

  const handleAddToCart = () => {
    dispatch(addToCart({ product, variant: selectedVariant }));
    alert('Added to cart!');
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="container" style={{ paddingBottom: '64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '64px', alignItems: 'start', marginBottom: '48px' }}>

        {/* Left: Image Viewer */}
        <div>
          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '32px', marginBottom: '16px', display: 'flex', justifyContent: 'center', background: 'white' }}>
            <img src={product.image} alt={product.name} style={{ maxHeight: '400px', objectFit: 'contain' }} />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ border: i === 1 ? '2px solid var(--accent-primary)' : '1px solid var(--border)', borderRadius: '8px', padding: '8px', cursor: 'pointer', background: 'white', flex: 1, display: 'flex', justifyContent: 'center' }}>
                <img src={product.image} alt="thumbnail" style={{ height: '60px', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--fg-secondary)', marginBottom: '16px' }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
            <span style={{ fontSize: '20px', fontWeight: 500, color: 'var(--fg-secondary)' }}>Price :</span>
            <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-primary)' }}>Rs {selectedVariant.price}</span>
            <span style={{ fontSize: '14px', color: 'var(--accent-primary)' }}>/{selectedVariant.weight}</span>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--fg-secondary)', marginBottom: '16px' }}>Select Quantity</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {product.variants.map((v, i) => {
                const isSelected = i === selectedVariantIdx;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedVariantIdx(i)}
                    style={{
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      background: 'white',
                      position: 'relative'
                    }}
                  >
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '-6px', left: '-6px', background: 'white', borderRadius: '50%' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-primary)"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.118 3.121a1 1 0 001.414 0l5.952-5.95-1.062-1.062-5.6 5.6z" /></svg>
                      </div>
                    )}
                    <span style={{ fontSize: '16px', fontWeight: 500 }}>{v.weight}</span>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--accent-primary)' }}>Rs {v.price}</div>
                      {v.originalPrice && (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: 'var(--fg-faint)', textDecoration: 'line-through' }}>Rs {v.originalPrice}</span>
                          <span style={{ fontSize: '10px', background: '#dcfce7', color: 'var(--accent-hover)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>25% OFF</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ flex: 1, padding: '14px', fontSize: '16px', borderRadius: '8px', background: '#059669' }}
            >
              <ShoppingCart size={20} weight="fill" />
              Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className="btn btn-secondary"
              style={{
                flex: 1, padding: '14px', fontSize: '16px', borderRadius: '8px',
                background: isWishlisted ? '#fee2e2' : 'white',
                color: isWishlisted ? '#ef4444' : 'var(--fg-secondary)',
                borderColor: isWishlisted ? '#fecaca' : 'var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              <Heart size={20} weight={isWishlisted ? "fill" : "regular"} />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div style={{ marginTop: '48px', borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Description</h3>
        <p style={{ color: 'var(--fg-secondary)', lineHeight: '1.6', fontSize: '14px' }}>
          {product.name} has now become a standard of quality packaged goods across the country. Behind every pack are the experts who've made it with extra care. We pride ourselves in delivering 100% pure quality with all its natural dietary fibres intact which ensure that you and your family receive optimum nutrition for a healthy life. Directly sourced from a wide network of reliable farmers.
        </p>
      </div>

    </div>
  );
}

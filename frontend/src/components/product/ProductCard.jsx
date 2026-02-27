import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { HeartIcon as Heart, ShoppingCartIcon as ShoppingCart } from '@phosphor-icons/react/dist/ssr';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const navigate = useNavigate();

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const selectedVariant = product.variants[selectedVariantIdx];

  const handleAddToCart = () => {
    dispatch(addToCart({ product, variant: selectedVariant }));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
      <button
        onClick={handleToggleWishlist}
        style={{ position: 'absolute', top: '16px', right: '16px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
      >
        <Heart size={20} weight={isWishlisted ? "fill" : "regular"} />
      </button>

      <div onClick={handleNavigate} style={{ padding: '16px', textAlign: 'center', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '11px', color: 'var(--fg-muted)', marginBottom: '4px' }}>{product.category || 'Food'}</div>
        <h4 onClick={handleNavigate} className="h4" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg-secondary)', marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', cursor: 'pointer' }}>
          {product.name}
        </h4>

        {product.variants.length > 1 ? (
          <select
            className="input"
            value={selectedVariantIdx}
            onChange={(e) => setSelectedVariantIdx(Number(e.target.value))}
            style={{ padding: '2px 4px', fontSize: '12px', width: 'fit-content', marginBottom: '12px', border: 'none', background: 'transparent', color: 'var(--fg-secondary)', paddingLeft: 0 }}
          >
            {product.variants.map((v, i) => (
              <option key={i} value={i}>{v.weight}</option>
            ))}
          </select>
        ) : (
          <div style={{ fontSize: '12px', color: 'var(--fg-secondary)', marginBottom: '12px' }}>{selectedVariant.weight}</div>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-baseline gap-4">
          <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--accent-primary)' }}>Rs {selectedVariant.price}</span>
          {selectedVariant.originalPrice && (
            <span style={{ textDecoration: 'line-through', color: 'var(--fg-faint)', fontSize: '11px' }}>Rs {selectedVariant.originalPrice}</span>
          )}
        </div>
        <button onClick={handleAddToCart} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '4px' }}>
          <ShoppingCart size={16} weight="fill" />
          Add
        </button>
      </div>
    </div>
  );
}

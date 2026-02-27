import { useSelector } from 'react-redux';
import ProductCard from '../components/product/ProductCard';

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <div className="container" style={{ paddingBottom: '64px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '32px', textAlign: 'center' }}>My Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--fg-muted)' }}>
          <p>Your wishlist is empty. Start adding products you love!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

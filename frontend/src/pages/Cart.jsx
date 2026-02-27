import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { createOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantity = (item, delta) => {
    const newQ = item.quantity + delta;
    if (newQ > 0) {
      dispatch(updateQuantity({ productId: item.id, weight: item.variant.weight, quantity: newQ }));
    }
  };

  const mrp = cart.reduce((acc, item) => acc + (item.variant.price * item.quantity), 0);
  const delivery = mrp > 0 ? 0 : 0; // Mock delivery is 0 in screenshot
  const handling = mrp > 0 ? 100 : 0; // Mock handling is 100
  const discount = mrp > 0 ? 100 : 0; // Mock discount is 100
  const total = mrp + delivery + handling - discount;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    
    const orderData = {
      items: cart.map(c => ({
        name: c.name,
        weight: c.variant.weight,
        price: c.variant.price,
        quantity: c.quantity,
        total: c.variant.price * c.quantity
      })),
      summary: { mrp, delivery, handling, discount, total },
      paymentMode: "Cash On Delivery",
      deliveryAddress: "Selected Address (Mocked)"
    };

    try {
      await createOrder(orderData);
      dispatch(clearCart());
      navigate('/profile/orders');
    } catch (e) {
      console.error(e);
      alert('Checkout Failed');
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2 className="h2 mb-16">Your Cart is Empty</h2>
        <p className="text-body">Start adding items to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <>
      {/* Announcement Bar */}
      <div style={{ background: '#dcfce7', padding: '12px 0', textAlign: 'center', borderBottom: '1px solid var(--border)', marginBottom: '32px' }}>
        <span style={{ color: '#166534', fontSize: '15px', fontWeight: 400 }}>
          Our working hours: 09:00 AM to 10:00 PM. Orders placed after 10:00 PM will be delivered the next day.
        </span>
      </div>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 600, marginBottom: '32px' }}>Your Cart</h2>
      
      {/* Main Cart Table */}
      <div style={{ width: '100%', overflowX: 'auto', marginBottom: '48px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr style={{ background: '#F8F9FA' }}>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid var(--border)' }}>S. No</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid var(--border)' }}>Quantity</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid var(--border)' }}>Price</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid var(--border)' }}>Total</th>
              <th style={{ padding: '16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid var(--border)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={`${item.id}-${item.variant.weight}`}>
                <td style={{ padding: '16px', color: 'var(--fg-secondary)', fontSize: '14px' }}>{idx + 1}</td>
                <td style={{ padding: '16px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '36px', height: '48px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '14px', color: 'var(--fg-primary)' }}>{item.name}</span>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: '4px', padding: '4px 8px', fontSize: '13px' }}>
                    <button onClick={() => handleQuantity(item, -1)} style={{ padding: '0 8px', color: 'var(--fg-secondary)', fontSize: '16px' }}>−</button>
                    <span style={{ margin: '0 8px', fontWeight: 500 }}>{item.quantity} {item.variant.weight.replace(/[0-9]/g, '').trim() === 'g' && item.quantity >= 1 ? 'kg' : item.variant.weight}</span>
                    <button onClick={() => handleQuantity(item, 1)} style={{ padding: '0 8px', color: 'var(--fg-secondary)', fontSize: '16px' }}>+</button>
                  </div>
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--fg-primary)' }}>{item.variant.price}</td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--fg-primary)' }}>{item.variant.price * item.quantity}</td>
                <td style={{ padding: '16px' }}>
                  <button 
                    onClick={() => dispatch(removeFromCart({ productId: item.id, weight: item.variant.weight }))} 
                    style={{ color: '#3b82f6', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Section: Coupon & Totals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 350px', gap: '64px', alignItems: 'start' }}>
        
        {/* Left: Coupon */}
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px' }}>Apply Coupen</h3>
          <div style={{ display: 'flex', gap: '16px' }}>
            <input 
              type="text" 
              defaultValue="WELCOME100" 
              style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '14px' }} 
            />
            <button 
              style={{ background: '#059669', color: 'white', padding: '12px 32px', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 500, cursor: 'pointer' }}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Right: Cart Total */}
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px' }}>Cart Total</h3>
          
          <div style={{ border: '1px solid var(--border)', borderRadius: '4px', background: 'white', marginBottom: '16px' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
              <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid var(--border)', color: 'var(--fg-secondary)', fontSize: '14px' }}>Cart Total</div>
              <div style={{ flex: 1, padding: '12px 16px', textAlign: 'center', color: 'var(--fg-secondary)', fontSize: '14px' }}>{mrp}</div>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
              <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid var(--border)', color: 'var(--fg-secondary)', fontSize: '14px' }}>Delivery Charges</div>
              <div style={{ flex: 1, padding: '12px 16px', textAlign: 'center', color: 'var(--fg-secondary)', fontSize: '14px' }}>{delivery}</div>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
              <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid var(--border)', color: 'var(--fg-secondary)', fontSize: '14px' }}>Handling Charges</div>
              <div style={{ flex: 1, padding: '12px 16px', textAlign: 'center', color: 'var(--fg-secondary)', fontSize: '14px' }}>{handling}</div>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
              <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid var(--border)', color: 'var(--fg-secondary)', fontSize: '14px' }}>Discount</div>
              <div style={{ flex: 1, padding: '12px 16px', textAlign: 'center', color: 'var(--fg-secondary)', fontSize: '14px' }}>{discount}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, padding: '12px 16px', borderRight: '1px solid var(--border)', fontWeight: 600, fontSize: '14px' }}>Total</div>
              <div style={{ flex: 1, padding: '12px 16px', textAlign: 'center', fontWeight: 600, fontSize: '14px' }}>{total > 0 ? total : 0}</div>
            </div>
          </div>

          <button 
            onClick={handleCheckout} 
            disabled={isProcessing}
            style={{ width: '100%', background: '#059669', color: 'white', padding: '14px', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 500, cursor: 'pointer' }}
          >
            {isProcessing ? 'Processing...' : 'Proceed To Checkout'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

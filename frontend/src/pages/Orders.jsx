import { useState, useEffect } from 'react';
import { getOrders } from '../services/api';
import { Link } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px' }}>
        
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: 'var(--fg-primary)' }}>Orders</h2>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', marginBottom: '32px' }}>
          <input 
            type="text" 
            placeholder="Search Order" 
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              border: '1px solid var(--border)', 
              borderRadius: '4px 0 0 4px', 
              fontSize: '14px',
              outline: 'none'
            }} 
          />
          <button style={{ 
            background: '#059669', 
            color: 'white', 
            border: 'none', 
            padding: '0 32px', 
            borderRadius: '0 4px 4px 0', 
            fontSize: '16px', 
            fontWeight: 500, 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <MagnifyingGlass size={20} />
            Search
          </button>
        </div>

        {/* Orders Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg-secondary)' }}>Items</span>
                <span style={{ fontSize: '10px', color: 'var(--fg-muted)' }}>{new Date(order.date).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px', fontSize: '13px', color: 'var(--fg-primary)' }}>
                {order.items.slice(0, 2).map((item, idx) => (
                  <span key={idx}>{item.quantity} {item.name}</span>
                ))}
                {order.items.length > 2 && <span style={{ color: 'var(--fg-muted)' }}>+ {order.items.length - 2} more items</span>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--fg-secondary)' }}>Total Amount</span>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--fg-primary)' }}>Rs {order.summary.total}</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', margin: '0 -16px 16px', }}></div>

              <Link 
                to={`/profile/orders/${order.id}`} 
                style={{ 
                  background: '#059669', 
                  color: 'white', 
                  textAlign: 'center', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  textDecoration: 'none', 
                  fontSize: '14px', 
                  fontWeight: 500,
                  marginTop: 'auto'
                }}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

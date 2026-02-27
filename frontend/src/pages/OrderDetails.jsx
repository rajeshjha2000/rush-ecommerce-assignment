import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ChatCircleDotsIcon as ChatCircleDots, CaretRightIcon as CaretRight, DownloadSimpleIcon as DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import { generateInvoice } from '../services/invoiceGenerator';
import { getUser } from '../services/api';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('The Products are expired');
  const [cancelling, setCancelling] = useState(false);
  const [user, setUser] = useState(null);

  const fetchOrder = () => {
    axios.get(`http://localhost:5000/api/orders`).then(res => {
      const found = res.data.find(o => o.id === id);
      if (found) {
        setOrder(found);
      } else {
        setOrder(null);
        setError('Order not found');
      }
    }).catch(() => {
      setError('Failed to load order details');
    });
  };

  useEffect(() => {
    setOrder(null);
    setError('');
    fetchOrder();
    getUser().then(setUser).catch(() => setUser(null));
  }, [id]);

  const handleCancelOrder = async () => {
    setCancelling(true);
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/cancel`, { reason: cancelReason });
      setShowCancelModal(false);
      fetchOrder();
    } catch (err) {
      alert('Failed to cancel order. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  if (error) return (
    <div className="container" style={{ paddingTop: '64px', textAlign: 'center' }}>
      <p style={{ color: 'var(--fg-muted)', marginBottom: '16px' }}>{error}</p>
      <Link to="/profile/orders" style={{ color: '#059669', fontWeight: 500 }}>← Back to Orders</Link>
    </div>
  );

  if (!order) return <div className="container" style={{ paddingTop: '64px' }}>Loading...</div>;

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingBottom: '64px' }}>

      {/* Top Section */}
      <div style={{ background: 'white', padding: '32px', borderRadius: '8px', border: '1px solid var(--border)', position: 'relative' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '24px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Order Summary</h2>
          <span style={{ color: '#059669', fontWeight: 500, fontSize: '16px' }}>{order.status}</span>
        </div>

        {/* Cancellation Section */}
        {order.status === 'In Progress' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #D9984A',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              borderTopColor: '#f3f4f6', transform: 'rotate(-45deg)', position: 'relative'
            }}>
              <span style={{ fontSize: '14px', fontWeight: 600, transform: 'rotate(45deg)' }}>6</span>
              <span style={{ fontSize: '6px', transform: 'rotate(45deg)', marginTop: '-2px' }}>seconds</span>
            </div>

            <div>
              <button
                onClick={() => setShowCancelModal(true)}
                style={{ background: '#bbf7d0', color: '#166534', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', marginBottom: '4px' }}
              >
                Cancel Order
              </button>
              <div style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>You can't cancel order after this time.</div>
            </div>
          </div>
        )}

        {/* Cancel Order Modal */}
        {showCancelModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ background: 'white', width: '600px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ padding: '24px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Cancel Order</h3>
                  <button onClick={() => setShowCancelModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <CaretDown size={24} style={{ transform: 'rotate(90deg)' }} />
                  </button>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', color: 'var(--fg-secondary)', marginBottom: '12px' }}>Choose a Reason for Order Cancellation</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      style={{
                        width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '4px',
                        fontSize: '14px', appearance: 'none', outline: 'none'
                      }}
                    >
                      <option>The Products are expired</option>
                      <option>Change of mind</option>
                      <option>Address issue</option>
                    </select>
                    <CaretDown size={18} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--fg-muted)' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '14px', color: 'var(--fg-secondary)', marginBottom: '12px' }}>Please describe your issue</label>
                  <textarea
                    rows={6}
                    style={{
                      width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '4px',
                      fontSize: '14px', outline: 'none', resize: 'none'
                    }}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '24px', alignItems: 'center' }}>
                  <button onClick={() => setShowCancelModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', color: 'var(--fg-secondary)', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={handleCancelOrder} disabled={cancelling} style={{ background: cancelling ? '#6ee7b7' : '#059669', color: 'white', border: 'none', padding: '12px 48px', borderRadius: '4px', fontSize: '18px', fontWeight: 500, cursor: cancelling ? 'not-allowed' : 'pointer' }}>{cancelling ? 'Submitting...' : 'Submit'}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Table */}
        <div style={{ marginBottom: '48px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: '#F8F9FA' }}>
                <th style={{ padding: '16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid var(--border)' }}>S. No</th>
                <th style={{ padding: '16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid var(--border)' }}>Quantity</th>
                <th style={{ padding: '16px', fontWeight: 600, fontSize: '14px', borderBottom: '1px solid var(--border)' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '24px 16px', color: 'var(--fg-secondary)', fontSize: '14px' }}>{idx + 1}</td>
                  <td style={{ padding: '24px 16px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <img src={item.image || 'http://localhost:5000/images/atta.png'} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                      <span style={{ fontSize: '14px', color: 'var(--fg-primary)' }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '24px 16px', fontSize: '14px', color: 'var(--fg-primary)' }}>{item.price}*{item.quantity}</td>
                  <td style={{ padding: '24px 16px', fontSize: '14px', color: 'var(--fg-primary)' }}>Rs {item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '48px', marginBottom: '48px' }}>

          <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '24px', color: 'var(--fg-primary)' }}>Bill Details</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: 'var(--fg-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>MRP</span>
                <span style={{ color: 'var(--fg-primary)' }}>Rs {order.summary.mrp}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Charges</span>
                <span style={{ color: 'var(--fg-primary)' }}>Rs {order.summary.delivery}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Handling Charges</span>
                <span style={{ color: 'var(--fg-primary)' }}>Rs {order.summary.handling}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Discount</span>
                <span style={{ color: 'var(--fg-primary)' }}>Rs {order.summary.discount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--fg-primary)', marginTop: '8px', fontSize: '15px' }}>
                <span>Total</span>
                <span>Rs {order.summary.total}</span>
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '24px', color: 'var(--fg-primary)' }}>Order Details</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: 'var(--fg-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Order id</span>
                <span style={{ color: 'var(--fg-primary)' }}>{order.id.replace('ORD-', '')}458647586746395</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Payment Mode</span>
                <span style={{ color: 'var(--fg-primary)' }}>{order.paymentMode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery to</span>
                <span style={{ color: 'var(--fg-primary)', textAlign: 'right', maxWidth: '180px' }}>Faridabad old sector 6</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Order Placed</span>
                <span style={{ color: 'var(--fg-primary)' }}>6 May, 2023 09:00AM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Download Invoice */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => generateInvoice(order, user)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: '#059669', color: 'white', border: 'none',
              padding: '12px 28px', borderRadius: '6px', fontSize: '15px',
              fontWeight: 500, cursor: 'pointer', transition: 'background 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#047857'}
            onMouseLeave={e => e.currentTarget.style.background = '#059669'}
          >
            <DownloadSimple size={20} weight="bold" />
            Download Invoice
          </button>
        </div>

        {/* Need Help */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Need help with your order</h4>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px 24px', minWidth: '350px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ChatCircleDots size={32} color="#059669" weight="regular" />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--fg-primary)', marginBottom: '4px' }}>Chat with us</div>
                <div style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>About any isssue related with this order</div>
              </div>
            </div>
            <CaretRight size={20} color="var(--fg-muted)" />
          </div>
        </div>

      </div>
    </div>
  );
}

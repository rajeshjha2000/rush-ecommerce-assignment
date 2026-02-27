import { useState, useEffect } from 'react';
import { getUser } from '../services/api';
import { PencilSimple } from '@phosphor-icons/react';

export default function Addresses() {
  const [activeTab, setActiveTab] = useState('Personal');
  const [user, setUser] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressType, setAddressType] = useState('Home');

  useEffect(() => {
    getUser().then(res => setUser(res));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid var(--border)', marginBottom: '32px' }}>
        <button 
          onClick={() => setActiveTab('Personal')}
          style={{ 
            background: 'none', border: 'none', padding: '12px 0', fontSize: '16px', fontWeight: 500, cursor: 'pointer',
            color: activeTab === 'Personal' ? '#059669' : 'var(--fg-secondary)',
            borderBottom: activeTab === 'Personal' ? '2px solid #059669' : '2px solid transparent'
          }}
        >
          Personal
        </button>
        <button 
          onClick={() => setActiveTab('Address')}
          style={{ 
            background: 'none', border: 'none', padding: '12px 0', fontSize: '16px', fontWeight: 500, cursor: 'pointer',
            color: activeTab === 'Address' ? '#059669' : 'var(--fg-secondary)',
            borderBottom: activeTab === 'Address' ? '2px solid #059669' : '2px solid transparent'
          }}
        >
          Address
        </button>
      </div>

      {activeTab === 'Personal' ? (
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--fg-secondary)' }}>Personal Details</h2>
            <PencilSimple size={24} style={{ cursor: 'pointer', color: 'var(--fg-secondary)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            
            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '4px' }}>
              <div style={{ width: '120px', padding: '12px 16px', borderRight: '1px solid var(--border)', color: 'var(--fg-muted)', fontSize: '14px', background: '#F8F9FA' }}>
                Full Name
              </div>
              <div style={{ flex: 1, padding: '12px 16px', color: 'var(--fg-primary)', fontSize: '14px' }}>
                Abhishek Sharma
              </div>
            </div>

            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '4px' }}>
              <div style={{ width: '120px', padding: '12px 16px', borderRight: '1px solid var(--border)', color: 'var(--fg-muted)', fontSize: '14px', background: '#F8F9FA' }}>
                Phone
              </div>
              <div style={{ flex: 1, padding: '12px 16px', color: 'var(--fg-primary)', fontSize: '14px' }}>
                9988554477
              </div>
            </div>

            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '4px' }}>
              <div style={{ width: '120px', padding: '12px 16px', borderRight: '1px solid var(--border)', color: 'var(--fg-muted)', fontSize: '14px', background: '#F8F9FA' }}>
                Email
              </div>
              <div style={{ flex: 1, padding: '12px 16px', color: 'var(--fg-primary)', fontSize: '14px' }}>
                Abhishek Sharma
              </div>
            </div>

            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '4px' }}>
              <div style={{ width: '120px', padding: '12px 16px', borderRight: '1px solid var(--border)', color: 'var(--fg-muted)', fontSize: '14px', background: '#F8F9FA' }}>
                Password
              </div>
              <div style={{ flex: 1, padding: '12px 16px', color: 'var(--fg-primary)', fontSize: '14px' }}>
                ********
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--fg-secondary)' }}>Manage Address</h2>
            <button 
              onClick={() => setShowAddressModal(true)}
              style={{ background: 'none', border: 'none', color: '#059669', fontSize: '16px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span style={{ fontSize: '24px' }}>+</span> Add New Address
            </button>
          </div>
          <div style={{ color: 'var(--fg-muted)', fontSize: '14px' }}>No addresses found. Click "Add New Address" to create one.</div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddressModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', 
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <div style={{ background: 'white', width: '850px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Enter New Address</h3>
              <button onClick={() => setShowAddressModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span style={{ fontSize: '24px', color: 'var(--fg-muted)' }}>&times;</span>
              </button>
            </div>

            <div style={{ padding: '32px', display: 'flex', gap: '32px' }}>
              {/* Left: Map */}
              <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', height: '400px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80" 
                  alt="Address Map" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Right: Form */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <input 
                  type="text" 
                  placeholder="Name" 
                  style={{ padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '16px', outline: 'none' }} 
                />
                <input 
                  type="text" 
                  placeholder="Locality/ Area/ Street No." 
                  style={{ padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '16px', outline: 'none' }} 
                />
                <input 
                  type="text" 
                  placeholder="House/ Office/ Flat No." 
                  style={{ padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '16px', outline: 'none' }} 
                />
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['Home', 'Office', 'Other'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setAddressType(type)}
                      style={{ 
                        flex: 1, padding: '8px', border: '1px solid', 
                        borderColor: addressType === type ? '#059669' : 'var(--border)',
                        color: addressType === type ? '#059669' : 'var(--fg-secondary)',
                        background: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '14px'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <button style={{ background: '#059669', color: 'white', border: 'none', padding: '14px', borderRadius: '4px', fontSize: '18px', fontWeight: 500, cursor: 'pointer', marginTop: 'auto' }}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

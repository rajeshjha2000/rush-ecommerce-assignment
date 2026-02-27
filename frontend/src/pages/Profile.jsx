import { useState, useEffect } from 'react';
import { getUser, updateUser } from '../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    getUser().then(data => {
      setUser(data);
      setFormData({ name: data.name, email: data.email, phone: data.phone });
    }).catch(() => {
      setUser({ name: '', email: '', phone: '', addresses: [] });
      setFormData({ name: '', email: '', phone: '' });
    });
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const updated = await updateUser(formData);
    setUser(updated);
    alert('Profile saved!');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="h2 mb-24">Personal Details</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input type="text" className="input" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="input" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input type="text" className="input" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" className="input" defaultValue="********" />
        </div>
      </div>

      <div className="flex justify-between mt-32">
        <div></div>
        <div className="flex gap-16">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

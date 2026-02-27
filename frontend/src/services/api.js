import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const getCategories = async () => {
  const res = await api.get('/categories');
  return res.data;
};

export const getProducts = async (category, search) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  
  const res = await api.get(`/products?${params.toString()}`);
  return res.data;
};

export const getUser = async () => {
  const res = await api.get('/user');
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get('/orders');
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post('/orders', orderData);
  return res.data;
};

export const updateUser = async (userData) => {
  const res = await api.put('/user', userData);
  return res.data;
};

export const addAddress = async (addressData) => {
  const res = await api.post('/user/addresses', addressData);
  return res.data;
};

export const deleteAddress = async (id) => {
  const res = await api.delete(`/user/addresses/${id}`);
  return res.data;
};

export const exchangeOrder = async (orderId, reason) => {
  const res = await api.put(`/orders/${orderId}/exchange`, { reason });
  return res.data;
};

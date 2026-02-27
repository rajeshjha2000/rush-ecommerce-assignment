require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/images', express.static('public/images'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB database.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Mongoose Models ---
const Category = mongoose.model('Category', new mongoose.Schema({ name: String }));

const Product = mongoose.model('Product', new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  variants: [{ weight: String, price: Number, originalPrice: Number }],
  image: String
}));

const addressSchema = new mongoose.Schema({
  id: String,
  label: String,
  name: String,
  flat: String,
  locality: String,
  phone: String
});

const User = mongoose.model('User', new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  addresses: [addressSchema]
}));

const Order = mongoose.model('Order', new mongoose.Schema({
  id: String,
  userId: String,
  date: String,
  status: String,
  paymentMode: String,
  deliveryAddress: String,
  cancelReason: String,
  exchangeReason: String,
  items: [{
    name: String,
    weight: String,
    price: Number,
    quantity: Number,
    total: Number
  }],
  summary: {
    mrp: Number,
    delivery: Number,
    handling: Number,
    discount: Number,
    total: Number
  }
}));

// --- Products & Categories ---
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories.map(c => c.name));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/products', async (req, res) => {
  const { category, search } = req.query;
  try {
    let query = {};
    if (category && category !== 'All') {
      // Use regex for case-insensitive match, or directly match
      query.$or = [
        { category: new RegExp(`^${category}$`, 'i') },
        { category: 'Pulses' } // Mockup specific logic mapping
      ];
    }
    if (search) {
      query.name = new RegExp(search, 'i');
    }

    // Exclude mongoose _id and __v for cleaner frontend response if needed, 
    // but the frontend is already built for JSON parsing so it will just ignore them
    const products = await Product.find(query);
    res.json(products);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- User Profile ---
// Hardcoding user "1" for this assignment emulation
app.get('/api/user', async (req, res) => {
  try {
    const user = await User.findOne({ id: "1" });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/user', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;

    const user = await User.findOneAndUpdate(
      { id: "1" },
      { $set: updateData },
      { new: true }
    );
    res.json(user);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- Addresses ---
app.post('/api/user/addresses', async (req, res) => {
  const newAddress = { id: `addr-${Date.now()}`, ...req.body };
  try {
    await User.updateOne({ id: "1" }, { $push: { addresses: newAddress } });
    res.status(201).json(newAddress);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/user/addresses/:id', async (req, res) => {
  try {
    await User.updateOne({ id: "1" }, { $pull: { addresses: { id: req.params.id } } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- Orders ---
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find({ userId: "1" });
    res.json(orders);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order({
      id: Date.now().toString(),
      userId: "1",
      date: new Date().toISOString(),
      status: "In Progress",
      ...req.body
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/orders/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { $set: { status: "Cancelled", cancelReason: req.body.reason } },
      { new: true }
    );
    res.json(order);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put('/api/orders/:id/exchange', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { $set: { status: "Exchange Requested", exchangeReason: req.body.reason } },
      { new: true }
    );
    res.json(order);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

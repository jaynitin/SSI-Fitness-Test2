const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Middleware to verify token (protect routes)
const protect = require('../middleware/authMiddleware');

// Create a new order (user must be logged in)
router.post('/', protect, async (req, res) => {
  const { items, totalPrice } = req.body;
  const order = new Order({
    user: req.user.id,
    items,
    totalPrice,
  });
  await order.save();
  res.json(order);
});

// Get logged-in user's orders
router.get('/myorders', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product');
  res.json(orders);
});

// Get all orders (admin only)
router.get('/', protect, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admins only' });
  const orders = await Order.find().populate('user', 'name email').populate('items.product');
  res.json(orders);
});

// Mark order as paid (called after Razorpay success)
router.put('/:id/pay', protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.isPaid = true;
  await order.save();
  res.json(order);
});

module.exports = router;
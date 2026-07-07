const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const protect = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const router = express.Router();

// POST /api/orders — auth required, creates order with status "pending"
// Payment is confirmed manually via M-Pesa send-money for now
router.post(
  '/',
  protect,
  [
    body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
    body('shippingAddress.fullName').notEmpty().withMessage('Full name is required'),
    body('shippingAddress.phone').notEmpty().withMessage('Phone number is required'),
    body('shippingAddress.address').notEmpty().withMessage('Address is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be valid'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const order = await Order.create({
        user: req.userId,
        items: req.body.items,
        shippingAddress: req.body.shippingAddress,
        totalPrice: req.body.totalPrice,
      });
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/orders — logged-in user's own orders
router.get('/', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id — single order, must belong to requester (or be admin)
router.get('/:id', protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:id/status — admin only, update order status manually
router.put('/:id/status', protect, adminOnly, async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const protect = require('../middleware/auth');
const adminOnly = require('../middleware/admin');
const upload = require('../middleware/upload');

const router = express.Router();

const slugify = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

// GET /api/products  — supports ?category=&search=&featured=
router.get('/', async (req, res, next) => {
  try {
    const { category, search, featured } = req.query;
    const query = {};
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    if (search) query.$text = { $search: search };

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products/upload-image  — real Cloudinary upload, admin only
// Send as multipart/form-data with field name "image"
router.post(
  '/upload-image',
  protect,
  adminOnly,
  upload.single('image'),
  (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
      res.json({ url: req.file.path, publicId: req.file.filename });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/products  — admin only, creates a real product (no seed script needed)
router.post(
  '/',
  protect,
  adminOnly,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category')
      .isIn(['makeup', 'bags', 'accessories', 'hair', 'fragrance', 'bodycare'])
      .withMessage('Invalid category'),
    body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const slug = slugify(req.body.name);
      const existing = await Product.findOne({ slug });
      if (existing) {
        return res.status(400).json({ message: 'A product with this name already exists' });
      }

      const product = await Product.create({ ...req.body, slug });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }
);

// PUT /api/products/:id — admin only
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id — admin only
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
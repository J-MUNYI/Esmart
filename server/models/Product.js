const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    category: {
      type: String,
      enum: ['makeup', 'bags', 'accessories', 'hair', 'fragrance', 'bodycare'],
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: String,
      },
    ],
    badges: [{ type: String, enum: ['new', 'sale', 'bestseller'] }],
    stock: { type: Number, default: 10, min: 0 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes for the queries you'll actually run
productSchema.index({ category: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
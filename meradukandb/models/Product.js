import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  options: [{
    value: String,
    price: Number,
    stock: { type: Number, default: 0 },
    sku: String
  }]
});

const productSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  comparePrice: {
    type: Number
  },
  costPrice: {
    type: Number
  },
  stock: {
    type: Number,
    default: 0
  },
  images: [{
    url: String,
    altText: String,
    isPrimary: { type: Boolean, default: false }
  }],
  variants: [variantSchema],
  attributes: [{
    name: String,
    value: String
  }],
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  sku: {
    type: String
  },
  barcode: {
    type: String
  },
  weight: {
    value: Number,
    unit: { type: String, default: 'kg' }
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: { type: String, default: 'cm' }
  },
  seo: {
    title: String,
    description: String,
    slug: String
  },
 





  likes: {
    type: Number,
    default: 0
  },
  likedByMobile: [{
    type: String // Store mobile unique IDs
  }],
  
  // View tracking with mobile IDs
  views: {
    type: Number,
    default: 0
  },
  viewedByMobile: [{
    mobileId: String,
    viewedAt: { type: Date, default: Date.now }
  }],
  
  // Enhanced analytics
  analytics: {
    totalViews: { type: Number, default: 0 },
    uniqueViews: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 }
  },













  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  salesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better search performance
productSchema.index({ storeId: 1, isActive: 1 });
productSchema.index({ storeId: 1, category: 1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);
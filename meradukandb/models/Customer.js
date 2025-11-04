import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: { type: String, default: 'India' },
    pincode: String,
    latitude: Number,
    longitude: Number,
    type: { type: String, enum: ['home', 'work', 'other'], default: 'home' }
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  lastOrderDate: {
    type: Date
  },
  preferences: {
    categories: [String],
    communication: {
      whatsapp: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      email: { type: Boolean, default: false }
    }
  },
  notes: String
}, {
  timestamps: true
});

export default mongoose.model('Customer', customerSchema);
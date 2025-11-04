import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  storeName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  banner: {
    type: String,
    default: '/statics/mystore.png'
  },
  logo: {
    type: String,
    default: '/statics/store-logo.png'
  },















  bankDetails: {
    accountNumber: {
      type: String,
      validate: {
        validator: function(v) {
          if (!v) return true; // Optional field
          return /^\d{9,18}$/.test(v); // 9-18 digit account number
        },
        message: 'Account number must be between 9-18 digits'
      }
    },
    accountHolder: {
      type: String,
      validate: {
        validator: function(v) {
          if (!v) return true; // Optional field
          return v.length >= 2 && v.length <= 100;
        },
        message: 'Account holder name must be between 2-100 characters'
      },
      trim: true
    },
    bankName: {
      type: String,
      validate: {
        validator: function(v) {
          if (!v) return true; // Optional field
          return v.length >= 2 && v.length <= 100;
        },
        message: 'Bank name must be between 2-100 characters'
      },
      trim: true
    },
    ifscCode: {
      type: String,
      uppercase: true,
      validate: {
        validator: function(v) {
          if (!v) return true; // Optional field
          return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v); // IFSC code format
        },
        message: 'Invalid IFSC code format (e.g., SBIN0000123)'
      }
    },
    upiId: {
      type: String,
      lowercase: true,
      validate: {
        validator: function(v) {
          if (!v) return true; // Optional field
          return /^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z]{2,}$/.test(v); // UPI ID format
        },
        message: 'Invalid UPI ID format (e.g., username@upi)'
      }
    }
  },












  workingHours: {
    opening: { type: String, default: '09:00' },
    closing: { type: String, default: '18:00' },
    workingDays: { type: [String], default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] }
  },
  address: {
    address1: { type: String, required: true },
    address2: { type: String, default: '' },
    city: { type: String },
    state: { type: String },
    country: { type: String, default: 'India' },
    pincode: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    landmark: { type: String }
  },


isSuperDeactivated:{
  type:Boolean,
  dafault:false
},
mainShopNameFromAdmin:{
    type:String,
    unique:true
}
,




  contact: {
    whatsapp: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    website: { type: String }
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
    linkedin: String
  },
  bankDetails: {
    accountNumber: { type: String },
    accountHolder: { type: String },
    bankName: { type: String },
    ifscCode: { type: String },
    upiId: { type: String }
  },
  paymentMethods: {
    cashOnDelivery: { type: Boolean, default: true },
    upi: { type: Boolean, default: true },
    card: { type: Boolean, default: false },
    netBanking: { type: Boolean, default: false }
  },
  categories: [{
    name: { type: String, required: true },
    description: String,
    image: String,
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  }],
  settings: {
    autoConfirmOrders: { type: Boolean, default: true },
    lowStockAlert: { type: Boolean, default: true },
    orderNotifications: { type: Boolean, default: true },
    whatsappNotifications: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: false }
  },
  qrCode: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },


  
  metadata: {
    totalProducts: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    totalCustomers: { type: Number, default: 0 },
    storeRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

export default mongoose.model('Store', storeSchema);
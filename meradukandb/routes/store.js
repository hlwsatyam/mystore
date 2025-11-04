import express from 'express';
import Store from '../models/Store.js';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import axios from 'axios';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure upload directories exist
const ensureUploadDirs = () => {
  const dirs = [
    'uploads/store/banner',
    'uploads/store/logo', 
    'uploads/products/images',
    'uploads/categories'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

ensureUploadDirs();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = 'uploads/';
    
    if (file.fieldname === 'banner') {
      uploadPath += 'store/banner/';
    } else if (file.fieldname === 'logo') {
      uploadPath += 'store/logo/';
    } else if (file.fieldname === 'image') {
      uploadPath += 'categories/';
    } else {
      uploadPath += 'general/';
    }
    
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get address from pincode
router.get('/get-address/:pincode', async (req, res) => {
  try {
    const { pincode } = req.params;
    
    if (!pincode || pincode.length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'Valid 6-digit pincode is required'
      });
    }

    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    
    if (response.data[0].Status === 'Success' && response.data[0].PostOffice) {
      const postOffice = response.data[0].PostOffice[0];
      res.json({
        success: true,
        data: {
          city: postOffice.District,
          state: postOffice.State,
          country: 'India'
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Invalid pincode or no data found'
      });
    }
  } catch (error) {
    console.error('Address fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching address details'
    });
  }
});

// Get coordinates from address
router.get('/get-coordinates', async (req, res) => {
  try {
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).json({
        success: false,
        message: 'Address is required'
      });
    }

    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: address,
        format: 'json',
        limit: 1,
        countrycodes: 'in'
      }
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      res.json({
        success: true,
        data: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon)
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Could not find coordinates for this address'
      });
    }
  } catch (error) {
    console.error('Coordinates fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching coordinates'
    });
  }
});

// Get store details
router.get('/my-store', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ userId: req.user.userId });
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.json({
      success: true,
      data: store
    });
  } catch (error) {
    console.error('Get store error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update store details
router.put('/update-store', auth,   async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Handle file uploads
    // if (req.files) {
    //   if (req.files.banner) {
    //     const bannerFile = req.files.banner[0];
    //     updateData.banner = `/uploads/store/banner/${bannerFile.filename}`;
    //   }
    //   if (req.files.logo) {
    //     const logoFile = req.files.logo[0];
    //     updateData.logo = `/uploads/store/logo/${logoFile.filename}`;
    //   }
    // }

    // Parse nested objects if they are strings
    if (typeof updateData.address === 'string') {
      updateData.address = JSON.parse(updateData.address);
    }
    if (typeof updateData.contact === 'string') {
      updateData.contact = JSON.parse(updateData.contact);
    }
    if (typeof updateData.socialMedia === 'string') {
      updateData.socialMedia = JSON.parse(updateData.socialMedia);
    }
    if (typeof updateData.workingHours === 'string') {
      updateData.workingHours = JSON.parse(updateData.workingHours);
    }

    const store = await Store.findOneAndUpdate(
      { userId: req.user.userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Store updated successfully',
      data: store
    });
  } catch (error) {
    console.error('Update store error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// Toggle store status
router.patch('/toggle-status', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ userId: req.user.userId });
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    store.isActive = !store.isActive;
    await store.save();

    res.json({
      success: true,
      message: `Store ${store.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { isActive: store.isActive }
    });
  } catch (error) {
    console.error('Toggle store status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Add category
router.post('/add-category', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const categoryData = {
      name,
      description: description || '',
      isActive: true,
      sortOrder: 0
    };

    if (req.file) {
      categoryData.image = `/uploads/categories/${req.file.filename}`;
    }

    const store = await Store.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { categories: categoryData } },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Category added successfully',
      data: store.categories
    });
  } catch (error) {
    console.error('Add category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update category
router.put('/update-category/:categoryId', auth, upload.single('image'), async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, isActive } = req.body;

    const updateFields = {};
    if (name) updateFields['categories.$.name'] = name;
    if (description) updateFields['categories.$.description'] = description;
    if (isActive !== undefined) updateFields['categories.$.isActive'] = isActive === 'true';

    if (req.file) {
      updateFields['categories.$.image'] = `/uploads/categories/${req.file.filename}`;
    }

    const store = await Store.findOneAndUpdate(
      { userId: req.user.userId, 'categories._id': categoryId },
      { $set: updateFields },
      { new: true }
    );

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: store.categories
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Delete category
router.delete('/delete-category/:categoryId', auth, async (req, res) => {
  try {
    const { categoryId } = req.params;

    const store = await Store.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { categories: { _id: categoryId } } },
      { new: true }
    );

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.json({
      success: true,
      message: 'Category deleted successfully',
      data: store.categories
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get store statistics
router.get('/statistics', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ userId: req.user.userId });
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    const totalProducts = await Product.countDocuments({ storeId: store._id });
    const activeProducts = await Product.countDocuments({ 
      storeId: store._id, 
      isActive: true 
    });
    const outOfStockProducts = await Product.countDocuments({ 
      storeId: store._id, 
      stock: 0 
    });

    res.json({
      success: true,
      data: {
        totalProducts,
        activeProducts,
        outOfStockProducts,
        storeStatus: store.isActive,
        totalCategories: store.categories.length
      }
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});














router.delete('/category/:categoryId', auth, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const store = await Store.findOne({ userId: req.user.userId });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    // Check if category exists
    const category = store.categories.id(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if any products are using this category
    const productsWithCategory = await Product.countDocuments({
      storeId: store._id,
      category: category.name
    });

    if (productsWithCategory > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. ${productsWithCategory} products are using this category.`
      });
    }

    // Remove category
    store.categories.pull(categoryId);
    await store.save();

    res.json({
      success: true,
      message: 'Category deleted successfully',
      data: store.categories
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

 

// Upload custom QR code
router.post('/upload-qr', auth,  async (req, res) => {
  try {
    const store = await Store.findOne({ userId: req.user.userId });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
 
 
    if (!req.body.qrUrl) {
      return res.status(400).json({
        success: false,
        message: 'QR code image is required'
      });
    }

    // Update store with custom QR code path
    store.qrCode = `${req.body.qrUrl}`;
    await store.save();

    res.json({
      success: true,
      message: 'QR code uploaded successfully',
      data: {
        qrCode: store.qrCode
      }
    });

  } catch (error) {
    console.error('Upload QR code error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading QR code'
    });
  }
});












router.put('/bank-details', auth, async (req, res) => {
  try {
    const { bankDetails, paymentMethods } = req.body;
console.log(req.body)
    // Validate bank details if provided
    if (bankDetails) {
      // Validate account number
      if (bankDetails.accountNumber && !/^\d{9,18}$/.test(bankDetails.accountNumber)) {
        return res.status(400).json({
          success: false,
          message: 'Account number must be between 9-18 digits'
        });
      }

      // Validate IFSC code
      if (bankDetails.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankDetails.ifscCode)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid IFSC code format (e.g., SBIN0000123)'
        });
      }



     


      // Validate UPI ID
      if (bankDetails.upiId && !/^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z]{2,}$/.test(bankDetails.upiId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid UPI ID format (e.g., username@upi)'
        });
      }

      // Convert IFSC code to uppercase
      if (bankDetails.ifscCode) {
        bankDetails.ifscCode = bankDetails.ifscCode.toUpperCase();
      }

      // Convert UPI ID to lowercase
      if (bankDetails.upiId) {
        bankDetails.upiId = bankDetails.upiId.toLowerCase();
      }
    }

    const updateData = {};
    if (bankDetails) updateData.bankDetails = bankDetails;
    if (paymentMethods) updateData.paymentMethods = paymentMethods;

    const store = await Store.findOneAndUpdate(
      { userId: req.user.userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.json({
      success: true,
      message: 'Bank details updated successfully',
      data: {
        bankDetails: store.bankDetails,
        paymentMethods: store.paymentMethods
      }
    });

  } catch (error) {
    console.error('Update bank details error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get bank details
router.get('/bank-details', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ userId: req.user.userId })
      .select('bankDetails paymentMethods');

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.json({
      success: true,
      data: {
        bankDetails: store.bankDetails,
        paymentMethods: store.paymentMethods
      }
    });

  } catch (error) {
    console.error('Get bank details error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Verify bank details (optional - for additional validation)
router.post('/verify-bank', auth, async (req, res) => {
  try {
    const { accountNumber, ifscCode } = req.body;

    if (!accountNumber || !ifscCode) {
      return res.status(400).json({
        success: false,
        message: 'Account number and IFSC code are required'
      });
    }

    // Here you can integrate with bank verification APIs like Razorpay, Cashfree, etc.
    // For now, we'll just do basic validation
    const isValidIFSC = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode);
    const isValidAccount = /^\d{9,18}$/.test(accountNumber);

    if (!isValidIFSC || !isValidAccount) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account number or IFSC code'
      });
    }

    // Simulate bank verification (replace with actual API call)
    const isVerified = Math.random() > 0.3; // 70% success rate for demo

    res.json({
      success: true,
      data: {
        verified: isVerified,
        message: isVerified 
          ? 'Bank details verified successfully' 
          : 'Bank verification failed. Please check your details.'
      }
    });

  } catch (error) {
    console.error('Verify bank error:', error);
    res.status(500).json({
      success: false,
      message: 'Bank verification service unavailable'
    });
  }
});









router.get('/name/:storeName', async (req, res) => {
  console.log(req.params)
  try {
    const store = await Store.findOne({ 
      mainShopNameFromAdmin: req.params.storeName,
      isActive: true,
      isSuperDeactivated: false 
    })
    .populate('userId', 'name email phone')
    .select('-bankDetails'); // Exclude sensitive bank details

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found or inactive'
      });
    }

    res.json({
      success: true,
      data: store
    });
  } catch (error) {
    console.error('Store fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching store'
    });
  }
});

// @desc    Get products for a store with pagination and filters
// @route   GET /api/stores/:storeName/products
// @access  Public
router.get('/:storeName/products', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = '',
      category = '',
      sort = 'latest',
      mobileId = ''
    } = req.query;

    // First find the store
    const store = await Store.findOne({ 
      mainShopNameFromAdmin: req.params.storeName,
      isActive: true 
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    // Build query
    let query = { 
      storeId: store._id, 
      isActive: true 
    };

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Sort options
    let sortOptions = {};
    switch (sort) {
      case 'popular':
        sortOptions = { salesCount: -1, likes: -1 };
        break;
      case 'price-low':
        sortOptions = { price: 1 };
        break;
      case 'price-high':
        sortOptions = { price: -1 };
        break;
      case 'most-liked':
        sortOptions = { likes: -1 };
        break;
      case 'featured':
        query.isFeatured = true;
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get products with pagination
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(limitNum)
      .skip(skip)
      .select('-variants.options.sku -attributes -seo'); // Exclude unnecessary fields

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    // Track view for each product if mobileId provided
    if (mobileId) {
      products.forEach(async (product) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayView = product.viewedByMobile.find(
          view => view.mobileId === mobileId && 
          new Date(view.viewedAt) >= today
        );
        
        if (!todayView) {
          product.views += 1;
          product.viewedByMobile.push({
            mobileId,
            viewedAt: new Date()
          });
          
          // Update analytics
          product.analytics.totalViews += 1;
          product.analytics.uniqueViews = new Set(
            product.viewedByMobile.map(v => v.mobileId)
          ).size;
          
          await product.save();
        }
      });
    }

    // Get unique categories for filter
    const categories = await Product.distinct('category', { 
      storeId: store._id, 
      isActive: true 
    });

    res.json({
      success: true,
      data: {
        products,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        categories,
        store: {
          _id: store._id,
          storeName: store.storeName,
          categories: store.categories
        }
      }
    });

  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
});













router.post('/products/:id/like', async (req, res) => {
  try {
    const { mobileId } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const isLiked = product.likedByMobile.includes(mobileId);
    
    if (isLiked) {
      // Unlike
      product.likes = Math.max(0, product.likes - 1);
      product.likedByMobile = product.likedByMobile.filter(id => id !== mobileId);
    } else {
      // Like
      product.likes += 1;
      product.likedByMobile.push(mobileId);
    }
    
    await product.save();
    
    res.json({ 
      success: true, 
      likes: product.likes,
      isLiked: !isLiked 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Track product view
router.post('/products/:id/view', async (req, res) => {
  try {
    const { mobileId } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check if this mobile already viewed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayView = product.viewedByMobile.find(
      view => view.mobileId === mobileId && 
      new Date(view.viewedAt) >= today
    );
    
    if (!todayView) {
      product.views += 1;
      product.viewedByMobile.push({
        mobileId,
        viewedAt: new Date()
      });
      
      // Update analytics
      product.analytics.totalViews += 1;
      product.analytics.uniqueViews = new Set(product.viewedByMobile.map(v => v.mobileId)).size;
      
      await product.save();
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






















export default router;
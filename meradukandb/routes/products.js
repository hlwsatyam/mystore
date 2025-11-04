import express from 'express';
import Product from '../models/Product.js';
import Store from '../models/Store.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure upload directories exist
const ensureUploadDirs = () => {
  const dirs = ['uploads/products/images'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

ensureUploadDirs();

// Configure multer for multiple file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/products/images/';
    
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB per file
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get all products for store
router.get('/', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ userId: req.user.userId });
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    const { page = 1, limit = 10, category, search, sortBy = 'createdAt', sortOrder = -1 } = req.query;
    
    const filter = { storeId: store._id };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const sort = { [sortBy]: parseInt(sortOrder) };
    
    const products = await Product.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: {
        products,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get single product
router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('storeId', 'storeName logo');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Create product
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    const store = await Store.findOne({ userId: req.user.userId });
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    const productData = {
      ...req.body,
      storeId: store._id
    };

    // Convert string numbers to actual numbers
    if (productData.price) productData.price = parseFloat(productData.price);
    if (productData.comparePrice) productData.comparePrice = parseFloat(productData.comparePrice);
    if (productData.costPrice) productData.costPrice = parseFloat(productData.costPrice);
    if (productData.stock) productData.stock = parseInt(productData.stock);

    // Parse variants if provided
    if (req.body.variants) {
      try {
        productData.variants = JSON.parse(req.body.variants);
      } catch (e) {
        console.error('Error parsing variants:', e);
      }
    }

    // Parse attributes if provided
    if (req.body.attributes) {
      try {
        productData.attributes = JSON.parse(req.body.attributes);
      } catch (e) {
        console.error('Error parsing attributes:', e);
      }
    }

    // Parse tags if provided
    if (req.body.tags) {
      try {
        productData.tags = JSON.parse(req.body.tags);
      } catch (e) {
        console.error('Error parsing tags:', e);
      }
    }

    // Handle images
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map((file, index) => ({
        url: `/uploads/products/images/${file.filename}`,
        altText: req.body.imageAltTexts?.[index] || productData.name,
        isPrimary: index === 0
      }));
    }

    const product = new Product(productData);
    await product.save();

    // Update store product count
    await Store.findByIdAndUpdate(store._id, {
      $inc: { 'metadata.totalProducts': 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// Update product
router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updateData = { ...req.body };

    // Convert string numbers to actual numbers
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.comparePrice) updateData.comparePrice = parseFloat(updateData.comparePrice);
    if (updateData.costPrice) updateData.costPrice = parseFloat(updateData.costPrice);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);

    // Parse variants if provided
    if (req.body.variants) {
      try {
        updateData.variants = JSON.parse(req.body.variants);
      } catch (e) {
        console.error('Error parsing variants:', e);
      }
    }

    // Parse attributes if provided
    if (req.body.attributes) {
      try {
        updateData.attributes = JSON.parse(req.body.attributes);
      } catch (e) {
        console.error('Error parsing attributes:', e);
      }
    }

    // Handle new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file, index) => ({
        url: `/uploads/products/images/${file.filename}`,
        altText: req.body.imageAltTexts?.[index] || updateData.name,
        isPrimary: index === 0 && (!product.images || product.images.length === 0)
      }));
      
      updateData.images = [...(product.images || []), ...newImages];
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Toggle product status
router.patch('/:id/toggle-status', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.json({
      success: true,
      message: `Product ${product.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { isActive: product.isActive }
    });
  } catch (error) {
    console.error('Toggle product status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Like product (for customers)
router.post('/:id/like', async (req, res) => {
  try {
    const { customerId } = req.body;
    
    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID is required'
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const hasLiked = product.likedBy.includes(customerId);
    
    if (hasLiked) {
      // Unlike
      product.likes = Math.max(0, product.likes - 1);
      product.likedBy.pull(customerId);
    } else {
      // Like
      product.likes += 1;
      product.likedBy.push(customerId);
    }

    await product.save();

    res.json({
      success: true,
      message: hasLiked ? 'Product unliked' : 'Product liked',
      data: {
        likes: product.likes,
        hasLiked: !hasLiked
      }
    });
  } catch (error) {
    console.error('Like product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Delete product image
router.delete('/:id/images/:imageIndex', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const imageIndex = parseInt(req.params.imageIndex);
    if (imageIndex < 0 || imageIndex >= product.images.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image index'
      });
    }

    // Get the image path to delete file from server
    const imagePath = product.images[imageIndex].url;
    const fullPath = path.join(process.cwd(), imagePath);

    // Delete file from server
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    product.images.splice(imageIndex, 1);
    
    // If we removed the primary image and there are other images, set first as primary
    if (product.images.length > 0 && !product.images.find(img => img.isPrimary)) {
      product.images[0].isPrimary = true;
    }

    await product.save();

    res.json({
      success: true,
      message: 'Image deleted successfully',
      data: product.images
    });
  } catch (error) {
    console.error('Delete product image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete associated images from server
    if (product.images && product.images.length > 0) {
      product.images.forEach(image => {
        const fullPath = path.join(process.cwd(), image.url);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    // Update store product count
    const store = await Store.findById(product.storeId);
    if (store) {
      await Store.findByIdAndUpdate(store._id, {
        $inc: { 'metadata.totalProducts': -1 }
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
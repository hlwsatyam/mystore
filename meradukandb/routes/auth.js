import express from 'express';
import User from '../models/User.js';
import Store from '../models/Store.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';
 
const router = express.Router();

// Auto create seller account
router.get('/auto-create-seller', async (req, res) => {
  try {
    const { email, name} = req.query;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required'
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.json({
        success: true,
        message: 'User already exists',
        data: {
          email: user.email,
          password: 'Use your existing password'
        }
      });
    }

    const password = Math.random().toString(36).slice(-8);
    user = new User({
      email,
      password,
      profile: {
        name: email.split('@')[0]
      }
    });

    await user.save();

    // Create default store
    const store = new Store({
      userId: user._id,
      storeName: `${email.split('@')[0]}'s Store`,
      description: 'Welcome to my store! We offer quality products with great service.',
      contact: {
        whatsapp: '+910000000000',
        email: email
      },
      mainShopNameFromAdmin:name,
      address: {
        address1: 'Enter your store address',
        country: 'India'
      },
      categories: [
        { name: 'General', description: 'General products', isActive: true, sortOrder: 1 },
        { name: 'Featured', description: 'Featured products', isActive: true, sortOrder: 2 }
      ]
    });

    await store.save();

    res.json({
      success: true,
      message: 'Seller account created successfully',
      data: {
        email: user.email,
        password: password,
        storeId: store._id
      }
    });

  } catch (error) {
    console.error('Auto create seller error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Register customer
router.post('/register-customer', async (req, res) => {
  try {
    const { name, phone, email, storeId } = req.body;

    if (!name || !phone || !storeId) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone and store ID are required'
      });
    }

    // Check if customer already exists for this store
    const existingCustomer = await Customer.findOne({ storeId, phone });
    if (existingCustomer) {
      return res.json({
        success: true,
        message: 'Customer already exists',
        data: existingCustomer
      });
    }

    const customer = new Customer({
      storeId,
      name,
      phone,
      email
    });

    await customer.save();

    res.json({
      success: true,
      message: 'Customer registered successfully',
      data: customer
    });

  } catch (error) {
    console.error('Customer registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const store = await Store.findOne({ userId: user._id });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          profile: user.profile
        },
        store: store || null
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
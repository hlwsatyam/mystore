import express from 'express';
import User from '../models/User.js';
import Store from '../models/Store.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import sendEmail from '../service/sendMail.js';
 
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

   const password = Math.floor(10000000 + Math.random() * 90000000).toString();
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














    // Send beautiful welcome email
    const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MeraDukan - Your Store is Ready! 🎉</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .tagline {
            font-size: 18px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .welcome-text {
            font-size: 28px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .highlight {
            color: #4f46e5;
            font-weight: 700;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature {
            text-align: center;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        
        .feature-icon {
            font-size: 24px;
            margin-bottom: 10px;
        }
        
        .feature-text {
            font-size: 14px;
            color: #4b5563;
            font-weight: 500;
        }
        
        .credentials {
            background: #f0f9ff;
            border: 2px solid #0ea5e9;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
        }
        
        .credential-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e1f5fe;
        }
        
        .credential-item:last-child {
            border-bottom: none;
        }
        
        .label {
            font-weight: 500;
            color: #0369a1;
        }
        
        .value {
            font-weight: 600;
            color: #1e40af;
            font-size: 16px;
        }
        
        .cta-button {
            display: block;
            width: 100%;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            text-align: center;
            padding: 18px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 18px;
            margin: 25px 0;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }
        
        .payment-info {
            background: #fff7ed;
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
        }
        
        .payment-amount {
            font-size: 32px;
            font-weight: 700;
            color: #d97706;
            margin: 10px 0;
        }
        
        .payment-duration {
            color: #92400e;
            font-weight: 500;
        }
        
        .whatsapp-contact {
            background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            margin: 20px 0;
        }
        
        .whatsapp-number {
            font-size: 20px;
            font-weight: 600;
            margin: 10px 0;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
        }
        
        .benefits {
            background: #fef7ff;
            border: 1px solid #e9d5ff;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .benefit-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            color: #7c3aed;
        }
        
        .benefit-icon {
            margin-right: 10px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🛍️ MeraDukan</div>
            <div class="tagline">Your Digital Storefront Awaits!</div>
        </div>
        
        <div class="content">
            <div class="welcome-text">
                Welcome to <span class="highlight">MeraDukan.Store</span>! 🎉
            </div>
            
            <p style="text-align: center; color: #6b7280; margin-bottom: 30px; line-height: 1.6;">
                Congratulations! Your online store has been successfully created. 
                Start selling your products online and reach customers nationwide.
            </p>
            
            <div class="credentials">
                <div class="credential-item">
                    <span class="label">📧 Login Email:</span>
                    <span class="value">${email}</span>
                </div>
                <div class="credential-item">
                    <span class="label">🔑 Password:</span>
                    <span class="value">${password}</span>
                </div>
                <div class="credential-item">
                    <span class="label">🆔 Store ID:</span>
                    <span class="value">${store._id}</span>
                </div>
            </div>
            
            <a href="https://meradukan.store/login" class="cta-button">
                🚀 Access Your Store Dashboard
            </a>
            
            <div class="payment-info">
                <div style="font-size: 18px; color: #92400e; font-weight: 600;">
                    💰 Special Launch Offer
                </div>
                <div class="payment-amount">₹199</div>
                <div class="payment-duration">For 1 Year - Complete Access!</div>
                <p style="color: #92400e; margin-top: 15px; font-size: 14px;">
                    Complete your payment to activate all premium features and start selling immediately!
                </p>
            </div>
            
            <div class="whatsapp-contact">
                <div style="font-size: 18px; font-weight: 600;">📞 Need Help with Payment?</div>
                <div class="whatsapp-number">WhatsApp: +91 7027944324</div>
                <p style="margin-top: 10px; opacity: 0.9;">
                    Contact us on WhatsApp for quick payment processing and support
                </p>
            </div>
            
            <div class="features-grid">
                <div class="feature">
                    <div class="feature-icon">📱</div>
                    <div class="feature-text">WhatsApp Order Notifications</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🛒</div>
                    <div class="feature-text">Product Management</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🏪</div>
                    <div class="feature-text">Store Customization</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">💳</div>
                    <div class="feature-text">Payment Integration</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">📊</div>
                    <div class="feature-text">Sales Analytics</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🎯</div>
                    <div class="feature-text">QR Code Generator</div>
                </div>
            </div>
            
            <div class="benefits">
                <div style="font-weight: 600; color: #7c3aed; margin-bottom: 15px; text-align: center;">
                    ✨ What You Get:
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">✅</span>
                    <span>Fully functional online store</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">✅</span>
                    <span>Direct WhatsApp order notifications</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">✅</span>
                    <span>Product & category management</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">✅</span>
                    <span>Store customization tools</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">✅</span>
                    <span>QR code for easy sharing</span>
                </div>
                <div class="benefit-item">
                    <span class="benefit-icon">✅</span>
                    <span>1 year complete access</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>© 2024 MeraDukan.Store. All rights reserved.</p>
            <p>Start your online business journey with us today! 🚀</p>
        </div>
    </div>
</body>
</html>
    `;

    // Send email
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: '🎉 Welcome to MeraDukan - Your Store is Ready! Complete Payment to Start Selling',
      html: emailTemplate
    };

    await sendEmail(mailOptions);



 




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
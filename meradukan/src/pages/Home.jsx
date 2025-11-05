import React, { useState, useEffect } from 'react';
import { 
  RocketOutlined, 
  SafetyCertificateOutlined, 
  TeamOutlined, 
  GlobalOutlined,
  StarFilled,
  CheckCircleOutlined,
  PlayCircleOutlined,
  WhatsAppOutlined,
  ArrowRightOutlined,
  ThunderboltOutlined,
  LineChartOutlined,
  ShoppingCartOutlined,
  CustomerServiceOutlined,
  BankOutlined,
  MobileOutlined,
  CloudSyncOutlined,
  SecurityScanOutlined,
  GiftOutlined,
  TrophyOutlined,
  CrownOutlined,
  HeartOutlined,
  BulbOutlined,
  ApiOutlined,
  DashboardOutlined,
  BarChartOutlined,
  ShopOutlined,
  UserSwitchOutlined,
  FileSyncOutlined,
  MoneyCollectOutlined,
  IdcardOutlined,
  FlagOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  const [activeRole, setActiveRole] = useState('customer');
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    vendors: 0,
    customers: 0,
    orders: 0,
    cities: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Animated counter for stats
    const animateCount = (end, setter, duration = 2000) => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    setTimeout(() => {
      animateCount(5000, (val) => setAnimatedStats(prev => ({...prev, vendors: val})));
      animateCount(50000, (val) => setAnimatedStats(prev => ({...prev, customers: val})));
      animateCount(100000, (val) => setAnimatedStats(prev => ({...prev, orders: val})));
      animateCount(100, (val) => setAnimatedStats(prev => ({...prev, cities: val})));
    }, 500);
  }, []);

  // Enhanced Features Data
  const features = [
    {
      icon: <WhatsAppOutlined className="text-3xl" />,
      title: 'WhatsApp Business Integration',
      description: 'Seamless order management with automated WhatsApp notifications, customer support, and broadcast messaging',
      color: 'from-green-500 to-emerald-500',
      highlights: ['Instant Order Alerts', 'Customer Chat', 'Broadcast Messages', 'Auto Replies']
    },
    {
      icon: <RocketOutlined className="text-3xl" />,
      title: '5-Minute Digital Setup',
      description: 'Transform your physical store into a digital powerhouse in just 5 minutes with zero technical knowledge',
      color: 'from-blue-500 to-cyan-500',
      highlights: ['No Coding Required', 'Mobile First', 'Instant Live', 'Easy Onboarding']
    },
    {
      icon: <SecurityScanOutlined className="text-3xl" />,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level security with SSL encryption, secure payments, and data protection compliance',
      color: 'from-purple-500 to-pink-500',
      highlights: ['SSL Encryption', 'PCI DSS', 'Data Backup', 'Fraud Protection']
    },
    {
      icon: <LineChartOutlined className="text-3xl" />,
      title: 'AI-Powered Analytics',
      description: 'Smart business insights with predictive analytics, sales trends, and customer behavior analysis',
      color: 'from-orange-500 to-red-500',
      highlights: ['Sales Reports', 'Customer Insights', 'Inventory Predict', 'Revenue Trends']
    },
    {
      icon: <GlobalOutlined className="text-3xl" />,
      title: 'Pan-India Delivery Network',
      description: 'Reach customers across 100+ Indian cities with integrated logistics and delivery partners',
      color: 'from-indigo-500 to-purple-500',
      highlights: ['100+ Cities', 'Fast Delivery', 'Track Orders', 'Multiple Partners']
    },
    {
      icon: <MoneyCollectOutlined className="text-3xl" />,
      title: 'Multiple Payment Options',
      description: 'Accept all Indian payment methods including UPI, cards, wallets, and cash on delivery',
      color: 'from-teal-500 to-green-500',
      highlights: ['UPI Payments', 'Credit/Debit Cards', 'Digital Wallets', 'Cash on Delivery']
    }
  ];

  // Advanced Features Section
  const advancedFeatures = [
    {
      icon: <DashboardOutlined />,
      title: 'Smart Dashboard',
      description: 'Intuitive control panel with real-time business metrics and performance indicators'
    },
    {
      icon: <BarChartOutlined />,
      title: 'Sales Analytics',
      description: 'Comprehensive sales reports with visual charts and growth insights'
    },
    {
      icon: <FileSyncOutlined />,
      title: 'Inventory Management',
      description: 'Automated stock tracking with low stock alerts and purchase suggestions'
    },
    {
      icon: <UserSwitchOutlined />,
      title: 'Customer CRM',
      description: 'Complete customer relationship management with purchase history and preferences'
    },
    {
      icon: <CloudSyncOutlined />,
      title: 'Cloud Storage',
      description: 'Secure cloud storage for product images, documents, and business data'
    },
    {
      icon: <ApiOutlined />,
      title: 'API Access',
      description: 'Developer-friendly APIs for custom integrations and third-party apps'
    }
  ];

  // Enhanced Pricing Plans
  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individual vendors starting their digital journey',
      features: [
        'Up to 50 products',
        'Basic WhatsApp orders',
        'Email support',
        '1GB storage',
        'Basic analytics',
        'Mobile app access',
        'Order management',
        'Customer reviews'
      ],
      popular: false,
      color: 'from-gray-500 to-gray-700',
      buttonText: 'Get Started Free',
      savings: ''
    },
    {
      name: 'Professional',
      price: '₹999',
      period: '/month',
      description: 'Best for growing businesses with advanced needs',
      features: [
        'Up to 500 products',
        'Advanced WhatsApp automation',
        'Priority support',
        '10GB storage',
        'Advanced analytics',
        'Custom domain',
        'Inventory management',
        'Bulk product upload',
        'Sales reports',
        'Customer segmentation',
        'Discount coupons',
        'Multi-staff accounts'
      ],
      popular: true,
      color: 'from-green-500 to-emerald-600',
      buttonText: 'Start 14-Day Trial',
      savings: 'Save 20%'
    },
    {
      name: 'Enterprise',
      price: '₹2,499',
      period: '/month',
      description: 'For established businesses needing full customization',
      features: [
        'Unlimited products',
        'Full WhatsApp Business API',
        '24/7 phone support',
        '100GB storage',
        'AI-powered analytics',
        'Multiple staff accounts',
        'API access',
        'Custom features',
        'White-label solution',
        'Advanced security',
        'Dedicated account manager',
        'Custom integrations',
        'Training sessions',
        'SLA guarantee'
      ],
      popular: false,
      color: 'from-blue-500 to-cyan-600',
      buttonText: 'Contact Sales',
      savings: 'Save 30%'
    }
  ];

  // Enhanced Testimonials
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Grocery Store Owner, Delhi',
      content: 'MeraDukan ne mere business ko completely transform kar diya. Ab roz 50+ orders WhatsApp par aate hain aur monthly revenue 3x ho gaya!',
      rating: 5,
      avatar: '🛒',
      business: 'Rajesh Kirana Store',
      growth: 'Revenue 3x in 3 months'
    },
    {
      name: 'Priya Sharma',
      role: 'Bakery Owner, Mumbai',
      content: '5 minute mein meri bakery online ho gayi. Customers direct WhatsApp par order karte hain aur delivery partners automatically assign ho jate hain.',
      rating: 5,
      avatar: '🍰',
      business: 'Priya French Bakery',
      growth: '200+ Monthly Orders'
    },
    {
      name: 'Amit Patel',
      role: 'Electronics Vendor, Bangalore',
      content: 'Sales 300% badh gaye! Inventory management bhi automatic ho gaya. Best decision for my electronics business.',
      rating: 5,
      avatar: '📱',
      business: 'Amit Electronics',
      growth: '300% Sales Growth'
    },
    {
      name: 'Sunita Devi',
      role: 'Clothing Boutique, Chennai',
      content: 'As a woman entrepreneur, MeraDukan gave me the confidence to grow my business digitally. Now I serve customers across Tamil Nadu!',
      rating: 5,
      avatar: '👗',
      business: 'Sunita Fashion Hub',
      growth: 'Pan-State Delivery'
    },
    {
      name: 'Vikram Singh',
      role: 'Sports Goods, Pune',
      content: 'The analytics feature helped me understand customer preferences. Now I stock products that actually sell!',
      rating: 5,
      avatar: '⚽',
      business: 'Vikram Sports',
      growth: 'Smart Inventory'
    },
    {
      name: 'Neha Gupta',
      role: 'Book Store, Kolkata',
      content: 'Payment integration is seamless. Customers can pay via UPI, cards, or cash. My business has never been smoother!',
      rating: 5,
      avatar: '📚',
      business: 'Neha Book Paradise',
      growth: 'Multiple Payments'
    }
  ];

  // Business Growth Metrics
  const growthMetrics = [
    { metric: 'Average Revenue Increase', value: '187%', icon: '📈' },
    { metric: 'Customer Retention Rate', value: '92%', icon: '🤝' },
    { metric: 'Order Processing Time', value: '2.3 mins', icon: '⚡' },
    { metric: 'Business Setup Time', value: '5 mins', icon: '🚀' }
  ];

  // Integration Partners
  const integrationPartners = [
    { name: 'WhatsApp Business', icon: '💬', description: 'Direct order management' },
    { name: 'Razorpay', icon: '💳', description: 'Secure payments' },
    { name: 'Shiprocket', icon: '🚚', description: 'Delivery partners' },
    { name: 'Google Analytics', icon: '📊', description: 'Advanced tracking' },
    { name: 'Paytm', icon: '📱', description: 'UPI payments' },
    { name: 'Amazon Pay', icon: '🛒', description: 'Wallet integration' }
  ];

  return (
    <>
      <Header/>
      <div className="pt-[10vh]">
        {/* Enhanced Hero Section */}
        <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
          {/* Advanced Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
            <div className="absolute top-20 right-1/4 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-bounce"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full mb-6 animate-bounce shadow-lg">
                  <ThunderboltOutlined className="mr-2" />
                  <span className="font-semibold">🚀 Join {animatedStats.vendors.toLocaleString()}+ Businesses Across India</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-6 leading-tight">
                  Build Your
                  <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    Digital Empire
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
                  Transform your local business into a digital powerhouse with India's most comprehensive e-commerce platform. 
                  <span className="text-green-600 font-semibold"> Start selling online in 5 minutes</span> with advanced WhatsApp integration.
                </p>
              </div>

              {/* Enhanced Role Switcher */}
              <div className="flex justify-center space-x-6 mb-8">
                <button
                  onClick={() => setActiveRole('customer')}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 border-2 ${
                    activeRole === 'customer' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-2xl scale-105 border-green-500' 
                      : 'bg-white text-gray-600 shadow-lg hover:shadow-xl border-gray-200'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <ShoppingCartOutlined />
                    <span>I'm a Customer</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveRole('vendor')}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 border-2 ${
                    activeRole === 'vendor' 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-2xl scale-105 border-orange-500' 
                      : 'bg-white text-gray-600 shadow-lg hover:shadow-xl border-gray-200'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <ShopOutlined />
                    <span>I'm a Vendor</span>
                  </span>
                </button>
              </div>

              {/* Enhanced Dynamic Content */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-4xl font-bold text-gray-800 mb-6">
                      {activeRole === 'customer' 
                        ? 'Discover Amazing Local Shops' 
                        : 'Launch Your Online Business Empire'
                      }
                    </h3>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                      {activeRole === 'customer'
                        ? 'Experience the future of local shopping. Find verified shops, enjoy instant WhatsApp ordering, fast delivery, and exclusive deals right in your neighborhood.'
                        : 'Join the digital revolution! Create your online store in minutes, accept orders via WhatsApp, manage inventory smartly, and watch your business grow exponentially.'
                      }
                    </p>
                    <div className="space-y-4">
                      {(activeRole === 'customer' 
                        ? [
                            '📍 Find Verified Local Shops',
                            '💬 Instant WhatsApp Ordering',
                            '🚚 2-Hour Fast Delivery',
                            '⭐ Genuine Customer Reviews',
                            '💰 Best Price Guarantee',
                            '🎁 Exclusive Local Deals'
                          ]
                        : [
                            '🏪 5-Minute Digital Setup',
                            '📱 Smart WhatsApp Order Management',
                            '📊 AI-Powered Business Analytics',
                            '💰 Zero Commission on First 100 Orders',
                            '🔒 Bank-Level Security',
                            '🌍 Pan-India Customer Reach'
                          ]
                      ).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-4 text-gray-700 group">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <CheckCircleOutlined />
                          </div>
                          <span className="text-lg font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-3xl p-2 shadow-2xl">
                      <div className="bg-white rounded-2xl p-8 text-center">
                        <div className="text-8xl mb-6 animate-float">
                          {activeRole === 'customer' ? '🛍️' : '🏪'}
                        </div>
                        <h4 className="text-3xl font-bold text-gray-800 mb-4">
                          {activeRole === 'customer' ? 'Customer Super App' : 'Vendor Power Dashboard'}
                        </h4>
                        <p className="text-gray-600 text-lg mb-6">
                          {activeRole === 'customer' 
                            ? 'Everything you need for seamless local shopping' 
                            : 'Complete business management at your fingertips'
                          }
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {activeRole === 'customer' ? (
                            <>
                              <div className="bg-green-50 rounded-lg p-3">💬 Chat Support</div>
                              <div className="bg-blue-50 rounded-lg p-3">🚚 Live Tracking</div>
                              <div className="bg-purple-50 rounded-lg p-3">⭐ Smart Reviews</div>
                              <div className="bg-orange-50 rounded-lg p-3">💰 Easy Returns</div>
                            </>
                          ) : (
                            <>
                              <div className="bg-green-50 rounded-lg p-3">📊 Analytics</div>
                              <div className="bg-blue-50 rounded-lg p-3">📦 Inventory</div>
                              <div className="bg-purple-50 rounded-lg p-3">💳 Payments</div>
                              <div className="bg-orange-50 rounded-lg p-3">👥 Customers</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 animate-pulse-glow">
                  <RocketOutlined className="text-2xl" />
                  <span>Start Your Free Trial</span>
                  <ArrowRightOutlined className="group-hover:translate-x-2 transition-transform" />
                </button>
                <button className="group px-10 py-5 bg-white text-gray-800 border-2 border-gray-300 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3">
                  <PlayCircleOutlined className="text-2xl" />
                  <span>Watch Product Tour</span>
                </button>
                <button className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3">
                  <WhatsAppOutlined className="text-2xl" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="py-20 bg-gradient-to-br from-white to-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Trusted by <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Indian Businesses</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of successful businesses that have transformed with MeraDukan
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: animatedStats.vendors, label: 'Active Vendors', icon: '🏪', suffix: '+' },
                { number: animatedStats.customers, label: 'Happy Customers', icon: '😊', suffix: '+' },
                { number: animatedStats.orders, label: 'Orders Delivered', icon: '📦', suffix: '+' },
                { number: animatedStats.cities, label: 'Cities Across India', icon: '🏙️', suffix: '+' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-8 bg-white rounded-2xl shadow-xl hover-lift border border-gray-100 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {stat.number.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Business Growth Metrics */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {growthMetrics.map((metric, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100">
                  <div className="text-3xl mb-2">{metric.icon}</div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</div>
                  <div className="text-gray-600 text-sm">{metric.metric}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section id="features" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Powerful <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Features</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to start, run, and scale your digital business to new heights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-xl hover-lift border border-gray-100 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {feature.highlights.map((highlight, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Advanced Features Grid */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Advanced Business Tools
                </h3>
                <p className="text-xl text-gray-600">
                  Professional features for growing businesses
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advancedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors group">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integration Partners Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Trusted <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Integrations</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Seamlessly connect with the tools and services you already use
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {integrationPartners.map((partner, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover-lift border border-gray-200">
                  <div className="text-4xl mb-4">{partner.icon}</div>
                  <h4 className="font-bold text-gray-800 mb-2">{partner.name}</h4>
                  <p className="text-gray-600 text-sm">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Pricing Section */}
        <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Simple & Transparent <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Pricing</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start free and grow with us. No hidden charges, no credit card required for trial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative bg-white rounded-3xl p-8 shadow-2xl hover-lift border-2 transition-all duration-300 ${
                    plan.popular 
                      ? 'border-green-500 transform scale-105 shadow-3xl' 
                      : 'border-gray-100'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                        <CrownOutlined />
                        <span>POPULAR</span>
                      </span>
                    </div>
                  )}
                  
                  {plan.savings && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {plan.savings}
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-5xl font-bold text-gray-800">{plan.price}</span>
                      <span className="text-gray-600 ml-2 text-lg">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-lg">{plan.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircleOutlined className="text-green-500 text-lg flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : plan.price === 'Free' 
                      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}>
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>

            {/* Pricing FAQ */}
            <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Pricing FAQs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    question: "Is there any setup fee?",
                    answer: "No, there are no setup fees for any plan. You can start completely free with our Starter plan."
                  },
                  {
                    question: "Can I change plans later?",
                    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets."
                  },
                  {
                    question: "Is there a contract or long-term commitment?",
                    answer: "No, all plans are month-to-month. You can cancel anytime with no cancellation fees."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Success <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Stories</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear from businesses that have transformed their operations with MeraDukan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-xl hover-lift border border-gray-100 group"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <p className="text-green-600 text-xs font-semibold">{testimonial.business}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarFilled key={i} className="text-yellow-400 text-lg" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-4 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                  
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="text-green-800 font-semibold text-sm">🎯 {testimonial.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  About <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">MeraDukan</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  MeraDukan is on a revolutionary mission to digitize every local business in India. 
                  We believe that every shopkeeper, from the smallest kirana store to the largest retail outlet, 
                  deserves the power of technology to compete and thrive in the digital age.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Founded in 2024 with a vision to bridge the digital divide, we've already helped over 
                  <span className="text-green-600 font-semibold"> 5,000 vendors</span> go digital and serve 
                  <span className="text-blue-600 font-semibold"> 50,000+ customers</span> across 
                  <span className="text-purple-600 font-semibold"> 100+ cities</span> in India.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { number: '100+', label: 'Cities Across India', icon: <EnvironmentOutlined /> },
                    { number: '24/7', label: 'Customer Support', icon: <ClockCircleOutlined /> },
                    { number: '99.9%', label: 'Platform Uptime', icon: <CloudSyncOutlined /> },
                    { number: '5 Min', label: 'Average Setup Time', icon: <RocketOutlined /> }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="text-green-600 text-2xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                    Our Story
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-green-500 hover:text-green-600 transition-colors">
                    Meet the Team
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl p-2 shadow-2xl">
                  <div className="bg-white rounded-2xl p-8">
                    <div className="text-center">
                      <div className="text-8xl mb-6">🇮🇳</div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-4">Made for India</h3>
                      <p className="text-gray-600 text-lg mb-6">
                        Built with love for Indian businesses, supporting multiple languages, 
                        local payment methods, and understanding the unique needs of Indian consumers and merchants.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-green-50 rounded-lg p-3">🌐 Multi-Language</div>
                        <div className="bg-blue-50 rounded-lg p-3">💳 Local Payments</div>
                        <div className="bg-purple-50 rounded-lg p-3">📱 Mobile First</div>
                        <div className="bg-orange-50 rounded-lg p-3">🏪 Small Business Focus</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Get Started?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Let's discuss how MeraDukan can transform your business. Our team is here to help you succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
                
     <div className="space-y-6">
  {[
    { 
      icon: <MailOutlined className="text-2xl" />, 
      label: 'Email Us', 
      value: 'support@meradukan.stote',
      description: 'Send us an email anytime'
    },
    { 
      icon: <PhoneOutlined className="text-2xl" />, 
      label: 'Call Us', 
      value: '+91 82956 60693',
      description: 'We\'re available 24/7'
    },
    { 
      icon: <WhatsAppOutlined className="text-2xl" />, 
      label: 'WhatsApp', 
      value: '+91 82956 60693',
      description: 'Quick chat support'
    },
    { 
      icon: <EnvironmentOutlined className="text-2xl" />, 
      label: 'Visit Office', 
      value: 'Mumbai, India - 400001',
      description: 'Meet us in person'
    }
  ].map((contact, index) => (
    <div 
      key={index} 
      className="flex items-center space-x-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group cursor-pointer"
    >
      <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
        {contact.icon}
      </div>
      <div>
        <div className="font-bold text-lg mb-1">{contact.label}</div>
        <div className="text-green-300 text-xl font-semibold mb-1">{contact.value}</div>
        <div className="text-gray-400">{contact.description}</div>
      </div>
    </div>
  ))}
</div>


                {/* Business Hours */}
                <div className="mt-8 bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                  <h4 className="font-bold text-lg mb-4">Business Hours</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-green-300">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-green-300">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-green-300">Emergency Support</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-3xl font-bold mb-6">Send us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        placeholder="Your first name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        placeholder="Your last name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                    <textarea
                      placeholder="Tell us about your requirements..."
                      rows="5"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full !bg-gradient-to-r !from-green-500 !to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of successful businesses using MeraDukan. Start your digital journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-white !text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white !text-black rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-colors">
                Schedule Demo
              </button>
            </div>
            <p className="mt-4 text-green-200">
              No credit card required • 14-day free trial • Setup in 5 minutes
            </p>
          </div>
        </section>
      </div>

<Footer/>

    </>
  );
};

export default HomePage;
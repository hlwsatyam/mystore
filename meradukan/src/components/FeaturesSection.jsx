import React from 'react';
import { 
  WhatsAppOutlined,
  RocketOutlined,
  SecurityScanOutlined,
  LineChartOutlined,
  GlobalOutlined,
  MoneyCollectOutlined,
  DashboardOutlined,
  BarChartOutlined,
  FileSyncOutlined,
  UserSwitchOutlined,
  CloudSyncOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  GiftOutlined,
  MobileOutlined,
  ShopOutlined,
  CustomerServiceOutlined,
  BankOutlined,
  CheckCircleOutlined,
  StarFilled,
  CrownOutlined,
  BulbOutlined,
  SyncOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

const FeaturesSection = () => {
  // Main Features Data
  const mainFeatures = [
    {
      icon: <WhatsAppOutlined className="text-4xl" />,
      title: 'WhatsApp Business Integration',
      description: 'Complete WhatsApp Business API integration for automated order notifications, customer support, and marketing campaigns. Manage all customer conversations directly from your dashboard.',
      color: 'from-green-500 to-emerald-500',
      highlights: ['Instant Order Alerts', 'Auto Replies', 'Broadcast Messages', 'Chat Management'],
      stats: '95% faster response time',
      premium: true
    },
    {
      icon: <RocketOutlined className="text-4xl" />,
      title: '5-Minute Digital Setup',
      description: 'Transform your physical store into a fully functional digital shop in just 5 minutes. No technical knowledge required - just upload products and start selling.',
      color: 'from-blue-500 to-cyan-500',
      highlights: ['No Coding', 'Mobile First', 'Instant Live', 'Easy Onboarding'],
      stats: '5000+ stores created',
      premium: false
    },
    {
      icon: <SecurityScanOutlined className="text-4xl" />,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level security with SSL encryption, PCI DSS compliance, and advanced fraud detection. Your data and customer information are completely safe.',
      color: 'from-purple-500 to-pink-500',
      highlights: ['SSL Encryption', 'PCI DSS', 'Data Backup', 'Fraud Protection'],
      stats: '99.9% uptime guarantee',
      premium: true
    },
    {
      icon: <LineChartOutlined className="text-4xl" />,
      title: 'AI-Powered Analytics',
      description: 'Smart business intelligence with predictive analytics, sales forecasting, and customer behavior insights. Make data-driven decisions to grow your business.',
      color: 'from-orange-500 to-red-500',
      highlights: ['Sales Reports', 'Customer Insights', 'Inventory Predict', 'Revenue Trends'],
      stats: '187% revenue growth',
      premium: true
    },
    {
      icon: <GlobalOutlined className="text-4xl" />,
      title: 'Pan-India Delivery Network',
      description: 'Reach customers across 100+ Indian cities with our integrated logistics partners. Automated shipping calculations and real-time order tracking.',
      color: 'from-indigo-500 to-purple-500',
      highlights: ['100+ Cities', 'Fast Delivery', 'Track Orders', 'Multiple Partners'],
      stats: '1,00,000+ deliveries',
      premium: false
    },
    {
      icon: <MoneyCollectOutlined className="text-4xl" />,
      title: 'Multiple Payment Options',
      description: 'Accept all Indian payment methods including UPI, credit/debit cards, digital wallets, net banking, and cash on delivery. Secure and instant payment processing.',
      color: 'from-teal-500 to-green-500',
      highlights: ['UPI Payments', 'Credit/Debit Cards', 'Digital Wallets', 'Cash on Delivery'],
      stats: '15+ payment methods',
      premium: false
    }
  ];

  // Advanced Features
  const advancedFeatures = [
    {
      icon: <DashboardOutlined />,
      title: 'Smart Dashboard',
      description: 'Intuitive control panel with real-time business metrics, performance indicators, and quick action buttons.',
      category: 'Management'
    },
    {
      icon: <BarChartOutlined />,
      title: 'Sales Analytics',
      description: 'Comprehensive sales reports with visual charts, growth insights, and performance comparisons.',
      category: 'Analytics'
    },
    {
      icon: <FileSyncOutlined />,
      title: 'Inventory Management',
      description: 'Automated stock tracking with low stock alerts, purchase suggestions, and bulk update capabilities.',
      category: 'Operations'
    },
    {
      icon: <UserSwitchOutlined />,
      title: 'Customer CRM',
      description: 'Complete customer relationship management with purchase history, preferences, and communication logs.',
      category: 'Customer'
    },
    {
      icon: <CloudSyncOutlined />,
      title: 'Cloud Storage',
      description: 'Secure cloud storage for product images, documents, and business data with automatic backups.',
      category: 'Storage'
    },
    {
      icon: <ApiOutlined />,
      title: 'API Access',
      description: 'Developer-friendly REST APIs for custom integrations and third-party applications.',
      category: 'Development'
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Instant Notifications',
      description: 'Real-time push notifications, email alerts, and SMS updates for orders and important events.',
      category: 'Communication'
    },
    {
      icon: <TeamOutlined />,
      title: 'Multi-Staff Accounts',
      description: 'Create multiple staff accounts with different permission levels and access controls.',
      category: 'Team'
    },
    {
      icon: <GiftOutlined />,
      title: 'Discount & Coupons',
      description: 'Create and manage discount coupons, promotional offers, and loyalty programs.',
      category: 'Marketing'
    },
    {
      icon: <MobileOutlined />,
      title: 'Mobile App',
      description: 'Dedicated mobile apps for vendors and customers with all features optimized for mobile.',
      category: 'Mobile'
    },
    {
      icon: <ShopOutlined />,
      title: 'Multi-Store Management',
      description: 'Manage multiple store locations from a single dashboard with centralized control.',
      category: 'Management'
    },
    {
      icon: <CustomerServiceOutlined />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support via chat, email, and phone for all your queries.',
      category: 'Support'
    }
  ];

  // Feature Categories
  const featureCategories = [
    {
      name: 'E-commerce',
      count: '12 Features',
      icon: '🛍️',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Analytics',
      count: '8 Features',
      icon: '📊',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Marketing',
      count: '6 Features',
      icon: '🎯',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Operations',
      count: '10 Features',
      icon: '⚙️',
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Integration Features
  const integrationFeatures = [
    {
      name: 'WhatsApp Business',
      logo: '💬',
      description: 'Complete order management via WhatsApp',
      status: 'Active'
    },
    {
      name: 'Razorpay',
      logo: '💳',
      description: 'Secure payment processing',
      status: 'Active'
    },
    {
      name: 'Shiprocket',
      logo: '🚚',
      description: 'Delivery and logistics management',
      status: 'Active'
    },
    {
      name: 'Google Analytics',
      logo: '📈',
      description: 'Advanced website analytics',
      status: 'Active'
    },
    {
      name: 'Paytm',
      logo: '📱',
      description: 'UPI and wallet payments',
      status: 'Active'
    },
    {
      name: 'SMS Gateway',
      logo: '✉️',
      description: 'Bulk SMS notifications',
      status: 'Active'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full mb-6 shadow-lg">
            <ThunderboltOutlined className="mr-2" />
            <span className="font-semibold">Powerful Features</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Everything You Need to 
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Grow Your Business
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover 50+ powerful features designed to help you start, run, and scale your digital business. 
            From basic setup to advanced automation, we've got you covered.
          </p>
        </div>

        {/* Feature Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featureCategories.map((category, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white text-center shadow-xl hover-lift cursor-pointer`}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-white/90">{category.count}</p>
            </div>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-xl hover-lift border border-gray-100 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                {feature.premium && (
                  <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <CrownOutlined />
                    <span>PREMIUM</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {feature.highlights.map((highlight, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-green-600 font-semibold">
                  <CheckCircleOutlined />
                  <span>{feature.stats}</span>
                </div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced Features Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Advanced Business Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional features designed for growing businesses and enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-gray-50 rounded-xl hover:bg-green-50 transition-all duration-300 border border-gray-200 hover:border-green-200 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-800">{feature.title}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {feature.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Features */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 shadow-xl border border-blue-100 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with your favorite tools and services to create a powerful business ecosystem
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrationFeatures.map((integration, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover-lift border border-gray-200 group cursor-pointer"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {integration.logo}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{integration.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{integration.description}</p>
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  <CheckCircleOutlined className="mr-1" />
                  {integration.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Feature Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan with features that match your business needs
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-bold text-gray-800">Features</th>
                  <th className="text-center py-4 px-6">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="font-bold text-gray-800">Starter</div>
                      <div className="text-green-600 font-semibold">Free</div>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="bg-green-500 rounded-lg p-4 text-white">
                      <div className="font-bold">Professional</div>
                      <div>₹999/month</div>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="bg-blue-500 rounded-lg p-4 text-white">
                      <div className="font-bold">Enterprise</div>
                      <div>₹2,499/month</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'WhatsApp Integration', starter: 'Basic', professional: 'Advanced', enterprise: 'Full API' },
                  { feature: 'Products Limit', starter: '50', professional: '500', enterprise: 'Unlimited' },
                  { feature: 'Storage Space', starter: '1GB', professional: '10GB', enterprise: '100GB' },
                  { feature: 'Analytics', starter: 'Basic', professional: 'Advanced', enterprise: 'AI-Powered' },
                  { feature: 'Support', starter: 'Email', professional: 'Priority', enterprise: '24/7 Phone' },
                  { feature: 'Custom Domain', starter: 'No', professional: 'Yes', enterprise: 'Yes' },
                  { feature: 'API Access', starter: 'No', professional: 'Limited', enterprise: 'Full' },
                  { feature: 'Staff Accounts', starter: '1', professional: '5', enterprise: 'Unlimited' }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-800">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {row.starter}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        <CheckCircleOutlined className="mr-1" />
                        {row.professional}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        <StarFilled className="mr-1" />
                        {row.enterprise}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Explore All Features?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your free trial and experience the complete power of MeraDukan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-green-500 hover:text-green-600 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
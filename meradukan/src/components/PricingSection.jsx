import React, { useState } from 'react';
import { 
  CheckCircleOutlined,
  CloseCircleOutlined,
  CrownOutlined,
  StarFilled,
  ThunderboltOutlined,
 
  SafetyCertificateOutlined,
  TeamOutlined,
  GlobalOutlined,
  CalculatorOutlined,
  QuestionCircleOutlined,
  ArrowRightOutlined,
  WhatsAppOutlined,
  PhoneOutlined,
  CalendarOutlined,
  DollarOutlined,
  GiftOutlined,
  BankOutlined,
  SyncOutlined,
  UserSwitchOutlined,
  FileTextOutlined,
  CloudServerOutlined,
  ApiOutlined,
  BarChartOutlined,
  DashboardOutlined,
  SecurityScanOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or yearly
  const [activePlan, setActivePlan] = useState('professional');

  // Pricing Plans Data
  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individual vendors starting their digital journey',
      monthlyPrice: 'Free',
      yearlyPrice: 'Free',
      period: 'forever',
      buttonText: 'Get Started Free',
      buttonVariant: 'outline',
      popular: false,
      color: 'from-gray-500 to-gray-700',
      features: {
        included: [
          { icon: <CheckCircleOutlined />, text: 'Up to 50 products', tooltip: 'Add up to 50 products in your store' },
          { icon: <CheckCircleOutlined />, text: 'Basic WhatsApp orders', tooltip: 'Receive orders via WhatsApp' },
          { icon: <CheckCircleOutlined />, text: 'Email support', tooltip: 'Support via email within 24 hours' },
          { icon: <CheckCircleOutlined />, text: '1GB storage', tooltip: 'Storage for product images and files' },
          { icon: <CheckCircleOutlined />, text: 'Basic analytics', tooltip: 'Basic sales and customer analytics' },
          { icon: <CheckCircleOutlined />, text: 'Mobile app access', tooltip: 'Access via mobile application' },
          { icon: <CheckCircleOutlined />, text: 'Order management', tooltip: 'Basic order management system' },
          { icon: <CheckCircleOutlined />, text: 'Customer reviews', tooltip: 'Collect and display customer reviews' }
        ],
        excluded: [
          { icon: <CloseCircleOutlined />, text: 'Advanced WhatsApp automation', tooltip: 'Not available in starter plan' },
          { icon: <CloseCircleOutlined />, text: 'Custom domain', tooltip: 'Use your own domain name' },
          { icon: <CloseCircleOutlined />, text: 'Inventory management', tooltip: 'Advanced inventory tracking' },
          { icon: <CloseCircleOutlined />, text: 'Priority support', tooltip: 'Faster support response times' }
        ]
      },
      limits: {
        products: '50',
        storage: '1GB',
        staff: '1',
        support: 'Email'
      }
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Best for growing businesses with advanced needs',
      monthlyPrice: '₹999',
      yearlyPrice: '₹9,990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      buttonText: 'Start 14-Day Trial',
      buttonVariant: 'primary',
      popular: true,
      color: 'from-green-500 to-emerald-600',
      savings: 'Save 17%',
      features: {
        included: [
          { icon: <CheckCircleOutlined />, text: 'Up to 500 products', tooltip: 'Add up to 500 products in your store' },
          { icon: <CheckCircleOutlined />, text: 'Advanced WhatsApp automation', tooltip: 'Automated order confirmations and updates' },
          { icon: <CheckCircleOutlined />, text: 'Priority support', tooltip: 'Faster support response times' },
          { icon: <CheckCircleOutlined />, text: '10GB storage', tooltip: 'Ample storage for all your business needs' },
          { icon: <CheckCircleOutlined />, text: 'Advanced analytics', tooltip: 'Detailed business insights and reports' },
          { icon: <CheckCircleOutlined />, text: 'Custom domain', tooltip: 'Use your own domain name' },
          { icon: <CheckCircleOutlined />, text: 'Inventory management', tooltip: 'Advanced inventory tracking system' },
          { icon: <CheckCircleOutlined />, text: 'Bulk product upload', tooltip: 'Upload multiple products at once' },
          { icon: <CheckCircleOutlined />, text: 'Sales reports', tooltip: 'Detailed sales performance reports' },
          { icon: <CheckCircleOutlined />, text: 'Customer segmentation', tooltip: 'Segment customers for targeted marketing' },
          { icon: <CheckCircleOutlined />, text: 'Discount coupons', tooltip: 'Create and manage promotional coupons' },
          { icon: <CheckCircleOutlined />, text: 'Multi-staff accounts', tooltip: 'Add up to 5 staff members' }
        ],
        excluded: [
          { icon: <CloseCircleOutlined />, text: 'Full WhatsApp Business API', tooltip: 'Complete WhatsApp API integration' },
          { icon: <CloseCircleOutlined />, text: '24/7 phone support', tooltip: 'Round-the-clock phone support' },
          { icon: <CloseCircleOutlined />, text: 'White-label solution', tooltip: 'Remove MeraDukan branding' }
        ]
      },
      limits: {
        products: '500',
        storage: '10GB',
        staff: '5',
        support: 'Priority'
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For established businesses needing full customization',
      monthlyPrice: '₹2,499',
      yearlyPrice: '₹23,990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary',
      popular: false,
      color: 'from-blue-500 to-cyan-600',
      savings: 'Save 20%',
      features: {
        included: [
          { icon: <CheckCircleOutlined />, text: 'Unlimited products', tooltip: 'No limits on products' },
          { icon: <CheckCircleOutlined />, text: 'Full WhatsApp Business API', tooltip: 'Complete WhatsApp API integration' },
          { icon: <CheckCircleOutlined />, text: '24/7 phone support', tooltip: 'Round-the-clock phone support' },
          { icon: <CheckCircleOutlined />, text: '100GB storage', tooltip: 'Generous storage for large businesses' },
          { icon: <CheckCircleOutlined />, text: 'AI-powered analytics', tooltip: 'Artificial intelligence driven insights' },
          { icon: <CheckCircleOutlined />, text: 'Multiple staff accounts', tooltip: 'Unlimited staff members' },
          { icon: <CheckCircleOutlined />, text: 'API access', tooltip: 'Full API access for custom integrations' },
          { icon: <CheckCircleOutlined />, text: 'Custom features', tooltip: 'Tailored features for your business' },
          { icon: <CheckCircleOutlined />, text: 'White-label solution', tooltip: 'Remove MeraDukan branding' },
          { icon: <CheckCircleOutlined />, text: 'Advanced security', tooltip: 'Enhanced security features' },
          { icon: <CheckCircleOutlined />, text: 'Dedicated account manager', tooltip: 'Personal account manager' },
          { icon: <CheckCircleOutlined />, text: 'Custom integrations', tooltip: 'Custom software integrations' },
          { icon: <CheckCircleOutlined />, text: 'Training sessions', tooltip: 'Staff training sessions' },
          { icon: <CheckCircleOutlined />, text: 'SLA guarantee', tooltip: 'Service Level Agreement' }
        ],
        excluded: []
      },
      limits: {
        products: 'Unlimited',
        storage: '100GB',
        staff: 'Unlimited',
        support: '24/7 Phone'
      }
    }
  ];

  // Feature Categories for Comparison
  const featureCategories = [
    {
      name: 'Store Management',
      icon: <DashboardOutlined />,
      features: [
        'Products Limit',
        'Storage Space',
        'Custom Domain',
        'Inventory Management',
        'Bulk Product Upload'
      ]
    },
    {
      name: 'Communication',
      icon: <WhatsAppOutlined />,
      features: [
        'WhatsApp Integration',
        'Auto Replies',
        'Broadcast Messages',
        'Chat Management',
        'WhatsApp Business API'
      ]
    },
    {
      name: 'Analytics & Reports',
      icon: <BarChartOutlined />,
      features: [
        'Basic Analytics',
        'Advanced Analytics',
        'AI-Powered Insights',
        'Sales Reports',
        'Customer Segmentation'
      ]
    },
    {
      name: 'Team & Support',
      icon: <TeamOutlined />,
      features: [
        'Staff Accounts',
        'Email Support',
        'Priority Support',
        '24/7 Phone Support',
        'Dedicated Manager'
      ]
    },
    {
      name: 'Advanced Features',
      icon: <ThunderboltOutlined />,
      features: [
        'API Access',
        'Custom Features',
        'White-label Solution',
        'Training Sessions',
        'SLA Guarantee'
      ]
    }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "Is there any setup fee or hidden charges?",
      answer: "No, there are absolutely no setup fees or hidden charges for any plan. The price you see is what you pay. Our Starter plan is completely free forever with no credit card required."
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll get immediate access to new features. When you downgrade, changes take effect at the end of your billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including credit/debit cards (Visa, MasterCard, American Express), UPI payments, net banking, and popular digital wallets like Paytm, PhonePe, and Google Pay."
    },
    {
      question: "Is there a contract or long-term commitment?",
      answer: "No, all plans are month-to-month with no long-term contract. You can cancel your subscription at any time with no cancellation fees. We believe in earning your business every month."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes! When you choose annual billing, you get 2 months free compared to monthly billing. That's a 17% discount on Professional plan and 20% discount on Enterprise plan."
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer: "If you approach your plan limits, we'll notify you in advance. You can either upgrade your plan or purchase additional capacity. We never automatically charge you for overages without your consent."
    },
    {
      question: "Can I get a custom plan for my business?",
      answer: "Absolutely! Our Enterprise plan is fully customizable. Contact our sales team to discuss your specific requirements and we'll create a tailored solution that fits your business needs perfectly."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 14-day money-back guarantee on all paid plans. If you're not satisfied with our service within the first 14 days, we'll provide a full refund, no questions asked."
    }
  ];

  // Calculate savings
  const calculateSavings = (monthlyPrice, yearlyPrice) => {
    if (monthlyPrice === 'Free') return '0%';
    const monthly = parseInt(monthlyPrice.replace('₹', '').replace(',', ''));
    const yearly = parseInt(yearlyPrice.replace('₹', '').replace(',', ''));
    const savings = ((monthly * 12 - yearly) / (monthly * 12)) * 100;
    return `${Math.round(savings)}%`;
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full mb-6 shadow-lg">
            <DollarOutlined className="mr-2" />
            <span className="font-semibold">Transparent Pricing</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Simple, Honest 
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Start free and grow with us. No hidden fees, no credit card required for trial. 
            Choose the perfect plan that matches your business needs and budget.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg font-semibold ${billingCycle === 'monthly' ? 'text-gray-800' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-gray-300 rounded-full transition-colors duration-300 focus:outline-none"
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  billingCycle === 'yearly' ? 'transform translate-x-8' : 'transform translate-x-1'
                }`}
              />
              <div
                className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                  billingCycle === 'yearly' ? 'bg-green-500' : 'bg-gray-400'
                }`}
              />
            </button>
            <span className={`text-lg font-semibold ${billingCycle === 'yearly' ? 'text-gray-800' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Save up to 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 shadow-xl hover-lift border-2 transition-all duration-300 ${
                plan.popular 
                  ? 'border-green-500 transform scale-105 shadow-2xl' 
                  : 'border-gray-200'
              } ${activePlan === plan.id ? 'ring-4 ring-green-200' : ''}`}
              onClick={() => setActivePlan(plan.id)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                    <CrownOutlined />
                    <span>MOST POPULAR</span>
                  </span>
                </div>
              )}

              {/* Savings Badge */}
              {plan.savings && billingCycle === 'yearly' && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {plan.savings}
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-gray-800">
                    {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-600 ml-2 text-lg">{plan.period}</span>
                </div>
                {plan.savings && billingCycle === 'yearly' && (
                  <div className="text-green-600 font-semibold mb-2">
                    Save {calculateSavings(plan.monthlyPrice, plan.yearlyPrice)} with yearly billing
                  </div>
                )}
                <p className="text-gray-600 text-lg">{plan.description}</p>
              </div>

              {/* Plan Limits */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{plan.limits.products}</div>
                  <div className="text-gray-600 text-sm">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{plan.limits.storage}</div>
                  <div className="text-gray-600 text-sm">Storage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{plan.limits.staff}</div>
                  <div className="text-gray-600 text-sm">Staff Accounts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{plan.limits.support}</div>
                  <div className="text-gray-600 text-sm">Support</div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <h4 className="font-bold text-gray-800 text-lg">What's Included:</h4>
                {plan.features.included.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <CheckCircleOutlined className="text-green-500 text-lg flex-shrink-0" />
                    <span className="text-gray-700 group-hover:text-green-600 transition-colors cursor-help" title={feature.tooltip}>
                      {feature.text}
                    </span>
                  </div>
                ))}
                
                {plan.features.excluded.length > 0 && (
                  <>
                    <h4 className="font-bold text-gray-800 text-lg mt-6">Not Included:</h4>
                    {plan.features.excluded.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 opacity-50">
                        <CloseCircleOutlined className="text-red-400 text-lg flex-shrink-0" />
                        <span className="text-gray-500 cursor-help" title={feature.tooltip}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                plan.buttonVariant === 'primary' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : plan.buttonVariant === 'secondary'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-gray-100 text-gray-800 border-2 border-gray-300 hover:bg-gray-200'
              }`}>
                {plan.buttonText}
              </button>

              {/* Trial Info */}
              {plan.id !== 'starter' && (
                <div className="text-center mt-4">
                  <p className="text-gray-500 text-sm">
                    <CalendarOutlined className="mr-1" />
                    14-day free trial • No credit card required
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Detailed Feature Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compare all features across different plans to make the right choice for your business
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-6 px-6 font-bold text-gray-800 text-lg">Features</th>
                  {pricingPlans.map((plan) => (
                    <th key={plan.id} className="text-center py-6 px-6">
                      <div className={`bg-gradient-to-br ${plan.color} rounded-2xl p-6 text-white`}>
                        <div className="text-xl font-bold mb-2">{plan.name}</div>
                        <div className="text-2xl font-bold">
                          {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </div>
                        <div className="text-white/80">{plan.period}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureCategories.map((category) => (
                  <React.Fragment key={category.name}>
                    <tr className="bg-gray-50">
                      <td colSpan="4" className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="text-green-600">{category.icon}</div>
                          <span className="font-bold text-gray-800 text-lg">{category.name}</span>
                        </div>
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr key={feature} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium text-gray-700">{feature}</td>
                        {pricingPlans.map((plan) => (
                          <td key={plan.id} className="py-4 px-6 text-center">
                            {plan.features.included.some(f => f.text.includes(feature)) ? (
                              <CheckCircleOutlined className="text-green-500 text-xl" />
                            ) : (
                              <CloseCircleOutlined className="text-red-400 text-xl" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 shadow-xl border border-blue-100 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our pricing and plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start space-x-4">
                  <QuestionCircleOutlined className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-3">{faq.question}</h4>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of businesses using MeraDukan. Start your free trial today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center space-x-2">
                <ThunderboltOutlined />
                <span>Start Free Trial</span>
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center space-x-2">
                <WhatsAppOutlined />
                <span>Chat with Sales</span>
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center space-x-2">
                <PhoneOutlined />
                <span>Book a Demo</span>
              </button>
            </div>
            <p className="mt-6 text-green-100">
              No credit card required • 14-day free trial • Setup in 5 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
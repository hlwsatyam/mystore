import React, { useState } from 'react';
import { Button, Row, Col, Card } from 'antd';

const Hero = () => {
  const [activeRole, setActiveRole] = useState('customer');

  const customerFeatures = [
    '📍 Local Shops Discover Karo',
    '🛒 Easy Online Ordering',
    '💬 Direct WhatsApp Support',
    '🚚 Fast Local Delivery'
  ];

  const vendorFeatures = [
    '🏪 5 Minutes Mein Dukan Banayein',
    '📱 WhatsApp Par Direct Orders',
    '📊 Sales Analytics & Reports',
    '💼 Inventory Management'
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50 pt-20">
      <div className="container mx-auto px-6">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            {/* Role Badge */}
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full mb-6 shadow-md"
              style={{ 
                background: activeRole === 'customer' 
                  ? 'linear-gradient(135deg, #138808 0%, #00FF00 100%)' 
                  : 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)' 
              }}
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></span>
              <span className="text-white text-sm font-semibold">
                {activeRole === 'customer' ? '🛒 Customer Platform' : '🏪 Vendor Platform'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              {activeRole === 'customer' 
                ? 'Local Shops Se' 
                : 'Apna Dukan Online'
              }
              <span className="block text-indian-gradient">
                {activeRole === 'customer' 
                  ? 'Order Karo WhatsApp Par' 
                  : '5 Minute Mein Start Karein'
                }
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              {activeRole === 'customer'
                ? 'Apne area ke best local shops se fresh products order karo. WhatsApp par direct contact, fast delivery, aur complete satisfaction.'
                : 'Koi technical knowledge nahi chahiye. Apna digital dukan banayein aur orders WhatsApp par receive karein.'
              }
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 gap-3 mb-8">
              {(activeRole === 'customer' ? customerFeatures : vendorFeatures).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-700">
                  <span className="text-green-600 text-lg">✓</span>
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="primary" 
                size="large"
                className="whatsapp-green h-14 text-lg font-semibold border-0"
              >
                <span className="flex items-center space-x-2">
                  <span>📱</span>
                  <span>
                    {activeRole === 'customer' 
                      ? 'Shop Discover Karein' 
                      : 'Free Dukan Banayein'
                    }
                  </span>
                </span>
              </Button>
              <Button 
                size="large"
                className="h-14 text-lg font-semibold border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                <span className="flex items-center space-x-2">
                  <span>📺</span>
                  <span>Live Demo Dekhein</span>
                </span>
              </Button>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            {/* Role Selector */}
            <div className="flex justify-center lg:justify-start space-x-4 mb-8">
              <button
                onClick={() => setActiveRole('customer')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeRole === 'customer' 
                    ? 'customer-gradient text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                }`}
              >
                🛒 Main Customer Hoon
              </button>
              <button
                onClick={() => setActiveRole('vendor')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeRole === 'vendor' 
                    ? 'vendor-gradient text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                }`}
              >
                🏪 Main Vendor Hoon
              </button>
            </div>

            {/* Demo Card */}
            <Card 
              className="shadow-2xl border-0 rounded-2xl hover-lift"
              bodyStyle={{ padding: '2rem' }}
            >
              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl text-white mb-4"
                  style={{
                    background: activeRole === 'customer' 
                      ? 'linear-gradient(135deg, #138808 0%, #00FF00 100%)' 
                      : 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)'
                  }}
                >
                  {activeRole === 'customer' ? '🛒' : '🏪'}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {activeRole === 'customer' ? 'Customer App' : 'Vendor Dashboard'}
                </h3>
                <p className="text-gray-600">
                  {activeRole === 'customer' 
                    ? 'Real-time shopping experience' 
                    : 'Complete business management'
                  }
                </p>
              </div>

              {/* Demo Content */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">💬</span>
                  </div>
                  <div>
                    <div className="font-semibold">WhatsApp Integration</div>
                    <div className="text-sm text-gray-500">
                      {activeRole === 'customer' 
                        ? 'Direct shop contact' 
                        : 'Instant order notifications'
                      }
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📊</span>
                  </div>
                  <div>
                    <div className="font-semibold">
                      {activeRole === 'customer' ? 'Live Tracking' : 'Sales Analytics'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {activeRole === 'customer' 
                        ? 'Order status in real-time' 
                        : 'Daily sales reports'
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">5000+</div>
                  <div className="text-xs text-gray-600">
                    {activeRole === 'customer' ? 'Shops' : 'Vendors'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">50K+</div>
                  <div className="text-xs text-gray-600">
                    {activeRole === 'customer' ? 'Products' : 'Orders/Month'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">95%</div>
                  <div className="text-xs text-gray-600">Satisfaction</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;
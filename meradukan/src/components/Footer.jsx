import React from 'react';
import { 
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  WhatsAppOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
  HeartOutlined,
  SecurityScanOutlined,
  CreditCardOutlined,
  TruckOutlined,
  StarOutlined,
  DownloadOutlined,
  AppleOutlined,
  AndroidOutlined,
  GlobalOutlined,
  FlagOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Footer = ({isWhatsappShow=true}) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const customerLinks = [
    'How to Order',
    'Track Your Order',
    'Payment Methods',
    'Return Policy',
    'Shipping Info',
    'FAQ Help Center',
    'Gift Cards',
    'Special Offers'
  ];

  const vendorLinks = [
    'Start Selling',
    'Vendor Dashboard',
    'Inventory Management',
    'Order Management',
    'Business Analytics',
    'Payment Settlement',
    'Vendor Support',
    'Success Stories'
  ];

  const legalLinks = [
    'Privacy Policy',
    'Terms of Service',
    'Return Policy',
    'Shipping Policy',
    'Cookie Policy',
    'GDPR Compliance',
    'Vendor Agreement',
    'Service Level Agreement'
  ];

  const socialLinks = [
    { icon: <FacebookOutlined />, name: 'Facebook', url: '#' },
    { icon: <TwitterOutlined />, name: 'Twitter', url: '#' },
    { icon: <InstagramOutlined />, name: 'Instagram', url: '#' },
    { icon: <LinkedinOutlined />, name: 'LinkedIn', url: '#' },
    { icon: <YoutubeOutlined />, name: 'YouTube', url: '#' },
    { icon: <WhatsAppOutlined />, name: 'WhatsApp', url: '#' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Top Section - Newsletter */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated with MeraDukan
              </h3>
              <p className="text-green-100 text-lg">
                Get the latest features, business tips, and success stories delivered to your inbox
              </p>
            </div>
            <div>
              <div className="flex flex-wrap space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl border-0 !focus:ring-2 focus:ring-white focus:outline-none !text-gray-800"
                />
                <button className="px-6 py-3 bg-black text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-green-100 text-sm mt-2">
                🔒 We respect your privacy. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div 
              className="flex items-center space-x-3 mb-6 cursor-pointer"
              onClick={handleHomeClick}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">🛍️</span>
              </div>
              <div>
                <span className="text-2xl font-bold">MeraDukan</span>
                <div className="flex space-x-2 mt-1">
                  <span className="text-xs bg-green-500 px-2 py-1 rounded-full">Customers</span>
                  <span className="text-xs bg-orange-500 px-2 py-1 rounded-full">Vendors</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering local businesses with cutting-edge technology. Join India's fastest growing e-commerce platform.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors cursor-pointer">
                <WhatsAppOutlined className="text-green-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">
                <MailOutlined className="text-blue-400" />
                <span>support@meradukan.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
                <EnvironmentOutlined className="text-orange-400" />
                <span>Mumbai, India - 400001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-l-4 border-green-500 pl-3">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <div key={index}>
                  <a 
                    href={link.path}
                    className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors group"
                  >
                    <ArrowRightOutlined className="text-green-500 text-xs group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* For Customers */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-l-4 border-blue-500 pl-3">For Customers</h4>
            <div className="space-y-3">
              {customerLinks.map((link, index) => (
                <div key={index}>
                  <a 
                    href="#"
                    className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <ArrowRightOutlined className="text-blue-500 text-xs group-hover:translate-x-1 transition-transform" />
                    <span>{link}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-l-4 border-orange-500 pl-3">For Vendors</h4>
            <div className="space-y-3">
              {vendorLinks.map((link, index) => (
                <div key={index}>
                  <a 
                    href="#"
                    className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors group"
                  >
                    <ArrowRightOutlined className="text-orange-500 text-xs group-hover:translate-x-1 transition-transform" />
                    <span>{link}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <SecurityScanOutlined className="text-3xl text-green-400 mb-2" />
              <span className="font-semibold">SSL Secured</span>
              <span className="text-gray-400 text-sm">Bank-Level Security</span>
            </div>
            <div className="flex flex-col items-center">
              <CreditCardOutlined className="text-3xl text-blue-400 mb-2" />
              <span className="font-semibold">Safe Payments</span>
              <span className="text-gray-400 text-sm">100% Protected</span>
            </div>
            <div className="flex flex-col items-center">
              <TruckOutlined className="text-3xl text-orange-400 mb-2" />
              <span className="font-semibold">Fast Delivery</span>
              <span className="text-gray-400 text-sm">Across India</span>
            </div>
            <div className="flex flex-col items-center">
              <StarOutlined className="text-3xl text-yellow-400 mb-2" />
              <span className="font-semibold">4.9/5 Rating</span>
              <span className="text-gray-400 text-sm">Trusted by 5000+</span>
            </div>
          </div>
        </div>

        {/* Mobile Apps */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-2xl font-bold mb-2">Download Our App</h4>
              <p className="text-green-100 mb-4">
                Get the best experience on your mobile device
              </p>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-4 py-3 bg-black rounded-xl hover:bg-gray-900 transition-colors">
                  <AppleOutlined className="text-white text-xl" />
                  <div className="text-left">
                    <div className="text-white text-xs">Download on the</div>
                    <div className="text-white font-semibold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center space-x-2 px-4 py-3 bg-black rounded-xl hover:bg-gray-900 transition-colors">
                  <AndroidOutlined className="text-white text-xl" />
                  <div className="text-left">
                    <div className="text-white text-xs">Get it on</div>
                    <div className="text-white font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl">📱</div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 py-6 border-t border-b border-gray-700">
          <div className="mb-4 md:mb-0">
            <h5 className="font-bold mb-2">Follow Us</h5>
            <p className="text-gray-400">Stay connected with MeraDukan</p>
          </div>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-white hover:bg-green-500 transition-colors hover:scale-110 transform duration-300"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {legalLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-400 hover:text-green-400 transition-colors text-sm"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear} MeraDukan Technologies Pvt. Ltd. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Made with <HeartOutlined className="text-red-500" /> in India <FlagOutlined className="text-orange-500 ml-1" />
              </p>
            </div>
            
            <div className="flex items-center space-x-4 text-gray-400">
              <GlobalOutlined />
              <span>English</span>
              <span>•</span>
              <span>INR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
     {isWhatsappShow && <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/918295660693"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transform transition-all duration-300 animate-bounce"
          title="Chat with us on WhatsApp"
        >
          <WhatsAppOutlined className="text-2xl" />
        </a>
      </div>}
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { 
  MenuOutlined, 
  UserOutlined,
  ShopOutlined,
  PhoneOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  FileTextOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('customer');
  const navigate = useNavigate();

  // Navigation items
  const navigationItems = [
    { key: 'home', label: 'Home', href: '/', icon: <ShopOutlined   /> },
    { key: 'features', label: 'Features', href: '/features', icon: <InfoCircleOutlined /> },
    { key: 'pricing', label: 'Pricing', href: '/pricing', icon: <DollarOutlined /> },
    { key: 'testimonials', label: 'Testimonials', href: '/testimonials', icon: <TeamOutlined /> },
    { key: 'about', label: 'About', href: '/about', icon: <FileTextOutlined /> },
    { key: 'contact', label: 'Contact', href: '/contact', icon: <PhoneOutlined /> },
  ];

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    setIsMenuOpen(false);
  };

  const handleHome = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 h-[10vh] w-full bg-white/95 backdrop-blur-md z-40 shadow-lg  ">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={handleHome}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">🛍️</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-800">MeraDukan</span>
              <div className="flex space-x-2 mt-1">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Customers</span>
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Vendors</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Role Switcher */}
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveRole('customer')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeRole === 'customer' 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                🛒 Customer
              </button>
              <button
                onClick={() => setActiveRole('vendor')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeRole === 'vendor' 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                🏪 Vendor
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {navigationItems.map(item => (
                <a 
                  key={item.key} 
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors font-medium group"
                >
                  <span className="!text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </span>
                  <span  >{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={handleLogin}
              className="flex items-center space-x-2 px-6 py-2 border-2 border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-all font-semibold"
            >
              <UserOutlined />
              <span>Login</span>
            </button>
            
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <CloseOutlined className="text-2xl text-gray-600" />
            ) : (
              <MenuOutlined className="text-2xl text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200 bg-white rounded-lg shadow-xl">
            {/* Mobile Role Switcher */}
            <div className="flex space-x-2 mb-4">
              <button 
                onClick={() => setActiveRole('customer')}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  activeRole === 'customer' 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' 
                    : 'bg-green-100 text-green-800'
                }`}
              >
                🛒 Customer
              </button>
              <button 
                onClick={() => setActiveRole('vendor')}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  activeRole === 'vendor' 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' 
                    : 'bg-orange-100 text-orange-800'
                }`}
              >
                🏪 Vendor
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-2 mb-4">
              {navigationItems.map(item => (
                <a 
                  key={item.key}
                  href={item.href}
                  className="flex items-center space-x-3 py-3 px-4 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-green-500">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
                <button 
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all"
                >
                  <UserOutlined />
                  <span>Login</span>
                </button>
               
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { 
  UserOutlined, 
  LockOutlined, 
  ShopOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import { Skeleton, Input, Button, Card, Image } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const navigate = useNavigate();

  const createSellerMutation = useMutation({
    mutationFn: async (email) => {
      const response = await axios.get(`http://localhost:5000/api/auth/auto-create-seller?email=${email}`);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.data.password !== 'Use your existing password') {
        setPassword(data.data.password);
        toast.success(`Account created! Your password: ${data.data.password}`, {
          duration: 10000,
        });
      } else {
        toast.success('Account already exists. Please use your existing password.');
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create account');
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      localStorage.setItem('store', JSON.stringify(data.data.store));
      
      toast.success('Login successful!');
      navigate('/admin');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  });

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && value.includes('@') && !isCreatingAccount) {
      // setIsCreatingAccount(true);
      // createSellerMutation.mutate(value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    loginMutation.mutate({ email, password });
  };

  const isLoading = createSellerMutation.isPending || loginMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Image and Info */}
            <div className="hidden lg:block">
              <div className="text-center">
                <Image
                  src="https://cdn2.hubspot.net/hubfs/318836/online-store-small-business-blog.png"
                  alt="Store Management"
                  preview={false}
                  className="rounded-2xl shadow-2xl mb-8"
                />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Manage Your WhatsApp Store
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Create your digital storefront, manage products, accept orders, and grow your business with WhatsApp integration.
                </p>
                <div className="grid grid-cols-2 gap-4 text-left">
                  {[
                    'Multi-product Catalog',
                    'WhatsApp Order Notifications',
                    'Digital QR Code',
                    'Secure Payments',
                    'Inventory Management',
                    'Customer Analytics'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="max-w-md mx-auto lg:mx-0">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
                  <ShopOutlined />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Seller Login</h1>
                <p className="text-gray-600">Access your store dashboard</p>
              </div>

              {/* Login Card */}
              <Card className="shadow-2xl border-0 rounded-2xl">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton.Input active size="large" className="w-full" />
                    <Skeleton.Input active size="large" className="w-full" />
                    <Skeleton.Button active size="large" className="w-full" />
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        size="large"
                        placeholder="Enter your email"
                        prefix={<UserOutlined className="text-gray-400" />}
                        value={email}
                        onChange={handleEmailChange}
                        type="email"
                        required
                        className="h-12 rounded-xl"
                      />
                      {createSellerMutation.isPending && (
                        <div className="text-green-600 text-sm mt-2">
                          Creating your seller account...
                        </div>
                      )}
                    </div>

                    {/* Password Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <Input
                        size="large"
                        placeholder="Enter your password"
                        prefix={<LockOutlined className="text-gray-400" />}
                        suffix={
                          showPassword ? (
                            <EyeInvisibleOutlined 
                              className="text-gray-400 cursor-pointer"
                              onClick={() => setShowPassword(false)}
                            />
                          ) : (
                            <EyeOutlined 
                              className="text-gray-400 cursor-pointer"
                              onClick={() => setShowPassword(true)}
                            />
                          )
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        required
                        className="h-12 rounded-xl"
                      />
                      {createSellerMutation.data?.data?.password && 
                       createSellerMutation.data.data.password !== 'Use your existing password' && (
                        <div className="text-green-600 text-sm mt-2">
                          Your auto-generated password is filled above
                        </div>
                      )}
                    </div>

                    {/* Login Button */}
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      loading={loginMutation.isPending}
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 border-0 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all"
                    >
                      {loginMutation.isPending ? 'Logging in...' : 'Login to Dashboard'}
                    </Button>
                  </form>
                )}

                {/* Info Section */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-sm text-blue-700">
                    <strong>Note:</strong> Enter your email to automatically create a seller account. 
                    Your password will be generated and filled automatically.
                  </div>
                </div>
              </Card>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: '🔒', text: 'Secure Login' },
                  { icon: '⚡', text: 'Auto Account Creation' },
                  { icon: '📱', text: 'Mobile Responsive' }
                ].map((feature, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <div className="text-sm text-gray-600">{feature.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
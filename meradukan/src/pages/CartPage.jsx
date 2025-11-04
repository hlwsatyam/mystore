// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  MapPin,
  ShoppingBag,
  ArrowLeft,
  User,
  Phone,
  Navigation,
  Shield,
  Clock,
  Truck,
  CreditCard,
  Gift
} from 'lucide-react';
import {
  Card,
  Button,
  Input,
  Select,
  Modal,
  notification,
  Empty,
  Badge,
  Tag,
  Divider,
  Spin,
  Form,
  Radio,
  Space,
  Typography,
  Image,
  List,
  Progress,
  Tooltip
} from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Meta } = Card;

// Helper functions defined at module level
const calculateTotal = (storeCart) => {
  return storeCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const calculateSavings = (storeCart) => {
  return storeCart.items.reduce((savings, item) => {
    if (item.comparePrice && item.comparePrice > item.price) {
      return savings + ((item.comparePrice - item.price) * item.quantity);
    }
    return savings;
  }, 0);
};

const getTotalCartItems = (cart) => {
  return Object.values(cart).reduce((total, storeCart) => 
    total + storeCart.items.reduce((sum, item) => sum + item.quantity, 0), 0
  );
};

const CartPage = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    loadCart();
    getUserLocation();
  }, []);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(cartData);
    setLoading(false);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          notification.success({
            message: 'Location Updated',
            description: 'Your location has been set for better delivery estimates',
            placement: 'topRight',
          });
        },
        (error) => {
          notification.warning({
            message: 'Location Access',
            description: 'Enable location for accurate delivery tracking',
            placement: 'topRight',
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
  };

  const updateQuantity = (storeId, productId, newQuantity) => {
    const updatedCart = { ...cart };
    const productIndex = updatedCart[storeId].items.findIndex(item => item._id === productId);
    
    if (productIndex !== -1) {
      if (newQuantity === 0) {
        updatedCart[storeId].items.splice(productIndex, 1);
        if (updatedCart[storeId].items.length === 0) {
          delete updatedCart[storeId];
        }
      } else {
        updatedCart[storeId].items[productIndex].quantity = newQuantity;
      }
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
      window.dispatchEvent(new Event('cartUpdated'));
      queryClient.invalidateQueries(['cart']);
      
      notification.success({
        message: 'Cart Updated',
        description: 'Item quantity has been updated',
        placement: 'topRight',
        duration: 2,
      });
    }
  };

  const removeItem = (storeId, productId) => {
    Modal.confirm({
      title: 'Remove Item',
      content: 'Are you sure you want to remove this item from your cart?',
      okText: 'Yes, Remove',
      cancelText: 'Cancel',
      okType: 'danger',
      centered: true,
      onOk() {
        const updatedCart = { ...cart };
        updatedCart[storeId].items = updatedCart[storeId].items.filter(item => item._id !== productId);
        
        if (updatedCart[storeId].items.length === 0) {
          delete updatedCart[storeId];
        }
        
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        window.dispatchEvent(new Event('cartUpdated'));
        queryClient.invalidateQueries(['cart']);
        
        notification.success({
          message: 'Item Removed',
          description: 'Item has been removed from your cart',
          placement: 'topRight',
          duration: 2,
        });
      }
    });
  };

  const handleCheckout = (storeId) => {
    const storeCart = cart[storeId];
    setSelectedStore(storeCart);
    setIsModalVisible(true);
  };

  const sendWhatsAppOrder = async (values) => {
    const store = selectedStore.storeInfo;
    const items = selectedStore.items;
    const total = calculateTotal(selectedStore);
    const savings = calculateSavings(selectedStore);
    
    let message = `*🛍️ NEW ORDER - ${store.storeName}*\\n\\n`;
    message += `*👤 Customer Details:*\\n`;
    message += `Name: ${values.name}\\n`;
    message += `Phone: ${values.phone}\\n`;
    message += `Address: ${values.address}\\n`;
    message += `Landmark: ${values.landmark || 'Not specified'}\\n\\n`;
    
    if (userLocation) {
      message += `📍 *Location:* https://maps.google.com/?q=${userLocation.latitude},${userLocation.longitude}\\n\\n`;
    }
    
    message += `*📦 Order Items:*\\n`;
    items.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      message += `${index + 1}. ${item.name} - ₹${item.price} x ${item.quantity} = ₹${itemTotal}\\n`;
      
      if (item.selectedVariant) {
        message += `   📋 Variant: ${item.selectedVariant.name}\\n`;
      }
    });
    
    message += `\\n*💰 Order Summary:*\\n`;
    message += `Subtotal: ₹${total}\\n`;
    if (savings > 0) {
      message += `You Save: ₹${savings.toFixed(2)}\\n`;
    }
    message += `*Total Amount: ₹${total}*\\n\\n`;
    
    message += `*💳 Payment Method:* ${values.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'UPI Payment'}\\n`;
    message += `*⏰ Delivery Preference:* ${values.deliveryTime}\\n`;
    message += `*📝 Special Instructions:* ${values.instructions || 'None'}\\n\\n`;
    
    message += `Thank you! 🎉\\nOrder placed via ${store.storeName} App`;
    
    const whatsappUrl = `https://wa.me/${store.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after order
    const updatedCart = { ...cart };
    delete updatedCart[store._id];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
    queryClient.invalidateQueries(['cart']);
    
    setIsModalVisible(false);
    form.resetFields();
    
    notification.success({
      message: 'Order Sent Successfully! 🎉',
      description: 'Your order has been sent to the store via WhatsApp',
      placement: 'topRight',
      duration: 4,
    });
  };

  if (loading) {
    return <PremiumCartSkeleton />;
  }

  const storeIds = Object.keys(cart);

  if (storeIds.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-16 h-16 text-blue-500" />
          </div>
          <Title level={2} className="!text-gray-900 !mb-3">
            Your Cart is Empty
          </Title>
          <Paragraph className="text-gray-600 text-lg mb-8">
            Discover amazing products and add them to your cart to get started
          </Paragraph>
          <Space size="middle">
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/')}
              className="!bg-gradient-to-r !from-blue-600 !to-purple-600 !border-0 !h-12 !px-8 !font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Shopping
            </Button>
            <Button 
              size="large"
              onClick={() => navigate('/stores')}
              className="!h-12 !px-8 !font-semibold"
            >
              Browse Stores
            </Button>
          </Space>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Premium Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/60 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                type="text"
                icon={<ArrowLeft className="w-5 h-5" />}
                onClick={() => navigate(-1)}
                className="!text-gray-600 hover:!bg-gray-100 !rounded-full !w-10 !h-10"
              />
              <div>
                <Title level={2} className="!mb-1 !text-gray-900">
                  Shopping Cart
                </Title>
                <Text type="secondary" className="text-lg">
                  {getTotalCartItems(cart)} items across {storeIds.length} {storeIds.length > 1 ? 'stores' : 'store'}
                </Text>
              </div>
            </div>
            
            <Badge count={getTotalCartItems(cart)} size="default" offset={[-5, 5]}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key="cart-items"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {storeIds.map((storeId, index) => (
                  <motion.div
                    key={storeId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <PremiumStoreCartSection
                      storeCart={cart[storeId]}
                      onUpdateQuantity={updateQuantity}
                      onRemoveItem={removeItem}
                      onCheckout={handleCheckout}
                      userLocation={userLocation}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <PremiumCartSummary 
                cart={cart} 
                userLocation={userLocation}
                onEnableLocation={getUserLocation}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Premium Checkout Modal */}
      <Modal
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={800}
        centered
        className="premium-checkout-modal"
        styles={{
          body: { padding: 0 }
        }}
      >
        {selectedStore && (
          <PremiumCheckoutForm
            storeCart={selectedStore}
            userLocation={userLocation}
            form={form}
            onFinish={sendWhatsAppOrder}
            onCancel={() => {
              setIsModalVisible(false);
              form.resetFields();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

// Premium Store Cart Section Component
const PremiumStoreCartSection = ({ storeCart, onUpdateQuantity, onRemoveItem, onCheckout, userLocation }) => {
  const store = storeCart.storeInfo;
  const items = storeCart.items;
  const total = calculateTotal(storeCart);
  const savings = calculateSavings(storeCart);

  return (
    <Card
      className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
      styles={{
        body: { padding: 0 }
      }}
    >
      {/* Store Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-5">
        <div className="flex items-center gap-4">
          <img 
            src={store.logo} 
            alt={store.storeName}
            className="w-14 h-14 rounded-2xl border-4 border-white/20 shadow-lg object-cover"
          />
          <div className="flex-1">
            <Title level={4} className="!text-white !mb-1">
              {store.storeName}
            </Title>
            <div className="flex mt-4  items-center gap-5">
              <Badge 
                count={items.length} 
                showZero 
                color="blue"
                className="!bg-white/20 backdrop-blur-sm"
              >
                <Text className="!text-white/90">{items.length} items</Text>
              </Badge>
              {savings > 0 && (
                <Tag color="green" className="!m-0 !border-0">
                  🎉 You save ₹{savings.toFixed(2)}
                </Tag>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-gray-100">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative">


                    {

                      console.log(item)
                    }
                    <Image
                      src={ import.meta.env.VITE_API_URL +   item.images?.[0]?.url || '/default-product.png'}
                      alt={item.name}
                      className="!w-24 !h-24 !rounded-xl !object-cover !shadow-md"
                      preview={false}
                      fallback="https://via.placeholder.com/96x96?text=No+Image"
                    />
                    {item.comparePrice && item.comparePrice > item.price && (
                      <div className="absolute -top-2 -right-2">
                        <Tag color="red" className="!m-0 !text-xs font-bold">
                          SAVE {Math.round((1 - item.price / item.comparePrice) * 100)}%
                        </Tag>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <Title level={5} className="!mb-1 !text-gray-900 line-clamp-2">
                          {item.name}
                        </Title>
                        <Text type="secondary" className="text-sm">
                          {item.category}
                        </Text>
                      </div>
                   
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                          <Button
                            type="text"
                            size="small"
                            icon={<Minus className="w-3 h-3" />}
                            onClick={() => onUpdateQuantity(store._id, item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="!w-6 !h-6 !min-w-6 !p-0"
                          />
                          <Text className="font-bold w-8 text-center">{item.quantity}</Text>
                          <Button
                            type="text"
                            size="small"
                            icon={<Plus className="w-3 h-3" />}
                            onClick={() => onUpdateQuantity(store._id, item._id, item.quantity + 1)}
                            className="!w-6 !h-6 !min-w-6 !p-0"
                          />
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Title level={4} className="!m-0 !text-green-600">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </Title>
                            {item.comparePrice && item.comparePrice > item.price && (
                              <Text delete type="secondary" className="!text-sm">
                                ₹{(item.comparePrice * item.quantity).toFixed(2)}
                              </Text>
                            )}
                          </div>
                          <Text type="secondary" className="!text-xs">
                            ₹{item.price} each
                          </Text>
                        </div>
                      </div>
                    </div>

                    {/* Variant Selection */}
                    {item.selectedVariant && (
                      <div className="mt-2">
                        <Tag color="blue" className="!m-0">
                          {item.selectedVariant.name}
                        </Tag>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Store Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-t">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div>
                <Title level={3} className="!m-0 !text-gray-900">
                  ₹{total.toFixed(2)}
                </Title>
                <Text type="secondary">Total amount</Text>
              </div>
              
              <div className="flex flex-1 items-center gap-2">
                {userLocation ? (
                  <Tag   color="success" className="!m-0">
                    Location Shared
                  </Tag>
                ) : (
                  <Tag icon={<MapPin className="w-3 h-3" />} color="warning" className="!m-0">
                    Enable Location
                  </Tag>
                )}
              </div>
            </div>
            
            {savings > 0 && (
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-green-600" />
                <Text type="success" className="!text-sm font-semibold">
                  You're saving ₹{savings.toFixed(2)} on this order!
                </Text>
              </div>
            )}
          </div>
          
          <Button
            type="primary"
            size="large"
            icon={<MessageCircle className="w-5 h-5" />}
            onClick={() => onCheckout(store._id)}
            className="!bg-gradient-to-r !from-green-600 !to-emerald-600 !border-0 !h-12 !px-8 !font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Checkout with WhatsApp
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Premium Cart Summary Component
const PremiumCartSummary = ({ cart, userLocation, onEnableLocation }) => {
  const storeIds = Object.keys(cart);
  const totalItems = getTotalCartItems(cart);
  const subtotal = storeIds.reduce((total, storeId) => total + calculateTotal(cart[storeId]), 0);
  const totalSavings = storeIds.reduce((savings, storeId) => savings + calculateSavings(cart[storeId]), 0);
  const deliveryFee = subtotal >= 500 ? 0 : 40;

  return (
    <Card
      className="border-0 shadow-xl sticky top-24"
      styles={{
        body: { padding: '24px' }
      }}
    >
      <Title level={4} className="!mb-6">Order Summary</Title>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <Text type="secondary">Free delivery on orders above ₹500</Text>
          <Text strong>₹{subtotal}/₹500</Text>
        </div>
        <Progress 
          percent={Math.min((subtotal / 500) * 100, 100)} 
          showInfo={false}
          strokeColor={{
            '0%': '#10b981',
            '100%': '#3b82f6',
          }}
        />
        {subtotal < 500 && (
          <Text type="secondary" className="!text-xs mt-1 block">
            Add ₹{(500 - subtotal).toFixed(2)} more for free delivery
          </Text>
        )}
      </div>

      <Divider className="!my-4" />

      {/* Order Details */}
      <Space direction="vertical" size="middle" className="w-full">
        <div className="flex justify-between">
          <Text>Items ({totalItems})</Text>
          <Text>₹{subtotal.toFixed(2)}</Text>
        </div>
        
        {totalSavings > 0 && (
          <div className="flex justify-between">
            <Text type="success">You Save</Text>
            <Text type="success">-₹{totalSavings.toFixed(2)}</Text>
          </div>
        )}
        
        <div className="flex justify-between">
          <Text>Delivery Fee</Text>
          <Text>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</Text>
        </div>
        
        <Divider className="!my-2" />
        
        <div className="flex justify-between text-lg font-bold">
          <Text>Total Amount</Text>
          <Text className="text-green-600">₹{(subtotal + deliveryFee).toFixed(2)}</Text>
        </div>
      </Space>

      <Divider className="!my-4" />

      {/* Benefits */}
      <Space direction="vertical" size="small" className="w-full">
        <div className="flex items-center gap-3 text-sm">
          <Shield className="w-4 h-4 text-green-600" />
          <Text type="secondary">Secure WhatsApp Ordering</Text>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-blue-600" />
          <Text type="secondary">Instant Order Confirmation</Text>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Truck className="w-4 h-4 text-orange-600" />
          <Text type="secondary">Fast Delivery</Text>
        </div>
      </Space>

      {/* Location Status */}
      <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <div className="flex items-center gap-3">
          {userLocation ? (
            <>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Navigation className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <Text strong className="!text-green-700">Location Shared</Text>
                <Text type="secondary" className="!text-xs block">
                  Store can track your delivery
                </Text>
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <Text strong className="!text-yellow-700">Enable Location</Text>
                <Text type="secondary" className="!text-xs block mb-2">
                  For accurate delivery tracking
                </Text>
                <Button
                  type="link"
                  size="small"
                  onClick={onEnableLocation}
                  className="!p-0 !h-auto !text-blue-600"
                >
                  Enable Location
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

// Premium Checkout Form Component
const PremiumCheckoutForm = ({ storeCart, userLocation, form, onFinish, onCancel }) => {
  const store = storeCart.storeInfo;
  const items = storeCart.items;
  const total = calculateTotal(storeCart);
  const savings = calculateSavings(storeCart);
  const deliveryFee = total >= 500 ? 0 : 40;

  return (
    <div className="premium-checkout-content">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4">
        <Title level={3} className="!text-white !mb-1">
          Complete Your Order
        </Title>
        <Text className="!text-white/90">Final step to place your order with {store.storeName}</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <div>
              <Title level={4} className="!mb-4">👤 Customer Details</Title>
              
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter your full name' }]}
              >
                <Input 
                  size="large" 
                  placeholder="Enter your full name"
                  prefix={<User className="text-gray-400" />}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  { pattern: /^[6-9]\d{9}$/, message: 'Please enter a valid phone number' }
                ]}
              >
                <Input 
                  size="large" 
                  placeholder="Enter your phone number"
                  prefix={<Phone className="text-gray-400" />}
                />
              </Form.Item>

              <Form.Item
                name="address"
                label="Delivery Address"
                rules={[{ required: true, message: 'Please enter your delivery address' }]}
              >
                <TextArea
                  rows={3}
                  placeholder="Enter complete delivery address with landmarks"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="landmark"
                label="Landmark (Optional)"
              >
                <Input 
                  size="large" 
                  placeholder="Nearby landmark for easy delivery"
                />
              </Form.Item>
            </div>

            <Divider />

            {/* Delivery & Payment */}
            <div>
              <Title level={4} className="!mb-4">🚚 Delivery & Payment</Title>
              
              <Form.Item
                name="deliveryTime"
                label="Delivery Preference"
                initialValue="asap"
                rules={[{ required: true, message: 'Please select delivery time' }]}
              >
                <Radio.Group className="w-full">
                  <Space direction="vertical" className="w-full">
                    <Radio value="asap" className="!py-2">
                      <div>
                        <Text strong>ASAP Delivery</Text>
                        <div className="text-sm text-gray-500">Get your order as soon as possible</div>
                      </div>
                    </Radio>
                    <Radio value="schedule" className="!py-2">
                      <div>
                        <Text strong>Schedule Later</Text>
                        <div className="text-sm text-gray-500">Choose your preferred delivery time</div>
                      </div>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                initialValue="cash_on_delivery"
                rules={[{ required: true, message: 'Please select payment method' }]}
              >
                <Radio.Group className="w-full">
                  <Space direction="vertical" className="w-full">
                    <Radio value="cash_on_delivery" className="!py-2">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <div>
                          <Text strong>Cash on Delivery</Text>
                          <div className="text-sm text-gray-500">Pay when you receive your order</div>
                        </div>
                      </div>
                    </Radio>
                    <Radio value="upi" className="!py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                          <Text className="!text-white text-xs font-bold">UPI</Text>
                        </div>
                        <div>
                          <Text strong>UPI Payment</Text>
                          <div className="text-sm text-gray-500">Pay now using UPI</div>
                        </div>
                      </div>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="instructions"
                label="Special Instructions (Optional)"
              >
                <TextArea
                  rows={2}
                  placeholder="Any special delivery instructions..."
                  size="large"
                />
              </Form.Item>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card
              className="border-0 shadow-lg sticky top-4"
              styles={{
                body: { padding: '20px' }
              }}
            >
              <Title level={4} className="!mb-4">📦 Order Summary</Title>
              
              {/* Store Info */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={store.logo} 
                  alt={store.storeName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <Text strong>{store.storeName}</Text>
                  <div className="text-sm text-gray-500">{items.length} items</div>
                </div>
              </div>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 mb-4">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <img 
                      src={ import.meta.env.VITE_API_URL+  item.images?.[0]?.url || '/default-product.png'} 
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <Text strong className="block text-sm truncate">{item.name}</Text>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Qty: {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <Text>Subtotal</Text>
                  <Text>₹{total.toFixed(2)}</Text>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between">
                    <Text type="success">You Save</Text>
                    <Text type="success">-₹{savings.toFixed(2)}</Text>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <Text>Delivery</Text>
                  <Text>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</Text>
                </div>
                
                <Divider className="!my-3" />
                
                <div className="flex justify-between text-lg font-bold">
                  <Text>Total Amount</Text>
                  <Text className="text-green-600">₹{(total + deliveryFee).toFixed(2)}</Text>
                </div>
              </div>

              {/* Location Status */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  {userLocation ? (
                    <>
                      <Navigation className="w-5 h-5 text-green-600" />
                      <div>
                        <Text strong className="!text-green-700">Location Shared</Text>
                        <Text type="secondary" className="!text-xs block">
                          Store can track your delivery
                        </Text>
                      </div>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5 text-yellow-600" />
                      <div>
                        <Text strong className="!text-yellow-700">Location Not Shared</Text>
                        <Text type="secondary" className="!text-xs block">
                          Enable location for better delivery
                        </Text>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  icon={<MessageCircle className="w-5 h-5" />}
                  className="!bg-gradient-to-r !from-green-600 !to-emerald-600 !border-0 !w-full !h-12 !font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Send Order via WhatsApp
                </Button>
                
                <Button
                  size="large"
                  onClick={onCancel}
                  className="!w-full !h-10 !text-gray-600 hover:!text-gray-800"
                >
                  Cancel Order
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Form>
    </div>
  );
};

// Premium Cart Skeleton
const PremiumCartSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
          <div>
            <div className="h-8 bg-gray-300 rounded animate-pulse w-48 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="border-0 shadow-xl animate-pulse">
              <div className="h-20 bg-gray-300 rounded-t-lg"></div>
              <div className="p-6 space-y-4">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-300 rounded-xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-xl animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default CartPage;
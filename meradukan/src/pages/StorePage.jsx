// src/pages/StorePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle,
  Star,
  Search,
  Share2,
  Filter,
  Eye,
  Plus
} from 'lucide-react';
import { 
  Card, 
  Button, 
  Input, 
  Select, 
  Pagination, 
  Spin, 
  Empty, 
  Badge, 
  Tag,
  Rate,
  Tooltip,
  Modal,
  notification,
  Row,
  Col,
  Space,
  Divider,
  Typography,
  Image,
  Skeleton,
  Popover
} from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import ShowSocial from '../components/ShowSocial';

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
const { Option } = Select;

const StorePage = () => {
  const { storeName } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [userLocation, setUserLocation] = useState(null);
  const [mobileId, setMobileId] = useState('');
  const [quickViewVisible, setQuickViewVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const pageSize = 12;

  // Generate or get mobile unique ID
  const getMobileId = useCallback(() => {
    let id = localStorage.getItem('mobileUniqueId');
    if (!id) {
      id = 'mobile_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('mobileUniqueId', id);
    }
    setMobileId(id);
    return id;
  }, []);

  // TanStack Query for store data
  const { data: store, isLoading: storeLoading, error: storeError } = useQuery({
    queryKey: ['store', storeName],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/store/name/${storeName}`);
      return response?.data?.data;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // TanStack Query for products
  const { 
    data: productsData, 
    isLoading: productsLoading, 
    isFetching: productsFetching 
  } = useQuery({
    queryKey: ['products', storeName, currentPage, searchTerm, selectedCategory, sortBy, mobileId],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/store/${storeName}/products`, {
        params: {
          page: currentPage,
          limit: pageSize,
          search: searchTerm,
          category: selectedCategory === 'all' ? '' : selectedCategory,
          sort: sortBy,
          mobileId: mobileId
        }
      });
      return response.data.data;
    },
    enabled: !!store && !!mobileId,
    keepPreviousData: true,
  });

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: (productId) => 
      axios.post(`${import.meta.env.VITE_API_URL}/api/store/products/${productId}/like`, { mobileId }),
    onSuccess: (_, productId) => {
      queryClient.setQueryData(
        ['products', storeName, currentPage, searchTerm, selectedCategory, sortBy, mobileId],
        (oldData) => ({
          ...oldData,
          products: oldData.products.map(product => 
            product._id === productId ? {
              ...product,
              likes: product.likedByMobile?.includes(mobileId) ? product.likes - 1 : product.likes + 1,
              likedByMobile: product.likedByMobile?.includes(mobileId) 
                ? product.likedByMobile.filter(id => id !== mobileId)
                : [...(product.likedByMobile || []), mobileId]
            } : product
          )
        })
      );
    },
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Failed to like product',
        placement: 'topRight',
      });
    }
  });

  // Get user location
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      notification.warning({
        message: 'Location Unavailable',
        description: 'Your browser does not support geolocation',
        placement: 'topRight',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        notification.success({
          message: 'Location Access Granted',
          description: 'Store recommendations optimized for your location',
          placement: 'topRight',
        });
      },
      (error) => {
        notification.error({
          message: 'Location Access Denied',
          description: 'Enable location for better experience',
          placement: 'topRight',
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, []);

  useEffect(() => {
    const id = getMobileId();
    setMobileId(id);
    getUserLocation();
  }, [getMobileId, getUserLocation]);

  // Handle store error
  useEffect(() => {
    if (storeError) {
      notification.error({
        message: 'Store Not Found',
        description: 'The store you are looking for does not exist',
        placement: 'topRight',
      });
      navigate('/');
    }
  }, [storeError, navigate]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const storeCart = cart[store._id] || { items: [], storeInfo: store };
    
    const existingItem = storeCart.items.find(item => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      storeCart.items.push({
        ...product,
        quantity: 1,
        selectedVariant: product.variants?.[0] || null
      });
    }
    
    cart[store._id] = storeCart;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Trigger cart update event
    window.dispatchEvent(new Event('cartUpdated'));
    
    notification.success({
      message: 'Added to Cart',
      description: `${product.name} has been added to your cart`,
      placement: 'topRight',
      duration: 2,
    });
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setQuickViewVisible(true);
  };

  const categories = store?.categories?.filter(cat => cat.isActive) || [];

  if (storeLoading) {
    return <PremiumStoreSkeleton />;
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 120 }}
          description={
            <span className="text-gray-600 text-lg">Store not found</span>
          }
        >
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600"
          >
            Go Home
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="  bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Store Header */}
      <PremiumStoreHeader 
        store={store} 
        userLocation={userLocation}
        onEnableLocation={getUserLocation}
      />

      {/* Store Info */}
      <PremiumStoreInfo store={store} />

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div>
                <Title level={2} className="!mb-2 !text-gray-900">
                  Our Products
                </Title>
                <Text type="secondary" className="text-lg">
                  {productsData?.total || 0} amazing products available
                </Text>
              </div>
              
              <Space size="middle" wrap className="w-full lg:w-auto">
                {/* Search */}
                <Input
                  placeholder="Search products..."
                  prefix={<Search className="text-gray-400" size={16} />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full lg:w-64"
                  size="large"
                  allowClear
                />

                {/* Category Filter */}
                <Select
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  className="w-full lg:w-40"
                  size="large"
                  suffixIcon={<Filter size={16} />}
                >
                  <Option value="all">All Categories</Option>
                  {categories.map(category => (
                    <Option key={category._id} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>

                {/* Sort Filter */}
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-full lg:w-48"
                  size="large"
                >
                  <Option value="latest">Latest</Option>
                  <Option value="popular">Most Popular</Option>
                  <Option value="price-low">Price: Low to High</Option>
                  <Option value="price-high">Price: High to Low</Option>
                  <Option value="most-liked">Most Liked</Option>
                </Select>
              </Space>
            </div>

            <Divider className="!my-6" />
          </div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            {productsLoading || productsFetching ? (
              <PremiumProductsGridSkeleton />
            ) : (
              <motion.div
                key="products-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Row gutter={[24, 24]} className="mb-8">
                  {productsData?.products?.map((product, index) => (
                    <Col xs={24} sm={12} lg={8} xl={6} key={product._id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <PremiumProductCard 
                          product={product}
                          mobileId={mobileId}
                          onAddToCart={addToCart}
                          onToggleLike={likeMutation.mutate}
                          onQuickView={handleQuickView}
                        />
                      </motion.div>
                    </Col>
                  ))}
                </Row>

                {(!productsData?.products || productsData.products.length === 0) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      description={
                        <span className="text-gray-600 text-lg">
                          No products found matching your criteria
                        </span>
                      }
                      className="py-12"
                    >
                      <Button 
                        type="primary" 
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                          setSortBy('latest');
                        }}
                      >
                        Clear Filters
                      </Button>
                    </Empty>
                  </motion.div>
                )}

                {/* Pagination */}
                {productsData?.total > pageSize && (
                  <div className="flex justify-center mt-12">
                    <Pagination
                      current={currentPage}
                      total={productsData.total}
                      pageSize={pageSize}
                      onChange={setCurrentPage}
                      showSizeChanger={false}
                      showQuickJumper
                      showTotal={(total, range) => 
                        `${range[0]}-${range[1]} of ${total} items`
                      }
                      className="custom-pagination"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <Modal
        open={quickViewVisible}
        onCancel={() => setQuickViewVisible(false)}
        footer={null}
        width={800}
        centered
        className="quick-view-modal"
      >
        {selectedProduct && <QuickView product={selectedProduct} onAddToCart={addToCart} />}
      </Modal>

      {/* Floating Cart Button */}
      <PremiumFloatingCartButton store={store} />

<ShowSocial store={store}   />
      <Footer isWhatsappShow={false}   />
    </div>
  );
};

 


const PremiumStoreHeader = ({ store, userLocation, onEnableLocation }) => {
  const bannerUrl = store.banner || 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
  
 

  return (
    <div style={{
      position: 'relative',
      height: '320px',
      width: '100%',
      overflow: 'hidden',
      background: 'linear-gradient(to right, #2563eb, #7c3aed)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }}>
      {/* Banner Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url('${bannerUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        zIndex: 1
      }} />
      
      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 2
      }} />
      
      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to right, rgba(37, 99, 235, 0.6), rgba(124, 58, 237, 0.4))',
        zIndex: 3
      }} />
      
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px'
          }}>
            
            {/* Logo and Store Info Row */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '32px',
              width: '100%'
            }}>
              
              {/* Logo */}
              <div style={{
                flexShrink: 0
              }}>
                <img 
                  src={store.logo} 
                  alt={store.storeName}
                  style={{
                    width: '112px',
                    height: '112px',
                    borderRadius: '16px',
                    border: '4px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    objectFit: 'cover',
                    backdropFilter: 'blur(8px)'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/112x112/3B82F6/FFFFFF?text=LOGO';
                  }}
                />
              </div>
              
              {/* Store Info */}
              <div style={{
                flex: 1,
                textAlign: 'left'
              }}>
                {/* Store Name */}
                {/* <h1 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  margin: '0 0 12px 0',
                  color: 'white',
                  lineHeight: 1.2
                }}>
                  {store.storeName}
                </h1> */}
                


<Popover
      content={<span style={{ fontSize: "18px", fontWeight: 600 }}>{store.storeName}</span>}
      title="Full Store Name"
      trigger="click"
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          margin: "0 0 12px 0",
          color: "white",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer",
          maxWidth: "90%",  
        }}
      >
        {store.storeName}
      </h1>
    </Popover>






                {/* Store Description */}
                {/* <p style={{
                  fontSize: '20px',
                  opacity: 0.95,
                  margin: '0 0 24px 0',
                  maxWidth: '640px',
                  lineHeight: 1.6
                }}>
                  {store.description}
                </p> */}
                



   <Popover
      content={
        <div
          style={{
            maxWidth: "400px",
            fontSize: "16px",
            lineHeight: 1.6,
            wordBreak: "break-word",
          }}
        >
          {store.description}
        </div>
      }
      title="Full Description"
      trigger="click"
    >
      <p
        style={{
          fontSize: "20px",
          opacity: 0.95,
          margin: "0 0 24px 0",
          maxWidth: "640px",
          lineHeight: 1.6,
          display: "-webkit-box",
          WebkitLineClamp: 2, // show max 2 lines
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer",
        }}
      >
        {store.description}
      </p>
    </Popover>






                {/* Stats Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  marginBottom: '16px',
                  flexWrap: 'wrap'
                }}>
                  
                  {/* Rating */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    padding: '8px 16px',
                    borderRadius: '9999px'
                  }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} style={{
                          color: star <= Math.floor(store.metadata?.storeRating || 4.5) ? '#fbbf24' : '#d1d5db',
                          fontSize: '14px'
                        }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span style={{
                      fontWeight: 600,
                      fontSize: '14px'
                    }}>
                      ({store.metadata?.storeRating || 4.5})
                    </span>
                  </div>
                  
                  {/* Products Count */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 12px',
                    borderRadius: '9999px'
                  }}>
                    <span style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      borderRadius: '9999px',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {store.metadata?.totalProducts || 0}
                    </span>
                    <span style={{ fontSize: '14px' }}>Products</span>
                  </div>
                  
                  {/* Orders Count */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 12px',
                    borderRadius: '9999px'
                  }}>
                    <span style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      borderRadius: '9999px',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {store.metadata?.totalOrders || 0}
                    </span>
                    <span style={{ fontSize: '14px' }}>Orders</span>
                  </div>
                </div>
                
                {/* Location Section */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  {userLocation ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '15px',
                      fontWeight: 500
                    }}>
                      <span>📍</span>
                      <span>Location Available</span>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        padding: '6px 6px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 500
                      }}>
                        <span>📍</span>
                        <span>Location Required</span>
                      </div>
                     
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debug: Hidden image to test loading */}
      <img 
        src={bannerUrl} 
        alt="debug" 
        style={{
          position: 'absolute',
          top: -9999,
          left: -9999,
          width: '1px',
          height: '1px',
          opacity: 0
        }}
        onLoad={() => console.log('✅ Banner image loaded successfully!')}
        onError={() => console.log('❌ Banner image failed to load!')}
      />
    </div>
  );
};

// Premium Store Info Component
const PremiumStoreInfo = ({ store }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 shadow-sm"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Row gutter={[16, 16]} justify="space-around">
        <Col xs={24} sm={12} md={6}>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <Text strong>Timing</Text>
              <br />
              <Text type="secondary">{store.workingHours.opening} - {store.workingHours.closing}</Text>
            </div>
          </div>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="p-2 bg-green-100 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <Text strong>Call Us</Text>
              <br />
              <Text type="secondary">{store.contact.phone|| +91123456789}</Text>
            </div>
          </div>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <Text strong>WhatsApp</Text>
              <br />
              <Text type="secondary">{store.contact.whatsapp}</Text>
            </div>
          </div>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="p-2 bg-red-100 rounded-lg">
              <MapPin className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <Text strong>Location</Text>
              <br />
              <Text type="secondary" ellipsis>{store.address.city}</Text>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </motion.div>
);

 


const PremiumProductCard = ({ product, mobileId, onAddToCart, onToggleLike, onQuickView }) => {
  const isLiked = product.likedByMobile?.includes(mobileId);
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  
  // State for cart quantity to enable real-time updates
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Check if product is already in cart - with real-time updates
  const getCartQuantity = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const storeCart = cart[product.storeId];
    if (storeCart) {
      const cartItem = storeCart.items.find(item => item._id === product._id);
      return cartItem ? cartItem.quantity : 0;
    }
    return 0;
  };

  // Update cart quantity on component mount and when cart changes
  useEffect(() => {
    const updateCartQuantity = () => {
      setCartQuantity(getCartQuantity());
    };

    // Initial calculation
    updateCartQuantity();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartQuantity);
    
    // Cleanup
    return () => {
      window.removeEventListener('cartUpdated', updateCartQuantity);
    };
  }, [product._id, product.storeId]);

  const isInCart = cartQuantity > 0;
 
  // Enhanced add to cart function with loading state and toast
  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      await onAddToCart(product);
      
      // Show success toast
      toast.success(
   
 `${product.name} has been added to your cart`,
     
       
      );
      
      // Force immediate UI update
      setCartQuantity(getCartQuantity());
      
    } catch (error) {
      toast.error( 
     'Could not add item to cart. Please try again.'
      )
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle increment quantity
  const handleIncrement = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart(product);
      setCartQuantity(getCartQuantity());
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col"
        bodyStyle={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}
        cover={
          <div className="relative overflow-hidden h-60">
            <Image
              alt={product.name}
              src={import.meta.env.VITE_API_URL+ primaryImage?.url || '/default-product.png'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              preview={false}
              fallback="https://via.placeholder.com/300x200?text=No+Image"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Space size="small">
                <Tooltip title="Quick View">
                  <Button
                    type="primary"
                    ghost
                    size="large"
                    icon={<Eye size={18} />}
                    onClick={() => onQuickView(product)}
                    className="backdrop-blur-sm border-white text-white hover:!bg-white/20"
                  />
                </Tooltip>
                <Tooltip title="Add to Cart">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCart size={18} />}
                    onClick={handleAddToCart}
                    loading={isAddingToCart}
                    className="backdrop-blur-sm"
                  >
                    Add to Cart
                  </Button>
                </Tooltip>
              </Space>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isFeatured && (
                <Badge.Ribbon 
                  text="FEATURED" 
                  color="red" 
                  className="!text-xs font-bold"
                  style={{ fontSize: '10px' }}
                >
                  <div></div>
                </Badge.Ribbon>
              )}
              {product.stock === 0 && (
                <Tag color="error" className="!m-0 font-semibold text-xs py-1">
                  OUT OF STOCK
                </Tag>
              )}
              {product.discountPercentage > 0 && (
                <Tag color="green" className="!m-0 font-bold text-xs py-1">
                  {product.discountPercentage}% OFF
                </Tag>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Tooltip title={isLiked ? 'Remove from favorites' : 'Add to favorites'}>
                <Button
                  type="text"
                  shape="circle"
                  icon={
                    <Heart 
                      size={18} 
                      className={isLiked ? 'fill-red-500 text-red-500' : 'text-white'} 
                    />
                  }
                  onClick={() => onToggleLike(product._id)}
                  className="!text-white bg-black/50 backdrop-blur-sm hover:!bg-red-500/20 hover:!scale-110 transition-all duration-200"
                  size="large"
                />
              </Tooltip>
            </div>

            {/* Stock Indicator */}
            {product.stock > 0 && product.stock <= 10 && (
              <div className="absolute bottom-3 left-3">
                <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  🚨 Only {product.stock} left!
                </div>
              </div>
            )}

            {/* Cart Quantity Badge on Image */}
            {isInCart && (
              <div className="absolute bottom-3 right-3">
                <Badge 
                  count={cartQuantity} 
                  color="green" 
                  className="!font-bold shadow-lg"
                  size="default"
                />
              </div>
            )}
          </div>
        }
      >
        {/* Product Info */}
        <div className="flex-1">
          <Meta
            title={
              <Text 
                ellipsis={{ tooltip: product.name }} 
                className="!text-lg !font-bold !text-gray-900 !mb-2 line-clamp-2"
                style={{ minHeight: '56px', display: 'block' }}
              >
                {product.name}
              </Text>
            }
            description={
              <div className="space-y-3">
                <Paragraph 
                  ellipsis={{ rows: 2, tooltip: product.description }}
                  className="!text-gray-600 !text-sm !mb-3 leading-relaxed"
                >
                  {product.description}
                </Paragraph>
                
                {/* Category */}
                {product.category && (
                  <Tag color="blue" className="!text-xs !m-0">
                    {product.category}
                  </Tag>
                )}
                
                {/* Price Section */}
                <div className="flex items-center gap-2 mb-2">
                  <Title level={3} className="!m-0 !text-green-600 !font-bold">
                    ₹{product.price?.toLocaleString()}
                  </Title>
                  {product.comparePrice && product.comparePrice > product.price && (
                    <div className="flex flex-col">
                      <Text delete type="secondary" className="!text-sm !text-gray-500">
                        ₹{product.comparePrice?.toLocaleString()}
                      </Text>
                      {product.discountPercentage > 0 && (
                        <Text className="!text-xs !text-green-600 !font-bold">
                          Save {Math.round((1 - product.price / product.comparePrice) * 100)}%
                        </Text>
                      )}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center text-xs">
                  <Space size="middle">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Heart size={12} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} />
                      <Text type="secondary" className="!text-xs">
                        {product.likes || 0}
                      </Text>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Star size={12} className="text-yellow-500" />
                      <Text type="secondary" className="!text-xs">
                        {product.salesCount || 0} sold
                      </Text>
                    </div>
                  </Space>
                  
                  {/* Rating */}
                  {product.averageRating > 0 && (
                    <div className="flex items-center gap-1">
                      <Rate 
                        disabled 
                        defaultValue={product.averageRating} 
                        className="!text-xs" 
                        style={{ fontSize: '12px' }}
                      />
                      <Text className="!text-xs !text-gray-500">
                        ({product.reviewCount || 0})
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            }
          />
        </div>

        {/* Add to Cart Button - Fixed at Bottom */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          {product.stock > 0 ? (
            <div className="space-y-2">
              {isInCart ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Button
                      type="default"
                      size="small"
                      icon={<ShoppingCart size={14} />}
                      className="!border-green-500 !text-green-600 hover:!border-green-600 hover:!text-green-700"
                      onClick={() => navigate('/cart')}
                    >
                      Cart
                    </Button>
                    <Badge 
                      count={cartQuantity} 
                      color="green" 
                      className="!font-bold"
                      showZero
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Tooltip title="Add one more">
                      <Button
                        type="primary"
                        size="small"
                        onClick={handleIncrement}
                        loading={isAddingToCart}
                        className="!bg-green-600 !border-green-600 hover:!bg-green-700 !w-8 !h-8 !min-w-8"
                        icon={<Plus size={12} />}
                      />
                    </Tooltip>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCart size={16} />}
                    onClick={handleAddToCart}
                    loading={isAddingToCart}
                    className="w-full !bg-gradient-to-r !from-blue-600 !to-purple-600 !border-0 hover:!from-blue-700 hover:!to-purple-700 !h-10 !font-bold shadow-md hover:shadow-lg transition-all duration-300"
                    block
                  >
                    {isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
                  </Button>
                </motion.div>
              )}
              
              {/* Quick Actions */}
              {/* <div className="flex gap-2">
                <Button
                  type="default"
                  size="small"
                  icon={<Eye size={14} />}
                  onClick={() => onQuickView(product)}
                  className="flex-1 !text-gray-600 hover:!text-blue-600 hover:!border-blue-600"
                >
                  Quick View
                </Button>
                <Tooltip title={isLiked ? 'Remove from favorites' : 'Add to favorites'}>
                  <Button
                    type="default"
                    size="small"
                    icon={
                      <Heart 
                        size={14} 
                        className={isLiked ? 'fill-red-500 text-red-500' : ''} 
                      />
                    }
                    onClick={() => onToggleLike(product._id)}
                    className={`${
                      isLiked 
                        ? '!border-red-500 !text-red-500 hover:!bg-red-50' 
                        : '!text-gray-600 hover:!text-red-500 hover:!border-red-300'
                    }`}
                  >
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                </Tooltip>
              </div> */}
            </div>
          ) : (
            <Button
              type="default"
              size="large"
              disabled
              className="w-full !text-gray-400 !border-gray-300 !bg-gray-100 !h-10 !font-bold"
              block
            >
              OUT OF STOCK
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};









// Quick View Component
const QuickView = ({ product, onAddToCart }) => {
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  return (
    <div className="p-4">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Image
            src={  import.meta.env.VITE_API_URL +      primaryImage?.url || '/default-product.png'}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg"
            preview={{
              mask: <Eye className="text-white" />,
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Title level={3}>{product.name}</Title>
          <Paragraph className="text-gray-600 text-lg">
            {product.description}
          </Paragraph>
          
          <div className="mb-4">
            <Title level={2} className="!text-blue-600 !mb-1">
              ₹{product.price}
            </Title>
            {product.comparePrice && product.comparePrice > product.price && (
              <Text delete type="secondary" className="!text-lg">
                ₹{product.comparePrice}
              </Text>
            )}
          </div>

          <Space size="middle" className="mb-4">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-red-500" />
              <Text strong>{product.likes || 0} likes</Text>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-500" />
              <Text strong>{product.salesCount || 0} sold</Text>
            </div>
          </Space>

          {product.stock > 0 ? (
            <Button 
              type="primary" 
              size="large" 
              icon={<ShoppingCart />}
              onClick={() => onAddToCart(product)}
              className="w-full mb-2"
            >
              Add to Cart
            </Button>
          ) : (
            <Button type="default" size="large" disabled className="w-full">
              Out of Stock
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

// Premium Floating Cart Button
const PremiumFloatingCartButton = ({ store }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const storeCart = cart[store._id];
    const count = storeCart ? storeCart.items.reduce((total, item) => total + item.quantity, 0) : 0;
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, [store._id]);

  if (cartCount === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Badge count={cartCount} size="default" offset={[-5, 5]}>
        <Tooltip title={`View Cart (${cartCount} items)`} placement="left">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<ShoppingCart size={20} />}
            onClick={() => window.location.href = '/cart'}
            className="!w-14 !h-14 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 border-0"
          />
        </Tooltip>
      </Badge>
    </motion.div>
  );
};

// Premium Skeleton Components
const PremiumStoreSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    {/* Banner Skeleton */}
    <div className="h-80 bg-gray-300">
      <Skeleton.Node active className="!w-full !h-full !rounded-none" />
    </div>
    
    {/* Store Info Skeleton */}
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Row gutter={[16, 16]} justify="space-around">
          {[...Array(4)].map((_, i) => (
            <Col xs={24} sm={12} md={6} key={i}>
              <Skeleton active paragraph={{ rows: 1 }} />
            </Col>
          ))}
        </Row>
      </div>
    </div>

    {/* Products Skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PremiumProductsGridSkeleton />
    </div>
  </div>
);

const PremiumProductsGridSkeleton = () => (
  <Row gutter={[24, 24]}>
    {[...Array(8)].map((_, index) => (
      <Col xs={24} sm={12} lg={8} xl={6} key={index}>
        <Card className="border-0 shadow-lg">
          <Skeleton.Image active className="!w-full !h-60" />
          <Skeleton active paragraph={{ rows: 3 }} className="!mt-4" />
        </Card>
      </Col>
    ))}
  </Row>
);

export default StorePage;
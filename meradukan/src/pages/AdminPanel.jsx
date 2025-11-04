import React, { useState, useEffect } from 'react';
import { 
  ShopOutlined,
  ProductOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QrcodeOutlined,
  WhatsAppOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  BankOutlined,
  CreditCardOutlined,
  UploadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  LikeOutlined,
  ShareAltOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  MenuOutlined,
  CloseOutlined,
  LoadingOutlined,
  CompassOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { 
  Skeleton, 
  Card, 
  Input, 
  Button, 
  Select, 
  Switch, 
  Upload, 
  message,
  Tabs,
  Form,
  Row,
  Col,
  Modal,
  QRCode,
  Image,
  Table,
  Tag,
  Space,
  Tooltip,
  Divider,
  InputNumber,
  Checkbox,
  Drawer,
  Badge,
  Alert,
  Spin
} from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [storeStatus, setStoreStatus] = useState(true);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Fetch store data
  const { data: storeData, refetch: storeRefetch, isLoading } = useQuery({
    queryKey: ['store'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/store/my-store`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStoreStatus(response.data.data.isActive);
      return response.data.data;
    },
    enabled: !!localStorage.getItem('token')
  });

  // Fetch products
  const { data: productsData, refetch: productRefetch, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.data;
    },
    enabled: !!localStorage.getItem('token')
  });

  // Update store mutation
  const updateStoreMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_BASE_URL}/store/update-store`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Store updated successfully');
      storeRefetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update store');
    }
  });

  // Toggle store status mutation
  const toggleStoreStatusMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${API_BASE_URL}/store/toggle-status`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    onSuccess: (data) => {
      setStoreStatus(data.data.isActive);
      toast.success(`Store ${data.data.isActive ? 'activated' : 'deactivated'} successfully`);
      storeRefetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to toggle store status');
    }
  });

  // Add category mutation
  const addCategoryMutation = useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/store/add-category`, 
        formData, 
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Category added successfully');
      storeRefetch();
      setIsModalVisible(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add category');
    }
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (categoryId) => {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_BASE_URL}/store/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Category deleted successfully');
      storeRefetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  });

  // Generate QR code mutation
  const generateQrMutation = useMutation({
    mutationFn: async (url) => {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/store/generate-qr`, 
        { storeUrl: url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('QR code generated successfully');
      storeRefetch();
      setQrModalVisible(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to generate QR code');
    }
  });

  // Upload QR code mutation
  const uploadQrMutation = useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/store/upload-qr`, 
        formData, 
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            
          } 
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('QR code uploaded successfully');
      storeRefetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to upload QR code');
    }
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: async (formData) => {
        console.log(...formData)
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/products`, 
        formData, 
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Product created successfully');
      productRefetch();
      setIsProductModalVisible(false);
      setEditingProduct(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create product');
    }
  });

  // Toggle product status mutation
  const toggleProductStatusMutation = useMutation({
    mutationFn: async (productId) => {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${API_BASE_URL}/products/${productId}/toggle-status`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Product status updated successfully');
      productRefetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update product status');
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleAddCategory = (values) => {
    const formData = new FormData();
    formData.append('name', values.categoryName);
    formData.append('description', values.description || '');
    if (values.image && values.image.file) {
      formData.append('image', values.image.file);
    }
    addCategoryMutation.mutate(formData);
  };

  const handleDeleteCategory = (categoryId) => {
 
        deleteCategoryMutation.mutate(categoryId);
    
  };

  const handleStoreUpdate = (values) => {
    // const formData = new FormData();
    // console.log(values)
    // // Append all form data
    // Object.keys(values).forEach(key => {
    //   if (key === 'banner' || key === 'logo') {
    //     if (values[key] && values[key].file) {
    //       formData.append(key, values[key].file);
    //     }
    //   } else if (typeof values[key] === 'object') {
    //     formData.append(key, JSON.stringify(values[key]));
    //   } else {
    //     formData.append(key, values[key]);
    //   }
    // });

    updateStoreMutation.mutate(values);
  };

  const handleCreateProduct = (values) => {
    const formData = new FormData();
    
    // Append basic fields
    Object.keys(values).forEach(key => {
      if (key === 'images') {
        // Handle multiple images
        values.images?.fileList?.forEach((file, index) => {
          formData.append('images', file.originFileObj);
        });
      } else if (key === 'variants') {
        formData.append('variants', JSON.stringify(values.variants));
      } else if (key === 'attributes') {
        formData.append('attributes', JSON.stringify(values.attributes));
      } else {
        formData.append(key, values[key]);
      }
    });

    createProductMutation.mutate(formData);
  };

  const handlePincodeChange = async (pincode, form) => {
    if (pincode.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        
        if (response.data[0].Status === 'Success' && response.data[0].PostOffice) {
          const postOffice = response.data[0].PostOffice[0];
          const city = postOffice.District;
          const state = postOffice.State;
          
          // Update form fields
          form.setFieldsValue({
            address: {
              city: city,
              state: state
            }
          });
          toast.success(`Address auto-filled: ${city}, ${state}`);
        } else {
          toast.error('Invalid pincode or no data found');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        toast.error('Error fetching address details');
      }
    }
  };

  const getCurrentLocation = (form) => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    toast.loading('Getting your location...', { id: 'location' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Update form fields
        form.setFieldsValue({
          address: {
            latitude: latitude,
            longitude: longitude
          }
        });
        
        toast.success('Location detected successfully!', { id: 'location' });
        
        // Reverse geocode to get address
        reverseGeocode(latitude, longitude, form);
      },
      (error) => {
        let errorMessage = 'Error getting location: ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'User denied the request for Geolocation.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'The request to get user location timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
        }
        toast.error(errorMessage, { id: 'location' });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const reverseGeocode = async (latitude, longitude, form) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
          'accept-language': 'en'
        }
      });

      if (response.data) {
        const address = response.data.address;
        const updates = {};
        
        if (address.road) updates.address1 = address.road;
        if (address.city || address.town || address.village) {
          updates.city = address.city || address.town || address.village;
        }
        if (address.state) updates.state = address.state;
        if (address.postcode) updates.pincode = address.postcode;
        if (address.country) updates.country = address.country;

        // Update form fields
        form.setFieldsValue({
          address: {
            ...form.getFieldValue('address'),
            ...updates
          }
        });

        toast.success('Address auto-filled from location');
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      toast.error('Could not fetch address details from location');
    }
  };

  const handleGenerateQR = () => {
    if (!storeUrl) {
      toast.error('Please enter store URL');
      return;
    }
    generateQrMutation.mutate(storeUrl);
  };

  // const handleUploadQR = (file) => {
  //   const formData = new FormData();
  //   formData.append('qrCode', file);
  //   uploadQrMutation.mutate(formData);
  //   return false; // Prevent default upload
  // };














  const [uploadLoading, setUploadLoading] = useState(false);

 const handleUploadQR = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // same multer field name as backend

    try {
      setUploadLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        const qrUrl = res.data.fileUrl;
        uploadQrMutation.mutate({qrUrl});
      } else {
        message.error("Failed to upload QR Code");
      }
    } catch (error) {
      console.error(error);
      message.error("Error uploading QR Code");
    } finally {
      setUploadLoading(false);
    }

    return false; 
  };














  const handleTabChange = (key) => {
    setActiveTab(key);
    if (isMobile) {
      setMobileDrawerVisible(false);
    }
  };

  const productColumns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <Image
            width={50}
            height={50}
            src={record.images?.[0]?.url ? `${API_BASE_URL.replace('/api', '')}${record.images[0].url}` : '/statics/product-placeholder.jpg'}
            alt={text}
            className="rounded-lg object-cover"
            fallback="/statics/product-placeholder.jpg"
          />
          <div className="min-w-0 flex-1">
            <div className="font-medium truncate">{text}</div>
            <div className="text-sm text-gray-500 truncate">{record.category}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price}`,
      responsive: ['md'],
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <Tag color={stock > 0 ? 'green' : 'red'}>
          {stock > 0 ? `${stock} in stock` : 'Out of stock'}
        </Tag>
      ),
      responsive: ['md'],
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => toggleProductStatusMutation.mutate(record._id)}
          size="small"
        />
      ),
      responsive: ['md'],
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      key: 'likes',
      render: (likes) => (
        <div className="flex items-center space-x-1">
          <LikeOutlined className="text-red-500" />
          <span>{likes}</span>
        </div>
      ),
      responsive: ['lg'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => {
              setEditingProduct(record);
              setIsProductModalVisible(true);
            }}
          >
            {isMobile ? '' : 'Edit'}
          </Button>
        </Space>
      ),
    },
  ];

  const menuItems = [
    { key: '1', icon: <ShopOutlined />, label: 'Store Info', badge: null },
    { key: '2', icon: <ProductOutlined />, label: 'Products', badge: productsData?.products?.length || 0 },
    { key: '3', icon: <QrcodeOutlined />, label: 'QR Code', badge: null },
    { key: '4', icon: <BankOutlined />, label: 'Bank Details', badge: null },
    { key: '5', icon: <SettingOutlined />, label: 'Settings', badge: null }
  ];

  const renderSidebarContent = () => (
    <div className="space-y-2">
      {menuItems.map(item => (
        <div
          key={item.key}
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            activeTab === item.key 
              ? 'bg-green-500 text-white' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => handleTabChange(item.key)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
            {item.badge !== null && item.badge > 0 && (
              <Badge count={item.badge} size="small" />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  if (!localStorage.getItem('token')) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isMobile && (
                <Button 
                  type="text" 
                  icon={<MenuOutlined />}
                  onClick={() => setMobileDrawerVisible(true)}
                  className="lg:hidden"
                />
              )}
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
                <ShopOutlined />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-bold text-gray-800 truncate">Seller Dashboard</h1>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">Store:</span>
                <Switch
                  checked={storeStatus}
                  onChange={() => toggleStoreStatusMutation.mutate()}
                  loading={toggleStoreStatusMutation.isPending}
                  size="small"
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                />
              </div>
              <Button 
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="border-red-500 text-red-500 hover:bg-red-50 text-xs sm:text-sm"
                size={isMobile ? "small" : "middle"}
              >
                {isMobile ? '' : 'Logout'}
              </Button>
            </div>
          </div>

          {/* Mobile Store Status */}
          {isMobile && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <span className="text-sm text-gray-600">Store Status:</span>
              <Switch
                checked={storeStatus}
                onChange={() => toggleStoreStatusMutation.mutate()}
                loading={toggleStoreStatusMutation.isPending}
                size="small"
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton active paragraph={{ rows: 4 }} />
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Sidebar */}
            {!isMobile && (
              <div className="lg:col-span-1">
                <Card className="shadow-sm border-0 sticky top-24">
                  {renderSidebarContent()}
                </Card>
              </div>
            )}

            {/* Main Content */}
            <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-3'}`}>
              <Card className="shadow-sm border-0 min-h-[500px]">
                <Tabs 
                  activeKey={activeTab} 
                  onChange={handleTabChange}
                  items={[
                    {
                      key: '1',
                      label: (
                        <span className="flex items-center space-x-2">
                          <ShopOutlined />
                          <span className="hidden sm:inline">Store Info</span>
                        </span>
                      ),
                      children: (
                        <StoreInfoTab 
                          storeData={storeData} 
                          onUpdate={handleStoreUpdate}
                          updateMutation={updateStoreMutation}
                          onPincodeChange={handlePincodeChange}
                          onGetLocation={getCurrentLocation}
                        />
                      )
                    },
                    {
                      key: '2',
                      label: (
                        <span className="flex items-center space-x-2">
                          <ProductOutlined />
                          <span className="hidden sm:inline">Products</span>
                          {productsData?.products?.length > 0 && (
                            <Badge count={productsData.products.length} size="small" />
                          )}
                        </span>
                      ),
                      children: (
                        <ProductsTab 
                          storeData={storeData}
                          productsData={productsData}
                          productsLoading={productsLoading}
                          onAddCategory={() => setIsModalVisible(true)}
                          onAddProduct={() => {
                            setEditingProduct(null);
                            setIsProductModalVisible(true);
                          }}
                          onDeleteCategory={handleDeleteCategory}
                          onToggleProductStatus={toggleProductStatusMutation.mutate}
                          onEditProduct={(product) => {
                            setEditingProduct(product);
                            setIsProductModalVisible(true);
                          }}
                          productColumns={productColumns}
                          isMobile={isMobile}
                          deleteCategoryLoading={deleteCategoryMutation.isPending}
                        />
                      )
                    },
                    {
                      key: '3',
                      label: (
                        <span className="flex items-center space-x-2">
                          <QrcodeOutlined />
                          <span className="hidden sm:inline">QR Code</span>
                        </span>
                      ),
                      children: (
                        <QRCodeTab 
                          storeData={storeData} 
                          onGenerateQR={() => setQrModalVisible(true)}
                          onUploadQR={handleUploadQR}
                          uploadLoading={uploadQrMutation.isPending || uploadLoading   }
                        />
                      )
                    },
                    {
                      key: '4',
                      label: (
                        <span className="flex items-center space-x-2">
                          <BankOutlined />
                          <span className="hidden sm:inline">Bank Details</span>
                        </span>
                      ),
                      children: <BankDetailsTab />
                    },
                    {
                      key: '5',
                      label: (
                        <span className="flex items-center space-x-2">
                          <SettingOutlined />
                          <span className="hidden sm:inline">Settings</span>
                        </span>
                      ),
                      children: <SettingsTab />
                    }
                  ]}
                />
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex justify-around items-center py-2">
            {menuItems.map(item => (
              <button
                key={item.key}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors flex-1 mx-1 ${
                  activeTab === item.key 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
                onClick={() => handleTabChange(item.key)}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge !== null && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sidebar Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileDrawerVisible(false)}
        open={mobileDrawerVisible}
        width={280}
      >
        {renderSidebarContent()}
      </Drawer>

      {/* Add Category Modal */}
      <AddCategoryModal 
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onFinish={handleAddCategory}
        loading={addCategoryMutation.isPending}
      />

      {/* Add Product Modal */}
      <AddProductModal 
        visible={isProductModalVisible}
        editingProduct={editingProduct}
        storeData={storeData}
        onCancel={() => {
          setIsProductModalVisible(false);
          setEditingProduct(null);
        }}
        onFinish={handleCreateProduct}
        loading={createProductMutation.isPending}
      />

      {/* QR Code Modal */}
      <Modal
        title="Generate QR Code"
        open={qrModalVisible}
        onCancel={() => setQrModalVisible(false)}
        footer={null}
      >
        <div className="space-y-4">
          <Alert
            message="QR Code Generation"
            description="Enter your store URL to generate a QR code or upload your custom QR code image."
            type="info"
            showIcon
          />
          
          <Input
            placeholder="https://yourstore.com"
            value={storeUrl}
            onChange={(e) => setStoreUrl(e.target.value)}
            size="large"
          />
          
          <Button
            type="primary"
            onClick={handleGenerateQR}
            loading={generateQrMutation.isPending}
            block
            size="large"
          >
            Generate QR Code
          </Button>

          <Divider>OR</Divider>

          <Upload
            beforeUpload={handleUploadQR}
            accept="image/*"
            showUploadList={false}
          >
            <Button 
              icon={<UploadOutlined />} 
              block 
              size="large"
              loading={uploadQrMutation.isPending}
            >
              Upload Custom QR Code
            </Button>
          </Upload>
        </div>
      </Modal>
    </div>
  );
};

// Store Info Tab Component
const StoreInfoTab = ({ storeData, onUpdate, updateMutation, onPincodeChange, onGetLocation }) => {
  const [form] = Form.useForm();
console.log( storeData)
  const handleFormFinish = (values) => {
  
    onUpdate(values);
  };

  const handlePincodeBlur = (e) => {
    const pincode = e.target.value;
    if (pincode.length === 6) {
      onPincodeChange(pincode, form);
    }
  };

  const handleGetLocation = () => {
    onGetLocation(form);
  };

  // Get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('https')) return imagePath;
    return `${API_BASE_URL.replace('/api', '')}${imagePath}`;
  };








  const [loadingBanner, setLoadingBanner] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);

  const handleFileUpload = async (file, field) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      field === "banner" ? setLoadingBanner(true) : setLoadingLogo(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        form.setFieldsValue({ [field]: res.data.fileUrl });
        message.success(`${field} uploaded successfully!`);
      } else {
        message.error(`Failed to upload ${field}`);
      }
    } catch (error) {
      message.error(`Error uploading ${field}`);
    } finally {
      field === "banner" ? setLoadingBanner(false) : setLoadingLogo(false);
    }
  };









  return (
    <div className="p-1">
      <Form
        form={form}
        layout="vertical"
        initialValues={storeData}
        onFinish={handleFormFinish}
        encType="multipart/form-data"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Store Name" 
              name="storeName"
              rules={[{ required: true, message: 'Please enter store name' }]}
            >
              <Input size="large" placeholder="Enter store name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item 
              label="WhatsApp Number" 
              name={['contact', 'whatsapp']}
              rules={[{ required: true, message: 'Please enter WhatsApp number' }]}
            >
              <Input 
                size="large" 
                placeholder="+91 98765 43210" 
                prefix={<WhatsAppOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Store Description" name="description">
          <TextArea 
            rows={3}
            placeholder="Describe your store, products, and services..."
          />
        </Form.Item>

        {/* <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Store Banner" name="banner">
              <Upload
                listType="picture"
                beforeUpload={() => false}
                maxCount={1}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />} block={window.innerWidth < 768}>
                  {storeData?.banner ? 'Change Banner' : 'Upload Banner'}
                </Button>
              </Upload>
              {storeData?.banner && (
                <div className="mt-2">
                  <Image
                    src={getImageUrl(storeData.banner)}
                    alt="Current Banner"
                    className="w-full h-32 object-cover rounded-lg"
                    preview={false}
                    fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr5STtRwhRGtjmno8wvhTi0rklpxHIe44Vj6bBRRV_syAfsdinpR3bTwBPYbE9BZEQ7-k&usqp=CAU"
                  />
                  <div className="text-sm text-gray-500 mt-1">Current Banner</div>
                </div>
              )}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Store Logo" name="logo">
              <Upload
                listType="picture"
                beforeUpload={() => false}
                maxCount={1}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />} block={window.innerWidth < 768}>
                  {storeData?.logo ? 'Change Logo' : 'Upload Logo'}
                </Button>
              </Upload>
              {storeData?.logo && (
                <div className="mt-2">
                  <Image
                    src={getImageUrl(storeData.logo)}
                    alt="Current Logo"
                    className="w-32 h-32 object-cover rounded-lg"
                    preview={false}
                    fallback="https://www.fmt.se/wp-content/uploads/2023/02/logo-placeholder-image.png"
                  />
                  <div className="text-sm text-gray-500 mt-1">Current Logo</div>
                </div>
              )}
            </Form.Item>
          </Col>
        </Row> */}






 <Row gutter={[16, 16]}>
      {/* Banner Upload */}
      <Col xs={24} md={12}>
        <Form.Item label="Store Banner" name="banner">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
            onChange={(info) => {
              const file = info.fileList[0]?.originFileObj;
              if (file) handleFileUpload(file, "banner");
            }}
          >
            <Button
              icon={<UploadOutlined />}
              block={window.innerWidth < 768}
              loading={loadingBanner}
            >
              {storeData?.banner ? "Change Banner" : "Upload Banner"}
            </Button>
          </Upload>

          {(form.getFieldValue("banner") || storeData?.banner) && (
            <div className="mt-2">
              <Image
                src={getImageUrl(form.getFieldValue("banner") || storeData?.banner)}
                alt="Current Banner"
                className="w-full h-32 object-cover rounded-lg"
                preview={false}
                fallback="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr5STtRwhRGtjmno8wvhTi0rklpxHIe44Vj6bBRRV_syAfsdinpR3bTwBPYbE9BZEQ7-k&usqp=CAU"
              />
              <div className="text-sm text-gray-500 mt-1">Current Banner</div>
            </div>
          )}
        </Form.Item>
      </Col>

      {/* Logo Upload */}
      <Col xs={24} md={12}>
        <Form.Item label="Store Logo" name="logo">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
            onChange={(info) => {
              const file = info.fileList[0]?.originFileObj;
              if (file) handleFileUpload(file, "logo");
            }}
          >
            <Button
              icon={<UploadOutlined />}
              block={window.innerWidth < 768}
              loading={loadingLogo}
            >
              {storeData?.logo ? "Change Logo" : "Upload Logo"}
            </Button>
          </Upload>

          {(form.getFieldValue("logo") || storeData?.logo) && (
            <div className="mt-2">
              <Image
                src={getImageUrl(form.getFieldValue("logo") || storeData?.logo)}
                alt="Current Logo"
                className="w-32 h-32 object-cover rounded-lg"
                preview={false}
                fallback="https://www.fmt.se/wp-content/uploads/2023/02/logo-placeholder-image.png"
              />
              <div className="text-sm text-gray-500 mt-1">Current Logo</div>
            </div>
          )}
        </Form.Item>
      </Col>
    </Row>









        <Divider orientation="left">Store Address</Divider>

        <Form.Item 
          label="Store Address Line 1" 
          name={['address', 'address1']}
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input size="large" placeholder="Enter your store address" />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Form.Item label="Pincode" name={['address', 'pincode']}>
              <Input 
                size="large" 
                placeholder="Enter pincode" 
                onBlur={handlePincodeBlur}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="City" name={['address', 'city']}>
              <Input size="large" placeholder="City" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="State" name={['address', 'state']}>
              <Input size="large" placeholder="State" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Latitude" name={['address', 'latitude']}>
              <InputNumber 
                style={{ width: '100%' }}
                placeholder="Latitude"
                step="0.000001"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Longitude" name={['address', 'longitude']}>
              <InputNumber 
                style={{ width: '100%' }}
                placeholder="Longitude"
                step="0.000001"
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="mb-4">
          <Button 
            type="dashed" 
            icon={<CompassOutlined />}
            onClick={handleGetLocation}
            block
            size="large"
          >
            Get Current Location Automatically
          </Button>
        </div>

        <Divider orientation="left">Working Hours</Divider>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Opening Time" name={['workingHours', 'opening']}>
              <Input size="large" type="time" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Closing Time" name={['workingHours', 'closing']}>
              <Input size="large" type="time" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Social Media</Divider>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item label="Facebook" name={['socialMedia', 'facebook']}>
              <Input 
                size="large" 
                placeholder="Facebook URL" 
                prefix={<FacebookOutlined />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Instagram" name={['socialMedia', 'instagram']}>
              <Input 
                size="large" 
                placeholder="Instagram URL" 
                prefix={<InstagramOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button 
            type="primary" 
            size="large"
            htmlType="submit"
            loading={updateMutation.isPending}
            className="bg-green-500 border-0 w-full sm:w-auto"
            block={window.innerWidth < 640}
          >
            Update Store Info
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Products Tab Component
const ProductsTab = ({ 
  storeData, 
  productsData, 
  productsLoading, 
  onAddCategory, 
  onAddProduct, 
  onDeleteCategory,
  onToggleProductStatus, 
  onEditProduct,
  productColumns,
  isMobile,
  deleteCategoryLoading
}) => {
  
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('https')) return imagePath;
    return `${API_BASE_URL.replace('/api', '')}${imagePath}`;
  };

  return (
    <div className="p-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold">Product Categories</h3>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={onAddCategory}
          size={isMobile ? "small" : "middle"}
          block={isMobile}
        >
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {storeData?.categories?.map((category, index) => (
          <Card 
            key={category._id} 
            size="small" 
            className="text-center relative"
            actions={[
              <Tooltip title="Delete Category" key="delete">
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />}
                  loading={deleteCategoryLoading}
                  onClick={() => onDeleteCategory(category._id)}
                  size="small"
                />
              </Tooltip>
            ]}
          >
            {category.image && (
              <Image
                src={getImageUrl(category.image)}
                alt={category.name}
                className="w-full h-20 object-cover mb-2 rounded"
                preview={false}
                fallback="/statics/product-placeholder.jpg"
              />
            )}
            <div className="font-medium truncate">{category.name}</div>
            <div className="text-sm text-gray-500 mb-2 truncate">{category.description}</div>
            <Switch 
              size="small" 
              defaultChecked={category.isActive}
              className="mt-2"
            />
          </Card>
        ))}
      </div>

      <Divider />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold">Products</h3>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={onAddProduct}
          size={isMobile ? "small" : "middle"}
          block={isMobile}
        >
          Add Product
        </Button>
      </div>

      <Table
        columns={productColumns}
        dataSource={productsData?.products || []}
        loading={productsLoading}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: !isMobile,
          showQuickJumper: !isMobile,
          simple: isMobile,
        }}
        scroll={isMobile ? { x: 800 } : {}}
        size={isMobile ? "small" : "middle"}
      />
    </div>
  );
};

// QR Code Tab Component
const QRCodeTab = ({ storeData,   onUploadQR, uploadLoading }) => {
  
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('https')) return imagePath;
    return `${API_BASE_URL.replace('/api', '')}${imagePath}`;
  };

  return (
    <div className="text-center py-4 sm:py-8">
      {storeData?.qrCode ? (
        <>
          <div className="max-w-xs mx-auto mb-6">
            <Image
              src={getImageUrl(storeData.qrCode)}
              alt="Store QR Code"
              className="w-full rounded-lg shadow-lg"
              preview={false}
            />
          </div>
          <p className="text-green-600 mb-4">✓ QR Code is set for your store</p>
        </>
      ) : (
        <>
          <div className="max-w-xs mx-auto mb-6">
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
              <QrcodeOutlined className="text-4xl text-gray-400" />
            </div>
          </div>
          <p className="text-gray-600 mb-4">No QR code set for your store yet</p>
        </>
      )}
      
      <h3 className="text-lg sm:text-xl font-semibold mb-2">Your Store QR Code</h3>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        Customers can scan this QR code to visit your store directly
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
    
        
        <Upload
          beforeUpload={onUploadQR}
          accept="image/*"
          showUploadList={false}
        >
          <Button 
            size="large"
            icon={<UploadOutlined />}
            loading={uploadLoading}
          >
            Upload QR Code
          </Button>
        </Upload>
      </div>
    </div>
  );
};

// Bank Details Tab Component
 const BankDetailsTab = () => {
  const [form] = Form.useForm();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Fetch bank details
  const { data: bankData, isLoading, refetch } = useQuery({
    queryKey: ['bankDetails'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/store/bank-details`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.data;
    },
    enabled: !!localStorage.getItem('token')
  });

  // Update bank details mutation
  const updateBankMutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_BASE_URL}/store/bank-details`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Bank details updated successfully');
      refetch();
      form.setFieldsValue({
        bankDetails: data.data.bankDetails,
        paymentMethods: data.data.paymentMethods
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to update bank details';
      const errors = error.response?.data?.errors;
      
      if (errors) {
        errors.forEach(err => toast.error(err));
      } else {
        toast.error(errorMessage);
      }
    }
  });

  // Verify bank details mutation
  const verifyBankMutation = useMutation({
    mutationFn: async (verificationData) => {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/store/verify-bank`, verificationData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    onSuccess: (data) => {
      setIsVerifying(false);
      setVerificationStatus(data.data.verified);
      
      if (data.data.verified) {
        toast.success('Bank details verified successfully!');
      } else {
        toast.error('Bank verification failed. Please check your details.');
      }
    },
    onError: (error) => {
      setIsVerifying(false);
      toast.error(error.response?.data?.message || 'Bank verification failed');
    }
  });

  // Set form values when data is loaded
  React.useEffect(() => {
    if (bankData) {
      form.setFieldsValue({
        bankDetails: bankData.bankDetails || {},
        paymentMethods: bankData.paymentMethods || {}
      });
    }
  }, [bankData, form]);

  const handleFormFinish = (values) => {
    updateBankMutation.mutate(values);
  };

  const handleVerifyBank = () => {
    const bankDetails = form.getFieldValue('bankDetails');
    
    if (!bankDetails?.accountNumber || !bankDetails?.ifscCode) {
      toast.error('Please enter account number and IFSC code for verification');
      return;
    }

    setIsVerifying(true);
    verifyBankMutation.mutate({
      accountNumber: bankDetails.accountNumber,
      ifscCode: bankDetails.ifscCode
    });
  };

  const handleIFSCChange = (e) => {
    const value = e.target.value.toUpperCase();
    form.setFieldsValue({
      bankDetails: {
        ...form.getFieldValue('bankDetails'),
        ifscCode: value
      }
    });
  };

  const handleUPIChange = (e) => {
    const value = e.target.value.toLowerCase();
    form.setFieldsValue({
      bankDetails: {
        ...form.getFieldValue('bankDetails'),
        upiId: value
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-1">
      <Alert
        message="Bank Account Information"
        description="Add your bank account details to receive payments. All information is securely encrypted."
        type="info"
        showIcon
        className="mb-6"
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormFinish}
        initialValues={{
          bankDetails: {},
          paymentMethods: {}
        }}
        size="large"
      >
        {/* Bank Details Section */}
        <Card 
          title={
            <Space>
              <BankOutlined />
              Bank Account Details
            </Space>
          }
          className="mb-6"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Account Holder Name"
                name={['bankDetails', 'accountHolder']}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value || value.trim().length === 0) return Promise.resolve();
                      if (value.length < 2 || value.length > 100) {
                        return Promise.reject('Account holder name must be between 2-100 characters');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input 
                  placeholder="Enter account holder name as in bank" 
                  allowClear
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Account Number"
                name={['bankDetails', 'accountNumber']}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value || value.trim().length === 0) return Promise.resolve();
                      if (!/^\d{9,18}$/.test(value)) {
                        return Promise.reject('Account number must be 9-18 digits');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input 
                  placeholder="Enter account number" 
                  type="text"
                  maxLength={18}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Bank Name"
                name={['bankDetails', 'bankName']}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value || value.trim().length === 0) return Promise.resolve();
                      if (value.length < 2 || value.length > 100) {
                        return Promise.reject('Bank name must be between 2-100 characters');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input 
                  placeholder="Enter bank name" 
                  allowClear
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="IFSC Code"
                name={['bankDetails', 'ifscCode']}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value || value.trim().length === 0) return Promise.resolve();
                      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
                        return Promise.reject('Invalid IFSC code format (e.g., SBIN0000123)');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input 
                  placeholder="Enter IFSC code" 
                  onChange={handleIFSCChange}
                  style={{ textTransform: 'uppercase' }}
                  maxLength={11}
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="UPI ID"
                name={['bankDetails', 'upiId']}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value || value.trim().length === 0) return Promise.resolve();
                      if (!/^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z]{2,}$/.test(value)) {
                        return Promise.reject('Invalid UPI ID format (e.g., username@upi)');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input 
                  placeholder="username@upi" 
                  onChange={handleUPIChange}
                  style={{ textTransform: 'lowercase' }}
                  allowClear
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <div className="flex items-end h-full">
                <Button
                  type="dashed"
                  icon={<SafetyCertificateOutlined />}
                  onClick={handleVerifyBank}
                  loading={isVerifying}
                  disabled={!form.getFieldValue(['bankDetails', 'accountNumber']) || 
                           !form.getFieldValue(['bankDetails', 'ifscCode'])}
                >
                  Verify Bank Details
                </Button>
                
                {verificationStatus !== null && (
                  <Tag 
                    color={verificationStatus ? 'green' : 'red'} 
                    className="ml-2"
                    icon={verificationStatus ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  >
                    {verificationStatus ? 'Verified' : 'Not Verified'}
                  </Tag>
                )}
              </div>
            </Col>
          </Row>
        </Card>

        {/* Payment Methods Section */}
        <Card 
          title="Payment Methods"
          className="mb-6"
        >
          <div className="space-y-4">
            <Form.Item 
              name={['paymentMethods', 'cashOnDelivery']} 
              valuePropName="checked"
              className="mb-0"
            >
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm text-gray-600">
                    Accept cash payments when customer receives order
                  </div>
                </div>
                <Switch />
              </div>
            </Form.Item>

            <Form.Item 
              name={['paymentMethods', 'upi']} 
              valuePropName="checked"
              className="mb-0"
            >
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">UPI Payments</div>
                  <div className="text-sm text-gray-600">
                    Accept payments via UPI apps like Google Pay, PhonePe, etc.
                  </div>
                </div>
                <Switch />
              </div>
            </Form.Item>

            <Form.Item 
              name={['paymentMethods', 'card']} 
              valuePropName="checked"
              className="mb-0"
            >
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Card Payments</div>
                  <div className="text-sm text-gray-600">
                    Accept debit and credit card payments
                  </div>
                </div>
                <Switch />
              </div>
            </Form.Item>

            <Form.Item 
              name={['paymentMethods', 'netBanking']} 
              valuePropName="checked"
              className="mb-0"
            >
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Net Banking</div>
                  <div className="text-sm text-gray-600">
                    Accept payments through net banking
                  </div>
                </div>
                <Switch />
              </div>
            </Form.Item>
          </div>
        </Card>

        {/* Security Notice */}
        <Alert
          message="Security Notice"
          description="Your bank details are securely encrypted and stored. We never share your financial information with third parties."
          type="warning"
          showIcon
          className="mb-6"
        />

        {/* Submit Button */}
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large"
            loading={updateBankMutation.isPending}
            block={window.innerWidth < 640}
            icon={<CheckCircleOutlined />}
            className="bg-green-600 hover:bg-green-700 border-0"
          >
            Save Bank Details
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};










// Settings Tab Component
const SettingsTab = () => {
  return (
    <div className="p-1 space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Order Settings</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto Confirm Orders</div>
              <div className="text-sm text-gray-600">Automatically confirm incoming orders</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Low Stock Alerts</div>
              <div className="text-sm text-gray-600">Get notified when stock is low</div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Notification Settings</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Order Notifications</div>
              <div className="text-sm text-gray-600">Get notified for new orders</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">WhatsApp Alerts</div>
              <div className="text-sm text-gray-600">Receive alerts on WhatsApp</div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Category Modal Component
const AddCategoryModal = ({ visible, onCancel, onFinish, loading }) => {
  return (
    <Modal
      title="Add New Category"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form onFinish={onFinish} encType="multipart/form-data">
        <Form.Item
          name="categoryName"
          rules={[{ required: true, message: 'Please enter category name' }]}
        >
          <Input placeholder="Enter category name" size="large" />
        </Form.Item>
        <Form.Item name="description">
          <TextArea placeholder="Category description (optional)" rows={3} />
        </Form.Item>
        <Form.Item name="image">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />} block>
              Upload Category Image
            </Button>
          </Upload>
        </Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          className="w-full"
          size="large"
        >
          Add Category
        </Button>
      </Form>
    </Modal>
  );
};

// Add Product Modal Component
const AddProductModal = ({ visible, editingProduct, storeData, onCancel, onFinish, loading }) => {
  return (
    <Modal
      title={editingProduct ? "Edit Product" : "Add New Product"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={Math.min(800, window.innerWidth - 40)}
    >
      <Form
        layout="vertical"
        initialValues={editingProduct || {
          price: 0,
          comparePrice: 0,
          costPrice: 0,
          stock: 0,
          isActive: true,
          isFeatured: false
        }}
        onFinish={onFinish}
        encType="multipart/form-data"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Product Name"
              name="name"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select placeholder="Select category">
                {storeData?.categories?.map(cat => (
                  <Option key={cat._id} value={cat.name}>{cat.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea rows={3} placeholder="Product description..." />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Price (₹)"
              name="price"
              rules={[{ required: true, message: 'Please enter price' }]}
            >
              <InputNumber 
                style={{ width: '100%' }}
                placeholder="0.00"
                min={0}
                step={0.01}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Compare Price (₹)"
              name="comparePrice"
            >
              <InputNumber 
                style={{ width: '100%' }}
                placeholder="0.00"
                min={0}
                step={0.01}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Stock"
              name="stock"
            >
              <InputNumber 
                style={{ width: '100%' }}
                placeholder="0"
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Product Images"
          name="images"
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            multiple
            maxCount={10}
            accept="image/*"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="SKU"
              name="sku"
            >
              <Input placeholder="Product SKU" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Barcode"
              name="barcode"
            >
              <Input placeholder="Barcode" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="isActive" valuePropName="checked">
              <Checkbox>Active Product</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="isFeatured" valuePropName="checked">
              <Checkbox>Featured Product</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className="w-full"
            size="large"
          >
            {editingProduct ? 'Update Product' : 'Create Product'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminPanel;
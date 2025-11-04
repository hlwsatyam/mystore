import React, { useState } from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Globe,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  
  User,
  Shield,
  Copy,
  CheckCircle,
  ExternalLink,
  Banknote
} from 'lucide-react';
import {
  Card,
  Button,
  Tag,
  Divider,
  Space,
  Typography,
  Tooltip,
  notification,
  Row,
  Col,
  Badge,
  Avatar,
  List
} from 'antd';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;

const StoreContactAndBankDetails = ({ store }) => {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      notification.success({
        message: 'Copied!',
        description: `${fieldName} copied to clipboard`,
        placement: 'topRight',
        duration: 2,
      });
      
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  // Social Media Data
  const socialMediaLinks = [
    {
      platform: 'facebook',
      url: store.socialMedia?.facebook,
      icon: <Facebook size={20} />,
      color: '#1877F2',
      name: 'Facebook'
    },
    {
      platform: 'instagram',
      url: store.socialMedia?.instagram,
      icon: <Instagram size={20} />,
      color: '#E4405F',
      name: 'Instagram'
    },
    {
      platform: 'twitter',
      url: store.socialMedia?.twitter,
      icon: <Twitter size={20} />,
      color: '#1DA1F2',
      name: 'Twitter'
    },
    {
      platform: 'youtube',
      url: store.socialMedia?.youtube,
      icon: <Youtube size={20} />,
      color: '#FF0000',
      name: 'YouTube'
    },
    {
      platform: 'linkedin',
      url: store.socialMedia?.linkedin,
      icon: <Linkedin size={20} />,
      color: '#0A66C2',
      name: 'LinkedIn'
    },
    {
      platform: 'website',
      url: store.contact?.website,
      icon: <Globe size={20} />,
      color: '#10B981',
      name: 'Website'
    }
  ].filter(item => item.url);

  // Contact Methods
  const contactMethods = [
    {
      type: 'whatsapp',
      value: store.contact?.whatsapp,
      icon: <MessageCircle size={18} />,
      color: '#25D366',
      label: 'WhatsApp',
      prefix: 'https://wa.me/'
    },
    {
      type: 'phone',
      value: store.contact?.phone,
      icon: <Phone size={18} />,
      color: '#3B82F6',
      label: 'Phone',
      prefix: 'tel:'
    },
    {
      type: 'email',
      value: store.contact?.email,
      icon: <Mail size={18} />,
      color: '#EF4444',
      label: 'Email',
      prefix: 'mailto:'
    }
  ].filter(item => item.value);

  // Bank Details
  const bankDetails = [
    {
      field: 'accountHolder',
      label: 'Account Holder',
      value: store.bankDetails?.accountHolder,
      icon: <User size={16} />
    },
    {
      field: 'accountNumber',
      label: 'Account Number',
      value: store.bankDetails?.accountNumber,
      icon: <CreditCard size={16} />
    },
    {
      field: 'bankName',
      label: 'Bank Name',
      value: store.bankDetails?.bankName,
      icon: <Banknote size={16} />
    },
    {
      field: 'ifscCode',
      label: 'IFSC Code',
      value: store.bankDetails?.ifscCode,
      icon: <Shield size={16} />
    },
    {
      field: 'upiId',
      label: 'UPI ID',
      value: store.bankDetails?.upiId,
      icon: <CreditCard size={16} />
    }
  ].filter(item => item.value);

  // Payment Methods
  const paymentMethods = [
    { method: 'cashOnDelivery', label: 'Cash on Delivery', enabled: store.paymentMethods?.cashOnDelivery },
    { method: 'upi', label: 'UPI Payment', enabled: store.paymentMethods?.upi },
    { method: 'card', label: 'Card Payment', enabled: store.paymentMethods?.card },
    { method: 'netBanking', label: 'Net Banking', enabled: store.paymentMethods?.netBanking }
  ].filter(pm => pm.enabled);

  return (
    <div className="space-y-6">
      {/* Social Media Section */}
      {socialMediaLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            styles={{
              body: { padding: '24px' }
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <Title level={3} className="!mb-0 !text-gray-900">
                Follow Us
              </Title>
            </div>

            <Paragraph className="!text-gray-600 !mb-6">
              Connect with us on social media for updates and promotions
            </Paragraph>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {socialMediaLinks.map((social, index) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300 group"
                  style={{ 
                    borderColor: social.color + '20',
                    background: `linear-gradient(135deg, ${social.color}10, ${social.color}05)`
                  }}
                >
                  <div 
                    className="p-3 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: social.color + '20' }}
                  >
                    <div style={{ color: social.color }}>
                      {social.icon}
                    </div>
                  </div>
                  <Text strong className="!text-gray-700 !text-sm text-center">
                    {social.name}
                  </Text>
                  <Text type="secondary" className="!text-xs text-center mt-1">
                    Follow
                  </Text>
                </motion.a>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Contact Information */}
      {contactMethods.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            styles={{
              body: { padding: '24px' }
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
              <Title level={3} className="!mb-0 !text-gray-900">
                Contact Information
              </Title>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactMethods.map((contact, index) => (
                <motion.div
                  key={contact.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 group"
                >
                  <div 
                    className="p-3 rounded-full"
                    style={{ backgroundColor: contact.color + '20' }}
                  >
                    <div style={{ color: contact.color }}>
                      {contact.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Text strong className="!text-gray-700 !text-sm block">
                      {contact.label}
                    </Text>
                    <Text type="secondary" className="!text-xs block truncate">
                      {contact.value}
                    </Text>
                  </div>

                  <Space>
                    <Tooltip title={`Copy ${contact.label}`}>
                      <Button
                        type="text"
                        size="small"
                        icon={copiedField === contact.type ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                        onClick={() => copyToClipboard(contact.value, contact.label)}
                        className="!text-gray-400 hover:!text-gray-600"
                      />
                    </Tooltip>
                    
                    <Tooltip title={`Open ${contact.label}`}>
                      <Button
                        type="text"
                        size="small"
                        icon={<ExternalLink size={14} />}
                        href={`${contact.prefix}${contact.value}`}
                        className="!text-gray-400 hover:!text-blue-500"
                      />
                    </Tooltip>
                  </Space>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Bank Details */}
      {bankDetails.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            styles={{
              body: { padding: '24px' }
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
                <Title level={3} className="!mb-0 !text-gray-900">
                  Bank Details
                </Title>
              </div>
              
              <Badge count="Secure" color="green" className="!font-semibold" />
            </div>

            <Paragraph className="!text-gray-600 !mb-6">
              Use these bank details for direct transfers and payments
            </Paragraph>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {bankDetails.map((detail, index) => (
                <motion.div
                  key={detail.field}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <div className="text-orange-600">
                        {detail.icon}
                      </div>
                    </div>
                    <div>
                      <Text strong className="!text-gray-700 !text-sm block">
                        {detail.label}
                      </Text>
                      <Text className="!text-gray-900 !font-mono !text-base">
                        {detail.value}
                      </Text>
                    </div>
                  </div>

                  <Tooltip title={`Copy ${detail.label}`}>
                    <Button
                      type="text"
                      size="small"
                      icon={copiedField === detail.field ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                      onClick={() => copyToClipboard(detail.value, detail.label)}
                      className="!text-gray-400 hover:!text-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </Tooltip>
                </motion.div>
              ))}
            </div>

            {/* Payment Methods */}
            {paymentMethods.length > 0 && (
              <>
                <Divider className="!my-6" />
                
                <div>
                  <Text strong className="!text-gray-700 !mb-4 block">
                    Accepted Payment Methods
                  </Text>
                  <Space size="small" wrap>
                    {paymentMethods.map((method, index) => (
                      <motion.div
                        key={method.method}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Tag 
                          color="blue" 
                          className="!m-0 !px-3 !py-1 !text-sm !font-medium !border-0"
                        >
                          ✅ {method.label}
                        </Tag>
                      </motion.div>
                    ))}
                  </Space>
                </div>
              </>
            )}
          </Card>
        </motion.div>
      )}

      {/* Store Address */}
      {store.address?.address1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            styles={{
              body: { padding: '24px' }
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
              <Title level={3} className="!mb-0 !text-gray-900">
                Store Location
              </Title>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              
              <div className="flex-1">
                <Text strong className="!text-gray-700 !text-lg block mb-2">
                  {store.storeName}
                </Text>
                
                <div className="space-y-1">
                  <Text className="!text-gray-600 block">
                    {store.address.address1}
                  </Text>
                  {store.address.address2 && (
                    <Text className="!text-gray-600 block">
                      {store.address.address2}
                    </Text>
                  )}
                  <Text className="!text-gray-600 block">
                    {[
                      store.address.landmark,
                      store.address.city,
                      store.address.state,
                      store.address.pincode
                    ].filter(Boolean).join(', ')}
                  </Text>
                  {store.address.country && store.address.country !== 'India' && (
                    <Text className="!text-gray-600 block">
                      {store.address.country}
                    </Text>
                  )}
                </div>

                {store.address.latitude && store.address.longitude && (
                  <Button
                    type="link"
                    size="small"
                    icon={<ExternalLink size={14} />}
                    href={`https://maps.google.com/?q=${store.address.latitude},${store.address.longitude}`}
                    target="_blank"
                    className="!p-0 !h-auto !text-blue-600 !mt-2"
                  >
                    View on Google Maps
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Empty State */}
      {socialMediaLinks.length === 0 && contactMethods.length === 0 && bankDetails.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="border-0 shadow-lg text-center"
            styles={{
              body: { padding: '48px 24px' }
            }}
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-gray-400" />
            </div>
            <Title level={4} className="!text-gray-600 !mb-2">
              Contact Information
            </Title>
            <Paragraph className="!text-gray-500 !mb-0">
              Store contact details will appear here when available
            </Paragraph>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default StoreContactAndBankDetails;
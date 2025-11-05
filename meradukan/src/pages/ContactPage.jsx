import React, { useState } from 'react';
import { 
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  WhatsAppOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  UserOutlined,
  SendOutlined,
  CheckCircleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  SkypeOutlined,
  CalendarOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Contact Methods
  const contactMethods = [
    {
      icon: <PhoneOutlined className="text-3xl" />,
      title: 'Call Us',
      description: 'Speak directly with our team',
      details: '+91 82956 60693',
      action: 'Call Now',
      color: 'from-green-500 to-emerald-500',
      type: 'phone'
    },
    {
      icon: <WhatsAppOutlined className="text-3xl" />,
      title: 'WhatsApp',
      description: 'Quick chat support',
      details: '+91 82956 60693',
      action: 'Start Chat',
      color: 'from-green-400 to-green-600',
      type: 'whatsapp'
    },
    {
      icon: <MailOutlined className="text-3xl" />,
      title: 'Email Us',
      description: 'Send us your queries',
      details: 'support@meradukan.store',
      action: 'Send Email',
      color: 'from-blue-500 to-cyan-500',
      type: 'email'
    },
    {
      icon: <EnvironmentOutlined className="text-3xl" />,
      title: 'Visit Office',
      description: 'Meet us in person',
      details: 'Mumbai, India - 400001',
      action: 'Get Directions',
      color: 'from-orange-500 to-red-500',
      type: 'location'
    }
  ];

  // Office Locations
  const officeLocations = [
    {
      city: 'Mumbai',
      address: 'Tech Park, Bandra Kurla Complex, Mumbai - 400001',
      phone: '+91 22 1234 5678',
      email: 'mumbai@meradukan.com',
      hours: '9:00 AM - 6:00 PM',
      coordinates: '19.0760° N, 72.8777° E'
    },
    {
      city: 'Delhi',
      address: 'Connaught Place, New Delhi - 110001',
      phone: '+91 11 1234 5678',
      email: 'delhi@meradukan.com',
      hours: '9:00 AM - 6:00 PM',
      coordinates: '28.6139° N, 77.2090° E'
    },
    {
      city: 'Bangalore',
      address: 'Koramangala, Bangalore - 560034',
      phone: '+91 80 1234 5678',
      email: 'bangalore@meradukan.com',
      hours: '9:00 AM - 6:00 PM',
      coordinates: '12.9716° N, 77.5946° E'
    }
  ];

  // Team Departments
  const departments = [
    {
      name: 'Sales',
      description: 'Get pricing and plan information',
      email: 'sales@meradukan.stote',
      phone: '+91 82956 60693',
      icon: '💰'
    },
    {
      name: 'Support',
      description: 'Technical and account support',
      email: 'support@meradukan.stote',
      phone: '+91 98765 43212',
      icon: '🔧'
    },
    {
      name: 'Partnerships',
      description: 'Business collaborations',
      email: 'partners@meradukan.stote',
      phone: '+91 82956 60694',
      icon: '🤝'
    },
    {
      name: 'Careers',
      description: 'Join our team',
      email: 'careers@meradukan.stote',
      phone: '+91 82956 60693',
      icon: '👥'
    }
  ];

  // Social Media
  const socialMedia = [
    { platform: 'Facebook', icon: <FacebookOutlined />, url: '#', color: 'bg-blue-600' },
    { platform: 'Twitter', icon: <TwitterOutlined />, url: '#', color: 'bg-blue-400' },
    { platform: 'Instagram', icon: <InstagramOutlined />, url: '#', color: 'bg-pink-600' },
    { platform: 'LinkedIn', icon: <LinkedinOutlined />, url: '#', color: 'bg-blue-700' },
    { platform: 'YouTube', icon: <YoutubeOutlined />, url: '#', color: 'bg-red-600' },
    { platform: 'Skype', icon: <SkypeOutlined />, url: '#', color: 'bg-blue-500' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 5000);
  };

  const handleContactAction = (type, details) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${details}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${details.replace(/\D/g, '')}`);
        break;
      case 'email':
        window.open(`mailto:${details}`);
        break;
      case 'location':
        window.open('https://maps.google.com');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-500 to-blue-500 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <MessageOutlined className="mr-2" />
              <span className="font-semibold">Get In Touch</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Let's Start
              <span className="block text-yellow-300">
                Conversation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              We're here to help you succeed. Whether you're starting your digital journey or scaling your business, 
              our team is ready to support you every step of the way.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover-lift text-center cursor-pointer"
                  onClick={() => handleContactAction(method.type, method.details)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4`}>
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-3">{method.description}</p>
                  <div className="text-lg font-semibold text-gray-800 mb-4">{method.details}</div>
                  <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-green-500 hover:text-white transition-colors">
                    {method.action}
                  </button>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <ClockCircleOutlined className="text-2xl text-green-600" />
                <h3 className="text-2xl font-bold text-gray-800">Business Hours</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="bg-white rounded-xl p-4">
                  <div className="font-semibold text-gray-800 mb-1">Monday - Friday</div>
                  <div className="text-green-600">9:00 AM - 6:00 PM</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="font-semibold text-gray-800 mb-1">Saturday</div>
                  <div className="text-green-600">10:00 AM - 4:00 PM</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="font-semibold text-gray-800 mb-1">Emergency Support</div>
                  <div className="text-green-600">24/7 Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
                  <p className="text-gray-600">We typically respond within 2 hours during business hours</p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-6">We'll get back to you within 2 hours.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <UserOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <MailOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <PhoneOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Sales</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="career">Career Opportunity</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Brief subject of your message"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <SendOutlined />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Quick Response */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <ThunderboltOutlined className="text-2xl text-green-500" />
                    <h3 className="text-xl font-bold text-gray-800">Quick Response Guarantee</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-green-600">
                      <CheckCircleOutlined />
                      <span>Response within 2 hours during business hours</span>
                    </div>
                    <div className="flex items-center space-x-3 text-green-600">
                      <CheckCircleOutlined />
                      <span>24/7 emergency support for technical issues</span>
                    </div>
                    <div className="flex items-center space-x-3 text-green-600">
                      <CheckCircleOutlined />
                      <span>Dedicated account manager for enterprise clients</span>
                    </div>
                  </div>
                </div>

                {/* Department Contacts */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <TeamOutlined className="text-2xl text-blue-500" />
                    <h3 className="text-xl font-bold text-gray-800">Contact Specific Teams</h3>
                  </div>
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="text-2xl">{dept.icon}</span>
                            <div>
                              <div className="font-semibold text-gray-800">{dept.name}</div>
                              <div className="text-gray-600 text-sm">{dept.description}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-800">{dept.email}</div>
                          <div className="text-sm text-gray-600">{dept.phone}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Us</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {socialMedia.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className={`${social.color} rounded-xl p-4 text-white text-center hover:scale-105 transition-transform`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="text-2xl mb-1">{social.icon}</div>
                        <div className="text-xs font-semibold">{social.platform}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Office Locations</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visit us at any of our offices across India. We'd love to meet you in person and discuss how we can help your business grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {officeLocations.map((office, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100 hover-lift">
                  <div className="flex items-center space-x-3 mb-4">
                    <EnvironmentOutlined className="text-2xl text-green-500" />
                    <h3 className="text-xl font-bold text-gray-800">{office.city}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Address</div>
                      <div className="text-gray-800 font-medium">{office.address}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Phone</div>
                      <div className="text-gray-800 font-medium">{office.phone}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Email</div>
                      <div className="text-gray-800 font-medium">{office.email}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Business Hours</div>
                      <div className="text-gray-800 font-medium">{office.hours}</div>
                    </div>

                    <div className="pt-4 border-t border-green-200">
                      <button className="w-full py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                        <CalendarOutlined />
                        <span>Schedule Meeting</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Quick answers to common questions about getting started and support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How quickly will I get a response?",
                  answer: "We respond to all inquiries within 2 hours during business hours (9 AM - 6 PM, Monday to Friday). Emergency technical support is available 24/7."
                },
                {
                  question: "Do you offer custom solutions for large businesses?",
                  answer: "Yes! We have dedicated enterprise solutions with custom features, dedicated account managers, and personalized onboarding. Contact our sales team for details."
                },
                {
                  question: "What kind of support do you provide?",
                  answer: "We offer comprehensive support including technical assistance, account management, business consulting, and 24/7 emergency support for critical issues."
                },
                {
                  question: "Can I schedule a product demo?",
                  answer: "Absolutely! We offer personalized demos tailored to your business needs. Use the contact form or call us directly to schedule a demo at your convenience."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h4 className="font-bold text-gray-800 text-lg mb-3">{faq.question}</h4>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-12 text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Let's discuss how MeraDukan can help you achieve your business goals. Our team is ready to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center space-x-3">
                  <PhoneOutlined />
                  <span>Call Us Now</span>
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center space-x-3">
                  <WhatsAppOutlined />
                  <span>Chat on WhatsApp</span>
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center space-x-3">
                  <CalendarOutlined />
                  <span>Book Demo</span>
                </button>
              </div>
              <p className="mt-6 text-green-100">
                <SafetyCertificateOutlined className="mr-2" />
                Guaranteed response within 2 hours • 24/7 emergency support
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
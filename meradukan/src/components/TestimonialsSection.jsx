import React, { useState } from 'react';
import { 
  StarFilled,
  StarOutlined,
  LeftOutlined,
  RightOutlined,
  ThunderboltOutlined,
  PlayCircleOutlined,
  WhatsAppOutlined,
  ShopOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  RiseOutlined,
  TrophyOutlined,
  HeartOutlined,
  VerifiedOutlined,
  EyeOutlined,
  LikeOutlined,
  ShareAltOutlined,
  MessageOutlined
} from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TestimonialsPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Grocery Store Owner',
      location: 'Delhi',
      business: 'Rajesh Kirana Store',
      avatar: '🛒',
      rating: 5,
      content: 'MeraDukan ne mere business ko completely transform kar diya! Pehle main sirf local customers tak pahunch pata tha, ab pure Delhi se orders aate hain. Roz 50+ orders WhatsApp par aate hain aur monthly revenue 3x ho gaya. Best decision for my business!',
      videoUrl: '#',
      beforeAfter: {
        before: '50 orders/month',
        after: '1500+ orders/month'
      },
      growth: '300% Revenue Growth',
      joinedDate: 'March 2023',
      category: 'grocery',
      stats: {
        orders: '1500+',
        revenue: '₹5L/month',
        customers: '2000+',
        growth: '300%'
      }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Bakery Owner',
      location: 'Mumbai',
      business: 'Priya French Bakery',
      avatar: '🍰',
      rating: 5,
      content: 'As a woman entrepreneur, I was hesitant to go digital. But MeraDukan made it so easy! 5 minute mein meri bakery online ho gayi. Customers direct WhatsApp par order karte hain aur delivery partners automatically assign ho jate hain. My sales have increased by 200% in just 3 months!',
      videoUrl: '#',
      beforeAfter: {
        before: 'Walk-in only',
        after: '200+ online orders/month'
      },
      growth: '200% Sales Increase',
      joinedDate: 'January 2024',
      category: 'food',
      stats: {
        orders: '200+',
        revenue: '₹2.5L/month',
        customers: '500+',
        growth: '200%'
      }
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Electronics Vendor',
      location: 'Bangalore',
      business: 'Amit Electronics',
      avatar: '📱',
      rating: 5,
      content: 'The analytics feature is a game-changer! I can now see which products are selling best, when to restock, and which customers are most valuable. Sales 300% badh gaye! Inventory management bhi automatic ho gaya. MeraDukan is like having a business manager 24/7.',
      videoUrl: '#',
      beforeAfter: {
        before: 'Manual tracking',
        after: 'AI-powered analytics'
      },
      growth: '300% Sales Growth',
      joinedDate: 'November 2023',
      category: 'electronics',
      stats: {
        orders: '800+',
        revenue: '₹8L/month',
        customers: '1200+',
        growth: '300%'
      }
    },
    {
      id: 4,
      name: 'Sunita Devi',
      role: 'Clothing Boutique Owner',
      location: 'Chennai',
      business: 'Sunita Fashion Hub',
      avatar: '👗',
      rating: 5,
      content: 'Being a woman entrepreneur in a small city, I never thought I could compete with big brands. MeraDukan gave me the confidence and tools to grow my business digitally. Now I serve customers across Tamil Nadu! The WhatsApp integration helps me build personal relationships with customers.',
      videoUrl: '#',
      beforeAfter: {
        before: 'Local customers only',
        after: 'Pan-Tamil Nadu delivery'
      },
      growth: 'Pan-State Reach',
      joinedDate: 'February 2024',
      category: 'fashion',
      stats: {
        orders: '400+',
        revenue: '₹3L/month',
        customers: '800+',
        growth: '250%'
      }
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Sports Goods Seller',
      location: 'Pune',
      business: 'Vikram Sports',
      avatar: '⚽',
      rating: 5,
      content: 'The customer insights from MeraDukan helped me understand exactly what my customers want. Now I stock products that actually sell! My inventory turnover has improved dramatically, and I am making smarter business decisions every day.',
      videoUrl: '#',
      beforeAfter: {
        before: 'Guesswork ordering',
        after: 'Data-driven inventory'
      },
      growth: 'Smart Inventory Management',
      joinedDate: 'December 2023',
      category: 'sports',
      stats: {
        orders: '300+',
        revenue: '₹4L/month',
        customers: '600+',
        growth: '180%'
      }
    },
    {
      id: 6,
      name: 'Neha Gupta',
      role: 'Book Store Owner',
      location: 'Kolkata',
      business: 'Neha Book Paradise',
      avatar: '📚',
      rating: 5,
      content: 'Payment integration is seamless! Customers can pay via UPI, cards, or cash - whatever they prefer. The automated order tracking and notification system has reduced my customer support time by 70%. My business has never been smoother!',
      videoUrl: '#',
      beforeAfter: {
        before: 'Cash only',
        after: '15+ payment methods'
      },
      growth: '70% Less Support Time',
      joinedDate: 'October 2023',
      category: 'books',
      stats: {
        orders: '250+',
        revenue: '₹1.8L/month',
        customers: '400+',
        growth: '150%'
      }
    }
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Stories', count: testimonials.length, icon: '🌟' },
    { id: 'grocery', name: 'Grocery', count: testimonials.filter(t => t.category === 'grocery').length, icon: '🛒' },
    { id: 'food', name: 'Food & Bakery', count: testimonials.filter(t => t.category === 'food').length, icon: '🍰' },
    { id: 'electronics', name: 'Electronics', count: testimonials.filter(t => t.category === 'electronics').length, icon: '📱' },
    { id: 'fashion', name: 'Fashion', count: testimonials.filter(t => t.category === 'fashion').length, icon: '👗' },
    { id: 'sports', name: 'Sports', count: testimonials.filter(t => t.category === 'sports').length, icon: '⚽' }
  ];

  // Filter testimonials by category
  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  // Navigation functions
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === filteredTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      index < rating ? 
        <StarFilled key={index} className="text-yellow-400 text-lg" /> : 
        <StarOutlined key={index} className="text-gray-300 text-lg" />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <div className="pt-20">
        {/* Header Section */}
        <section className="py-20 bg-gradient-to-br from-green-500 to-blue-500 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <TrophyOutlined className="mr-2" />
              <span className="font-semibold">Success Stories</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Real Stories,
              <span className="block text-yellow-300">
                Real Success
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Discover how businesses across India transformed their operations and achieved incredible growth with MeraDukan. 
              These are real stories from real entrepreneurs.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              {[
                { number: '5000+', label: 'Happy Vendors' },
                { number: '4.9/5', label: 'Average Rating' },
                { number: '95%', label: 'Success Rate' },
                { number: '₹50Cr+', label: 'Revenue Generated' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-green-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-20">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setCurrentTestimonial(0);
                }}
                className={`px-6 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center space-x-3 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-2xl'
                    : 'bg-white text-gray-600 shadow-lg hover:shadow-xl'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-sm">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Featured Testimonial */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Testimonial Content */}
              <div className="relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl flex items-center justify-center text-white shadow-2xl">
                  <ThunderboltOutlined className="text-2xl" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {renderStars(filteredTestimonials[currentTestimonial].rating)}
                  <span className="ml-3 text-gray-600 font-semibold text-lg">
                    {filteredTestimonials[currentTestimonial].rating}.0/5.0
                  </span>
                </div>

                {/* Content */}
                <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed mb-8 italic font-light">
                  "{filteredTestimonials[currentTestimonial].content}"
                </p>

                {/* Business Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="text-green-600 text-sm font-semibold mb-1">MONTHLY ORDERS</div>
                    <div className="text-2xl font-bold text-gray-800">{filteredTestimonials[currentTestimonial].stats.orders}</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-blue-600 text-sm font-semibold mb-1">MONTHLY REVENUE</div>
                    <div className="text-2xl font-bold text-gray-800">{filteredTestimonials[currentTestimonial].stats.revenue}</div>
                  </div>
                </div>

                {/* Growth Metric */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center space-x-3">
                    <RiseOutlined className="text-2xl" />
                    <div>
                      <div className="font-bold text-xl">{filteredTestimonials[currentTestimonial].growth}</div>
                      <div className="text-green-100">Since joining MeraDukan</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start space-y-6 mb-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl flex items-center justify-center text-white text-5xl shadow-2xl">
                    {filteredTestimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-3">
                      {filteredTestimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-xl text-gray-600 mb-2">{filteredTestimonials[currentTestimonial].role}</p>
                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-500 text-lg">
                      <EnvironmentOutlined />
                      <span>{filteredTestimonials[currentTestimonial].location}</span>
                    </div>
                  </div>
                </div>

                {/* Business Info */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <ShopOutlined className="text-green-500 text-xl" />
                    <span className="font-semibold text-gray-800 text-lg">Business Details</span>
                  </div>
                  <div className="text-xl text-gray-800 mb-3 font-semibold">{filteredTestimonials[currentTestimonial].business}</div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <CalendarOutlined />
                    <span>Joined {filteredTestimonials[currentTestimonial].joinedDate}</span>
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200 text-center">
                    <div className="text-red-600 text-sm font-semibold mb-2">BEFORE</div>
                    <div className="text-gray-800 font-bold">{filteredTestimonials[currentTestimonial].beforeAfter.before}</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
                    <div className="text-green-600 text-sm font-semibold mb-2">AFTER</div>
                    <div className="text-gray-800 font-bold">{filteredTestimonials[currentTestimonial].beforeAfter.after}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className="flex-1 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center space-x-3">
                    <PlayCircleOutlined className="text-xl" />
                    <span>Watch Video Story</span>
                  </button>
                  <button className="flex-1 py-4 border-2 border-green-500 text-green-500 rounded-xl font-bold hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center space-x-3">
                    <WhatsAppOutlined className="text-xl" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={prevTestimonial}
                className="flex items-center space-x-3 px-6 py-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
              >
                <LeftOutlined />
                <span>Previous</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  {filteredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {currentTestimonial + 1} of {filteredTestimonials.length}
                </span>
              </div>

              <button
                onClick={nextTestimonial}
                className="flex items-center space-x-3 px-6 py-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
              >
                <span>Next</span>
                <RightOutlined />
              </button>
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                More Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover how other businesses are achieving incredible results with MeraDukan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift cursor-pointer transition-all duration-300 ${
                    index === currentTestimonial ? 'ring-4 ring-green-200' : ''
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <div className="flex mt-2">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">"{testimonial.content}"</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <EnvironmentOutlined />
                        <span>{testimonial.location}</span>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        {testimonial.stats.growth}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <EyeOutlined />
                          <span>1.2k</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <LikeOutlined />
                          <span>245</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageOutlined />
                        <span>48</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Testimonials Section */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-12 text-white mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Watch Video Testimonials</h2>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                See and hear directly from our successful business owners about their MeraDukan journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {testimonials.slice(0, 4).map((testimonial) => (
                <div key={testimonial.id} className="group">
                  <div className="relative bg-black/20 rounded-2xl overflow-hidden border border-white/20">
                    <div className="w-full h-48 bg-black/30 flex items-center justify-center">
                      <PlayCircleOutlined className="text-5xl text-white/80 group-hover:text-white transition-colors" />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-lg mb-2">{testimonial.name}</div>
                      <div className="text-green-100 text-sm">{testimonial.business}</div>
                      <div className="flex mt-2">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        VIDEO
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of successful businesses and start your transformation journey with MeraDukan today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center space-x-3">
                  <UserOutlined />
                  <span>Start Your Free Trial</span>
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-green-500 hover:text-green-600 transition-colors flex items-center space-x-3">
                  <WhatsAppOutlined />
                  <span>Talk to Our Team</span>
                </button>
              </div>
              <div className="mt-6 flex items-center justify-center space-x-4 text-gray-500">
                <VerifiedOutlined className="text-green-500" />
                <span>Trusted by 5000+ businesses across India</span>
                <HeartOutlined className="text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
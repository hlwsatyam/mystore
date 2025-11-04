import React from 'react';
import { 
 
  FlagOutlined,
 
  CheckCircleOutlined,
  PlayCircleOutlined,
  MessageOutlined,
 
  UserOutlined,
 
  ShopOutlined
} from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  // Team Members
  const teamMembers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Founder & CEO',
      description: 'Ex-Amazon, IIT Delhi alumnus with 10+ years in e-commerce',
      avatar: '👨‍💼',
      expertise: ['E-commerce', 'Strategy', 'Leadership'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'CTO',
      description: 'Former Google engineer with expertise in scalable systems',
      avatar: '👩‍💻',
      expertise: ['Technology', 'AI/ML', 'Infrastructure'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: 3,
      name: 'Amit Kumar',
      role: 'Head of Product',
      description: 'Product visionary with 8+ years in SaaS platforms',
      avatar: '🎯',
      expertise: ['Product Management', 'UX', 'Innovation'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: 4,
      name: 'Neha Gupta',
      role: 'Head of Operations',
      description: 'Operations expert with background in supply chain management',
      avatar: '⚙️',
      expertise: ['Operations', 'Logistics', 'Customer Success'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  // Company Timeline
  const timeline = [
    {
      year: '2023',
      month: 'January',
      title: 'Company Founded',
      description: 'MeraDukan was born with a vision to digitize local businesses across India',
      icon: '🚀'
    },
    {
      year: '2023',
      month: 'March',
      title: 'First 100 Vendors',
      description: 'Onboarded first 100 vendors in Delhi-NCR region',
      icon: '🎯'
    },
    {
      year: '2023',
      month: 'June',
      title: 'WhatsApp Integration',
      description: 'Launched revolutionary WhatsApp Business integration',
      icon: '💬'
    },
    {
      year: '2023',
      month: 'September',
      title: '1000+ Vendors',
      description: 'Crossed 1000 vendor milestone across 50+ cities',
      icon: '🏆'
    },
    {
      year: '2024',
      month: 'January',
      title: '5000+ Vendors',
      description: 'Expanded to 5000+ vendors serving 50,000+ customers',
      icon: '📈'
    },
    {
      year: '2024',
      month: 'Present',
      title: 'National Expansion',
      description: 'Operating in 100+ cities across India with 100+ team members',
      icon: '🌍'
    }
  ];

  // Company Values
  const values = [
    {
      icon: '🤝',
      title: 'Customer First',
      description: 'Our vendors and their customers are at the heart of everything we do'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We constantly innovate to solve real problems for Indian businesses'
    },
    {
      icon: '🔓',
      title: 'Transparency',
      description: 'We believe in open, honest communication and clear pricing'
    },
    {
      icon: '🌱',
      title: 'Growth Mindset',
      description: 'We help businesses grow while continuously improving ourselves'
    },
    {
      icon: '🇮🇳',
      title: 'Made for India',
      description: 'Built specifically for Indian business needs and challenges'
    },
    {
      icon: '⚡',
      title: 'Speed & Agility',
      description: 'We move fast and adapt quickly to market changes'
    }
  ];

  // Milestones
  const milestones = [
    {
      number: '5000+',
      label: 'Active Vendors',
      icon: '🏪'
    },
    {
      number: '50,000+',
      label: 'Happy Customers',
      icon: '😊'
    },
    {
      number: '100+',
      label: 'Cities Across India',
      icon: '🏙️'
    },
    {
      number: '1,00,000+',
      label: 'Orders Processed',
      icon: '📦'
    },
    {
      number: '₹50Cr+',
      label: 'Business Generated',
      icon: '💰'
    },
    {
      number: '4.9/5',
      label: 'Customer Rating',
      icon: '⭐'
    }
  ];

  // Awards & Recognition
  const awards = [
    {
      title: 'Best Startup 2024',
      organization: 'Startup India',
      year: '2024',
      icon: '🏆'
    },
    {
      title: 'Digital India Award',
      organization: 'Government of India',
      year: '2023',
      icon: '🎖️'
    },
    {
      title: 'Top E-commerce Platform',
      organization: 'ET Startup Awards',
      year: '2023',
      icon: '⭐'
    },
    {
      title: 'Innovation in Retail',
      organization: 'Retail Association of India',
      year: '2023',
      icon: '💡'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-500 to-blue-500 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                  <FlagOutlined className="mr-2" />
                  <span className="font-semibold">Our Story</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                  Building India's
                  <span className="block text-yellow-300">
                    Digital Economy
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
                  We're on a mission to empower every local business in India with cutting-edge technology. 
                  From small kirana stores to large retailers, we're making digital commerce accessible to all.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center space-x-3">
                    <PlayCircleOutlined />
                    <span>Watch Our Story</span>
                  </button>
                  <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center space-x-3">
                    <MessageOutlined />
                    <span>Contact Us</span>
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
                  <div className="text-center">
                    <div className="text-8xl mb-6">🇮🇳</div>
                    <h3 className="text-3xl font-bold mb-4">Made for India</h3>
                    <p className="text-lg opacity-90">
                      Built with love for Indian businesses, understanding local challenges and creating global solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8">
                <div className="text-6xl mb-6">🎯</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  To democratize e-commerce for every local business in India, making advanced technology accessible, affordable, and easy to use for shopkeepers and entrepreneurs across the nation.
                </p>
                <ul className="space-y-3">
                  {[
                    'Make digital commerce accessible to all',
                    'Empower local businesses with technology',
                    'Create equal opportunities for growth',
                    'Build India digital economy from ground up'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-700">
                      <CheckCircleOutlined className="text-green-500 text-xl" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <div className="text-6xl mb-6">🔭</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Vision</h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  To create a world where no local business is left behind in the digital revolution, where every shopkeeper can compete with large corporations on a level playing field.
                </p>
                <ul className="space-y-3">
                  {[
                    'Digitize 1 million businesses by 2027',
                    'Create India largest local commerce network',
                    'Pioneer innovation in small business tech',
                    'Build most trusted platform for local stores'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-700">
                      <CheckCircleOutlined className="text-blue-500 text-xl" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do - from product development to customer support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a simple idea to transforming thousands of businesses across India
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100">
                  <div className="text-4xl mb-4">{milestone.icon}</div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{milestone.number}</div>
                  <div className="text-gray-600 font-semibold">{milestone.label}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative mb-12 ${index % 2 === 0 ? 'pr-1/2' : 'pl-1/2'}`}>
                  <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${
                    index % 2 === 0 ? 'mr-8' : 'ml-8'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-2xl font-bold text-gray-800">{item.year}</span>
                          <span className="text-green-600 font-semibold">{item.month}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className={`absolute top-6 w-4 h-4 bg-green-500 rounded-full border-4 border-white ${
                    index % 2 === 0 ? 'right-0 transform translate-x-1/2' : 'left-0 transform -translate-x-1/2'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Meet Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate individuals working together to revolutionize local commerce in India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.description}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.expertise.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      LinkedIn
                    </button>
                    <button className="text-blue-400 hover:text-blue-500 transition-colors">
                      Twitter
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Hiring CTA */}
            <div className="text-center mt-16">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 inline-block">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Mission</h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  We're always looking for talented people who are passionate about transforming Indian commerce.
                </p>
                <button className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
                  View Open Positions
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Awards & <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Recognition</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Recognition from industry leaders and government bodies for our innovation and impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {awards.map((award, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100">
                  <div className="text-5xl mb-4">{award.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{award.title}</h3>
                  <p className="text-gray-600 mb-2">{award.organization}</p>
                  <div className="text-green-600 font-semibold">{award.year}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Responsibility */}
        <section className="py-20 bg-gradient-to-br from-green-500 to-blue-500 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Giving Back to
                  <span className="block text-yellow-300">Community</span>
                </h2>
                <p className="text-xl opacity-90 leading-relaxed mb-8">
                  We believe in creating positive social impact alongside business growth. Our initiatives focus on empowering underprivileged entrepreneurs and supporting local communities.
                </p>

                <div className="space-y-4">
                  {[
                    'Free digital literacy programs for small businesses',
                    'Special discounts for women entrepreneurs',
                    'Support for rural business development',
                    'Environmental sustainability initiatives'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircleOutlined className="text-yellow-300 text-xl" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '500+', label: 'Businesses Trained', icon: '🎓' },
                  { number: '1000+', label: 'Women Entrepreneurs', icon: '👩‍💼' },
                  { number: '50+', label: 'Villages Reached', icon: '🏞️' },
                  { number: '₹25L+', label: 'Community Investment', icon: '💝' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/20">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold mb-1">{stat.number}</div>
                    <div className="text-green-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Ready to Be Part of Our Story?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a business looking to go digital or someone who wants to join our mission, we'd love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg flex items-center space-x-3">
                <ShopOutlined />
                <span>Start Your Store</span>
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-green-500 hover:text-green-600 transition-colors flex items-center space-x-3">
                <UserOutlined />
                <span>Join Our Team</span>
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-green-500 hover:text-green-600 transition-colors flex items-center space-x-3">
                <MessageOutlined />
                <span>Partner With Us</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
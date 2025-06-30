import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Mic, 
  ShoppingBag, 
  BookOpen,
  Zap,
  Users,
  Award,
  ExternalLink
} from 'lucide-react';
import { BoltBadge } from '../components/BoltBadge';

export function Dashboard() {
  const features = [
    {
      icon: Upload,
      title: 'Upload PDFs',
      description: 'Drag and drop your educational PDFs for instant processing',
      path: '/upload',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'AI Summarization',
      description: 'Get intelligent summaries powered by GPT-4o',
      path: '/summarize',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Mic,
      title: 'Voice AI',
      description: 'Listen to summaries with natural voice generation',
      path: '/voice',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: ShoppingBag,
      title: 'Science Store',
      description: 'Discover educational tools and science kits',
      path: '/store',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { label: 'PDFs Processed', value: '1,234', icon: FileText },
    { label: 'Hours Saved', value: '567', icon: Zap },
    { label: 'Students Helped', value: '2,890', icon: Users },
    { label: 'Success Rate', value: '99.8%', icon: Award }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Learn Smarter with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Voice AI
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Transform your PDF documents into engaging audio summaries with the power of AI. 
            Upload, summarize, and listen - all in one seamless educational experience.
          </p>
          
          {/* Bolt Badge Showcase */}
          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-slate-600">Built with</span>
            <BoltBadge size="large" position="inline" />
            <span className="text-slate-600">for the Bolt Hackathon</span>
          </motion.div>

          <Link to="/upload">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning Now
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <Link key={index} to={feature.path}>
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Hackathon Info Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <BoltBadge size="large" position="inline" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Built for the Bolt Hackathon 2025</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            This application showcases the power of AI-driven education technology, 
            combining multiple cutting-edge services to create an innovative learning experience.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Voice AI Challenge', desc: 'ElevenLabs Integration' },
              { title: 'Make Money Challenge', desc: 'RevenueCat Subscriptions' },
              { title: 'Deploy Challenge', desc: 'Netlify Hosting' },
              { title: 'Startup Challenge', desc: 'Complete EdTech Solution' }
            ].map((challenge, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                <p className="text-sm opacity-80">{challenge.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-3 bg-white text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span>Visit Bolt.new</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              to="/sponsors"
              className="flex items-center space-x-2 px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors"
            >
              <span>View Sponsors</span>
              <Users className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your learning?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already learning more efficiently with our AI-powered platform.
          </p>
          <Link to="/auth">
            <motion.button
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-slate-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
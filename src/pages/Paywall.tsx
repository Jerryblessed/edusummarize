import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, Zap, ExternalLink } from 'lucide-react';

export function Paywall() {
  const plans = [
    {
      name: 'Student',
      price: '$9.99',
      period: '/month',
      description: 'Perfect for individual learners',
      features: [
        '50 PDF uploads per month',
        'AI summarization',
        'Voice generation',
        'Basic support',
        'Mobile app access'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$19.99',
      period: '/month',
      description: 'For serious students and educators',
      features: [
        'Unlimited PDF uploads',
        'Advanced AI summarization',
        'Premium voice options',
        'Priority support',
        'Offline downloads',
        'Conversation AI (Beta)'
      ],
      popular: true
    },
    {
      name: 'Institution',
      price: '$49.99',
      period: '/month',
      description: 'For schools and organizations',
      features: [
        'Everything in Pro',
        'Team management',
        'Usage analytics',
        'Custom integrations',
        'Dedicated support',
        'Volume discounts'
      ],
      popular: false
    }
  ];

  const handleUpgrade = (planName: string) => {
    // RevenueCat web payment URL
    window.open('https://pay.rev.cat/yxalebvhhekcfjfc/user-yh', '_blank');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-8 h-8 text-yellow-500 fill-current mr-3" />
            <h1 className="text-4xl font-bold text-slate-900">
              Upgrade Your Learning
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Unlock the full potential of AI-powered education with our premium plans. 
            Choose the plan that best fits your learning needs.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-white rounded-3xl p-8 shadow-sm border ${
                plan.popular 
                  ? 'border-blue-300 ring-2 ring-blue-100' 
                  : 'border-slate-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-600 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-600 ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                onClick={() => handleUpgrade(plan.name)}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-3 font-semibold rounded-2xl transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Choose {plan.name}</span>
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Comparison */}
        <motion.div
          className="bg-slate-50 rounded-3xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Why Upgrade?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Unlimited Processing',
                description: 'Process as many PDFs as you need without restrictions'
              },
              {
                icon: Crown,
                title: 'Premium Features',
                description: 'Access advanced AI models and voice generation options'
              },
              {
                icon: ExternalLink,
                title: 'Priority Support',
                description: 'Get help when you need it with dedicated customer support'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          className="mt-16 text-center bg-green-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            30-Day Money Back Guarantee
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Try our premium features risk-free. If you're not completely satisfied 
            within 30 days, we'll refund your purchase, no questions asked.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
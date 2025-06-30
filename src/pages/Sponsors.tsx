import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart } from 'lucide-react';

interface Sponsor {
  name: string;
  logo: string;
  url: string;
  description: string;
  category: string;
}

export function Sponsors() {
  const sponsors: Sponsor[] = [
    {
      name: 'RevenueCat',
      logo: 'https://raw.githubusercontent.com/Jerryblessed/bolt-hackathon-badge/59cace5d72567411298dc94bd6e16c7612b07f48/src/public/revenuecat/wordmark-black.svg',
      url: 'https://revenuecat.com',
      description: 'Powering our subscription management and paywall systems',
      category: 'Monetization'
    },
    {
      name: 'Supabase',
      logo: 'https://github.com/Jerryblessed/bolt-hackathon-badge/blob/main/src/public/supabase/logo-color.png?raw=true',
      url: 'https://supabase.com',
      description: 'Providing secure authentication and database services',
      category: 'Backend'
    },
    {
      name: 'ElevenLabs',
      logo: 'https://github.com/Jerryblessed/bolt-hackathon-badge/blob/main/src/public/elevenlabs/logo-color.png?raw=true',
      url: 'https://elevenlabs.io',
      description: 'Delivering cutting-edge voice AI and conversational technology',
      category: 'AI Voice'
    },
    {
      name: 'Netlify',
      logo: 'https://raw.githubusercontent.com/Jerryblessed/bolt-hackathon-badge/59cace5d72567411298dc94bd6e16c7612b07f48/src/public/netlify/wordmark-color.svg',
      url: 'https://netlify.com',
      description: 'Hosting and deployment platform for modern web applications',
      category: 'Deployment'
    },
    {
      name: 'Bolt',
      logo: 'https://github.com/Jerryblessed/bolt-hackathon-badge/blob/main/src/public/bolt-badge/black_circle_360x360/black_circle_360x360.png?raw=true',
      url: 'https://bolt.new',
      description: 'The AI-powered development platform that made this app possible',
      category: 'Development'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-red-500 fill-current mr-3" />
            <h1 className="text-4xl font-bold text-slate-900">
              Our Amazing Sponsors
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            This project wouldn't be possible without the incredible tools and platforms 
            provided by our sponsors. Each one plays a crucial role in delivering the 
            best educational experience.
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {sponsors.map((sponsor, index) => (
            <motion.a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-all group-hover:border-blue-200">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                    {sponsor.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>

                <div className="flex items-center justify-center h-16 mb-6">
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {sponsor.name}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {sponsor.description}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Thank You Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Heart className="w-16 h-16 mx-auto mb-6 fill-current opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            A huge thank you to all our sponsors for providing the tools and platforms 
            that make innovative educational technology possible. Your support enables 
            us to create better learning experiences for students worldwide.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Cutting-edge technology'
              },
              {
                title: 'Reliability',
                description: 'Trusted by developers'
              },
              {
                title: 'Community',
                description: 'Supporting creators'
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="opacity-90">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hackathon Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-slate-50 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Built for the Bolt Hackathon
            </h3>
            <p className="text-slate-600 mb-6">
              This application was created as part of the Bolt Hackathon, showcasing 
              the power of AI-powered development tools and modern web technologies.
            </p>
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <span>Learn More About Bolt</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
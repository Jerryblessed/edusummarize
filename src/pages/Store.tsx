import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ExternalLink } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  description: string;
  category: string;
}

export function Store() {
  const products: Product[] = [
    {
      id: 1,
      name: 'Complete Chemistry Lab Kit',
      price: '$149.99',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Professional chemistry set with beakers, test tubes, and safety equipment',
      category: 'Chemistry'
    },
    {
      id: 2,
      name: 'Digital Microscope 1000x',
      price: '$89.99',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/60022/microscope-slide-research-close-up-60022.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'High-resolution digital microscope perfect for biology studies',
      category: 'Biology'
    },
    {
      id: 3,
      name: 'Physics Mechanics Set',
      price: '$199.99',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Explore forces, motion, and energy with this comprehensive physics kit',
      category: 'Physics'
    },
    {
      id: 4,
      name: 'Arduino Starter Kit',
      price: '$65.99',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn programming and electronics with hands-on projects',
      category: 'Technology'
    },
    {
      id: 5,
      name: 'Geology Rock Collection',
      price: '$34.99',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/1049557/pexels-photo-1049557.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: '50+ different minerals and rocks with identification guide',
      category: 'Earth Science'
    },
    {
      id: 6,
      name: 'Solar System Model Kit',
      price: '$79.99',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Build and explore our solar system with this educational model',
      category: 'Astronomy'
    }
  ];

  const categories = ['All', 'Chemistry', 'Biology', 'Physics', 'Technology', 'Earth Science', 'Astronomy'];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Science Store
          </h1>
          <p className="text-xl text-slate-600">
            Discover amazing educational tools and science kits
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {product.name}
                </h3>
                
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-slate-600 ml-2">
                      ({product.rating})
                    </span>
                  </div>
                  
                  <span className="text-2xl font-bold text-orange-600">
                    {product.price}
                  </span>
                </div>

                <motion.button
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-2xl hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Educational Benefits Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Science Kits?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Each kit is carefully selected to provide hands-on learning experiences that complement 
            your digital studies. Perfect for students, teachers, and science enthusiasts.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: 'Educational Value',
                description: 'Aligned with curriculum standards'
              },
              {
                title: 'Quality Materials',
                description: 'Safe, durable, and long-lasting'
              },
              {
                title: 'Expert Support',
                description: 'Comprehensive guides and tutorials'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="opacity-90">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
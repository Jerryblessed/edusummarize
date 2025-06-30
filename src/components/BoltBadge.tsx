import React from 'react';
import { motion } from 'framer-motion';

interface BoltBadgeProps {
  size?: 'small' | 'medium' | 'large';
  position?: 'fixed' | 'inline';
}

export function BoltBadge({ size = 'medium', position = 'fixed' }: BoltBadgeProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const positionClasses = position === 'fixed' 
    ? 'fixed top-4 right-4 z-50' 
    : 'inline-block';

  return (
    <motion.a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className={positionClasses}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: position === 'fixed' ? 0.5 : 0 }}
    >
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden shadow-lg border-2 border-white hover:border-blue-200 transition-colors`}>
        <img
          src="https://github.com/Jerryblessed/bolt-hackathon-badge/blob/main/src/public/bolt-badge/black_circle_360x360/black_circle_360x360.png?raw=true"
          alt="Bolt Hackathon Badge"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.a>
  );
}
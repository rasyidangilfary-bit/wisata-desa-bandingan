/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const StarField = () => {
  // Reduced star count for performance
  const stars = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-primary will-change-[opacity,transform]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            transform: 'translateZ(0)'
          }}
          initial={{ opacity: star.opacity, scale: 1 }}
          animate={{
            opacity: [star.opacity, 1, star.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration * 2, // Slower animation
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      
      <StarField />

      {/* Blob 1: Sage Green */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[90vw] h-[90vw] bg-primary rounded-full mix-blend-multiply filter blur-[80px] opacity-20"
      />

      {/* Blob 2: Warm Beige */}
      <div
        className="absolute top-[20%] right-[-20%] w-[100vw] h-[80vw] bg-secondary rounded-full mix-blend-multiply filter blur-[80px] opacity-30"
      />

      {/* Blob 3: Earthy Brown */}
      <div
        className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-accent rounded-full mix-blend-multiply filter blur-[80px] opacity-15"
      />

      {/* Static Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/10 to-background/60 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;
import React from 'react';
import { motion } from 'framer-motion';
import { KulinerItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface KulinerCardProps {
  item: KulinerItem;
  onClick: () => void;
}

const KulinerCard: React.FC<KulinerCardProps> = ({ item, onClick }) => {
  return (
    <motion.div
      className="group relative h-[400px] md:h-[500px] w-full overflow-hidden border-b md:border-r border-foreground/10 bg-background cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      data-cursor-text="VIEW"
      onClick={onClick}
    >
      {/* Image Background with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={item.image} 
          alt={item.title} 
          className="h-full w-full object-cover grayscale will-change-transform"
          variants={{
            rest: { scale: 1, opacity: 0.6, filter: 'grayscale(100%)' },
            hover: { scale: 1.05, opacity: 0.9, filter: 'grayscale(0%)' }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-background/30 group-hover:bg-primary/20 transition-colors duration-500" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-end items-start">
           <motion.div
             variants={{
               rest: { opacity: 0, x: 20, y: -20 },
               hover: { opacity: 1, x: 0, y: 0 }
             }}
             className="bg-primary text-background rounded-full p-2 will-change-transform shadow-lg"
           >
             <ArrowUpRight className="w-6 h-6" />
           </motion.div>
        </div>
        
        <div>
          <div className="overflow-hidden">
            <motion.h3 
              className="font-heading text-3xl md:text-4xl font-bold uppercase text-foreground mix-blend-multiply will-change-transform drop-shadow-sm"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
              transition={{ duration: 0.4 }}
            >
              {item.title}
            </motion.h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default KulinerCard;

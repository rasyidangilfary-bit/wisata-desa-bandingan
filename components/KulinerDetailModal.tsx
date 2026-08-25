import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, MessageCircle } from 'lucide-react';
import { createPortal } from 'react-dom';
import { KulinerItem } from '../types';

interface KulinerDetailModalProps {
  item: KulinerItem | null;
  onClose: () => void;
}

const KulinerDetailModal: React.FC<KulinerDetailModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!item) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex items-center justify-center w-screen h-screen bg-black/50 backdrop-blur-sm cursor-auto"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl mx-4 bg-[#F5F5F0] shadow-2xl rounded-xl z-10 flex flex-col md:flex-row min-h-[400px] md:min-h-[500px] lg:min-h-[550px] items-stretch max-h-[90vh] overflow-y-auto overflow-x-hidden md:overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-foreground/10 text-foreground hover:bg-primary hover:text-background transition-colors"
            data-hover="true"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Side */}
          <div className="relative w-full md:w-1/2 h-48 md:h-auto bg-stone-200 overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r" />
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 p-5 pb-8 md:p-12 flex flex-col justify-center relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 md:gap-3 text-primary mb-3 md:mb-4">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="font-sans text-xs md:text-sm tracking-widest uppercase">{item.address}</span>
              </div>
              
              <h3 className="text-2xl md:text-5xl font-heading font-bold uppercase leading-none mb-6 md:mb-8 text-foreground">
                {item.title}
              </h3>
              
              <p className="text-sm md:text-lg text-accent font-medium tracking-widest uppercase mb-2 md:mb-4">
                Tentang UMKM
              </p>
              
              <div className="h-px w-16 md:w-20 bg-foreground/20 mb-4 md:mb-6" />
              
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-light mb-6 md:mb-8">
                {item.description}
              </p>

              <p className="text-sm md:text-lg text-accent font-medium tracking-widest uppercase mb-2 md:mb-4">
                Produk Tersedia
              </p>
              
              <div className="h-px w-16 md:w-20 bg-foreground/20 mb-4 md:mb-6" />
              
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium mb-8 md:mb-10">
                {item.products}
              </p>

              {/* WhatsApp Action */}
              {item.whatsapp && (
                <div>
                  <a
                    href={item.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white py-3 md:py-4 px-6 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                    Pesan via WhatsApp
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default KulinerDetailModal;

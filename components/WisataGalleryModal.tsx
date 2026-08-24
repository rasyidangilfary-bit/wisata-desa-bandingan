import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { createPortal } from 'react-dom';

export interface GallerySlide {
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  altText?: string;
}

interface WisataGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: GallerySlide[];
}

const WisataGalleryModal: React.FC<WisataGalleryModalProps> = ({ isOpen, onClose, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
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

            {/* Navigation Buttons */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-background/50 text-foreground hover:bg-primary hover:text-background transition-colors border border-foreground/10 backdrop-blur-sm"
                  data-hover="true"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-background/50 text-foreground hover:bg-primary hover:text-background transition-colors border border-foreground/10 backdrop-blur-sm md:right-8"
                  data-hover="true"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Side */}
            <div className="relative w-full md:w-1/2 h-48 md:h-auto bg-stone-200 overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none shrink-0">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentSlide.image}
                  src={currentSlide.image} 
                  alt={currentSlide.altText || currentSlide.title} 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-5 pb-20 md:p-12 flex flex-col justify-center relative">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 md:gap-3 text-primary mb-3 md:mb-4">
                   <MapPin className="w-4 h-4" />
                   <span className="font-sans text-xs md:text-sm tracking-widest uppercase">{currentSlide.tag}</span>
                </div>
                
                <h3 className="text-2xl md:text-5xl font-heading font-bold uppercase leading-none mb-1 md:mb-2 text-foreground">
                  {currentSlide.title}
                </h3>
                
                <p className="text-sm md:text-lg text-accent font-medium tracking-widest uppercase mb-4 md:mb-6">
                  {currentSlide.subtitle}
                </p>
                
                <div className="h-px w-16 md:w-20 bg-foreground/20 mb-4 md:mb-6" />
                
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-light mb-4 md:mb-8">
                  {currentSlide.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
};

export default WisataGalleryModal;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle } from 'lucide-react';
import { createPortal } from 'react-dom';

interface SejarahVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SejarahVideoModal: React.FC<SejarahVideoModalProps> = ({ isOpen, onClose }) => {
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

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 cursor-auto"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-primary hover:text-background backdrop-blur-sm transition-colors"
              data-hover="true"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Section (Left side on desktop) */}
            <div className="w-full md:w-1/2 h-64 md:h-auto shrink-0 relative bg-black">
              <iframe 
                className="absolute inset-0 w-full h-full object-cover"
                src="https://www.youtube.com/embed/XFCggIhOTsI?autoplay=1&rel=0&modestbranding=1" 
                title="Sejarah Desa Bandingan" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>

            {/* Content Section (Right side on desktop) */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 text-primary mb-2 md:mb-3">
                   <PlayCircle className="w-4 h-4" />
                   <span className="font-sans text-sm tracking-widest uppercase">Video Dokumenter</span>
                </div>
                
                <h1 className="text-4xl md:text-[60px] font-heading font-bold uppercase leading-none text-foreground">
                  SEJARAH DESA BANDINGAN
                </h1>
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

export default SejarahVideoModal;

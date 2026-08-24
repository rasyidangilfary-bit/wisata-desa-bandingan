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
          className="fixed inset-0 z-[9999] flex items-center justify-center w-screen h-screen bg-black/50 backdrop-blur-sm cursor-auto"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[95vw] md:w-[85vw] lg:w-[80vw] xl:max-w-7xl mx-auto bg-[#F5F5F0] shadow-2xl rounded-xl overflow-hidden z-10 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-primary hover:text-background backdrop-blur-sm transition-colors"
              data-hover="true"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Section (Top) */}
            <div className="relative w-full aspect-video rounded-t-xl overflow-hidden bg-black">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/XFCggIhOTsI?autoplay=1&rel=0&modestbranding=1" 
                title="Sejarah Desa Bandingan" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>

            {/* Content Section (Bottom) */}
            <div className="w-full p-6 md:p-8 flex flex-col relative bg-[#F5F5F0]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 text-primary mb-2 md:mb-3">
                   <PlayCircle className="w-4 h-4" />
                   <span className="font-sans text-sm tracking-widest uppercase">Video Dokumenter</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-none text-foreground">
                  SEJARAH DESA BANDINGAN
                </h3>
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

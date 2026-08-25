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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 cursor-none"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl lg:max-w-5xl bg-black rounded-2xl shadow-2xl overflow-hidden aspect-video flex items-center justify-center cursor-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-primary hover:text-background backdrop-blur-sm transition-colors cursor-none"
              data-hover="true"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Section */}
            <iframe 
              className="absolute inset-0 w-full h-full object-cover"
              src="https://www.youtube.com/embed/XFCggIhOTsI?autoplay=1&rel=0&modestbranding=1" 
              title="Sejarah Desa Bandingan" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.body);
};

export default SejarahVideoModal;

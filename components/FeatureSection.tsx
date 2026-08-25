import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, Music, LucideIcon, ArrowUpRight } from 'lucide-react';
import GradientText from './GlitchText';
import WisataGalleryModal, { GallerySlide } from './WisataGalleryModal';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FeatureSectionProps {
  id?: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  features: Feature[];
  imageSrc: string;
  imageAlt: string;
  numberText: string;
  imageCaption: string;
  isReversed?: boolean;
  gallerySlides?: GallerySlide[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  id,
  titleLine1,
  titleLine2,
  description,
  features,
  imageSrc,
  imageAlt,
  numberText,
  imageCaption,
  isReversed = false,
  gallerySlides = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-10 md:py-16">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center`}>
          <div className={`lg:col-span-5 order-2 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
            <h2 className="text-4xl md:text-[60px] font-heading font-bold mb-4 md:mb-6 leading-tight">
              {titleLine1} <br/> <GradientText text={titleLine2} className="text-4xl md:text-[60px] text-foreground leading-tight" />
            </h2>
            <p className="text-base sm:text-lg max-w-md sm:max-w-lg md:max-w-2xl text-foreground/80 mb-6 md:mb-8 font-light leading-relaxed drop-shadow-sm">
              {description}
            </p>
            
            <div className="space-y-4 md:space-y-5">
              {features.map((feature, i) => (
                <div
                  key={i} 
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-2xl bg-background/50 backdrop-blur-md border border-foreground/10">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-bold mb-1 font-heading">{feature.title}</h4>
                    <p className="text-xs md:text-sm text-foreground/70">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`lg:col-span-7 relative h-[300px] md:h-[450px] w-full order-1 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-3xl rotate-3 opacity-30 blur-xl" />
            <div 
              className={`relative h-full w-full rounded-3xl overflow-hidden border border-foreground/10 group shadow-2xl ${gallerySlides.length > 0 ? 'cursor-pointer' : ''}`}
              onClick={() => gallerySlides.length > 0 && setIsModalOpen(true)}
              data-hover={gallerySlides.length > 0 ? "true" : undefined}
              data-cursor-text={gallerySlides.length > 0 ? "VIEW" : undefined}
            >
              <img 
                loading="lazy"
                src={imageSrc} 
                alt={imageAlt} 
                className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 will-change-transform" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8">
                <div className="text-4xl md:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-background to-background/0 opacity-50">
                  {numberText}
                </div>
                <div className="text-base md:text-lg font-bold tracking-widest uppercase mt-1 text-background">
                  {imageCaption}
                </div>
              </div>
              
              {gallerySlides.length > 0 && (
                <div className="absolute top-6 right-6 md:top-8 md:right-8 p-2 rounded-full bg-primary text-background opacity-0 translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 will-change-transform shadow-lg z-20">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {gallerySlides.length > 0 && (
        <WisataGalleryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          slides={gallerySlides}
        />
      )}
    </>
  );
};

export default FeatureSection;

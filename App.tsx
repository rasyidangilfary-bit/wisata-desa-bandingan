/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight, Instagram, Youtube, ArrowUpRight, MessageCircle, Home, Tractor, Leaf, Box, Footprints, Gem, Shield, Sparkles, Users } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import KulinerCard from './components/KulinerCard';
import KulinerDetailModal from './components/KulinerDetailModal';
import { Artist, KulinerItem } from './types';

import FeatureSection from './components/FeatureSection';
import SejarahVideoModal from './components/SejarahVideoModal';

// Dummy Data

const kulinerData: KulinerItem[] = [
  {
    id: 1,
    title: "Berkah Sayur",
    image: "https://res.cloudinary.com/dperkgbpn/image/upload/f_auto,q_auto/v1787479322/IMG-20260821-WA0009_aeqoke.jpg",
    description: "Berkah Sayur merupakan UMKM yang menyediakan berbagai kebutuhan sehari-hari, mulai dari sayuran segar hingga aneka bumbu dapur dan sembako. Berlokasi di Pasar Caplek Bandingan, Berkah Sayur hadir untuk memenuhi kebutuhan bahan makanan dan kebutuhan rumah tangga masyarakat Desa Bandingan dan sekitarnya.",
    products: "Berbagai macam sayuran segar, bumbu dapur, sembako, dan kebutuhan rumah tangga lainnya.",
    address: "Pasar Caplek Bandingan, Kec. Bawang, Banjarnegara",
    whatsapp: "https://wa.me/6289670987797"
  },
  {
    id: 2,
    title: "Keripik Masissoo",
    image: "https://res.cloudinary.com/dperkgbpn/image/upload/f_auto,q_auto/v1787479304/IMG-20260821-WA0007_zdjcsg.jpg",
    description: "Keripik Pisang dan Talas Masissoo merupakan UMKM Desa Bandingan yang menghadirkan berbagai pilihan camilan berbahan dasar pisang dan talas. Dengan beragam varian rasa, produk ini cocok dinikmati sebagai camilan sehari-hari, teman bersantai, maupun oleh-oleh khas dari Desa Bandingan.",
    products: "Keripik Pisang (Original, Matcha, Coklat, Balado Pedas Asin) & Keripik Talas (Balado, Jagung Manis).",
    address: "RT 01 RW 02, Desa Bandingan, Kec. Bawang",
    whatsapp: "https://wa.me/6281329383053"
  },
  {
    id: 3,
    title: "Ngodeg Arva",
    image: "https://res.cloudinary.com/dperkgbpn/image/upload/f_auto,q_auto/v1787479310/IMG-20260821-WA0005_nx6c8u.jpg",
    description: "Ngodeg Arva merupakan UMKM Desa Bandingan yang menyediakan berbagai pilihan minuman segar berbahan dasar kelapa. Dengan cita rasa yang menyegarkan, produk Ngodeg Arva cocok dinikmati saat cuaca panas maupun sebagai teman bersantai.",
    products: "Es Kuwut, Es Degan Pink, dan Kelapa Muda Ori.",
    address: "RT 05 RW 02, Desa Bandingan, Kec. Bawang",
    whatsapp: "https://wa.me/6285694166620"
  }
];

// Dummy Data
const LINEUP: Artist[] = [
  { 
    id: '1', 
    name: 'Pine Ridge Trail', 
    genre: 'Nature Walk', 
    day: 'SAT 12', 
    image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1000&auto=format&fit=crop',
    description: 'A serene path through ancient pine forests. Let the scent of fresh pine needles and the sound of rustling leaves guide you to inner peace.'
  },
  { 
    id: '2', 
    name: 'Harvest Market', 
    genre: 'Local Culture', 
    day: 'SUN 13', 
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1000&auto=format&fit=crop',
    description: 'Experience the vibrant colors and tastes of our village. Fresh organic produce, handmade crafts, and warm smiles from local artisans.'
  },
  { 
    id: '3', 
    name: 'Lake Serenity', 
    genre: 'Relaxation', 
    day: 'ALL WEEK', 
    image: 'https://images.unsplash.com/photo-1437651025703-2858c944e341?q=80&w=1000&auto=format&fit=crop',
    description: 'A pristine mirror of water reflecting the majestic mountains. Perfect for morning meditation, gentle kayaking, or simply sitting in silence.'
  },
  { 
    id: '4', 
    name: 'Rustic Cabin Stays', 
    genre: 'Accommodation', 
    day: 'NIGHTLY', 
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop',
    description: 'Cozy, handcrafted log cabins equipped with modern comforts but free from digital distractions. Fall asleep to the sound of crickets.'
  },
  { 
    id: '5', 
    name: 'Old Mill Workshop', 
    genre: 'Heritage', 
    day: 'TUE & THU', 
    image: 'https://images.unsplash.com/photo-1590483868007-802bdc1cf9e3?q=80&w=1000&auto=format&fit=crop',
    description: 'Learn traditional crafts from village elders in the restored 19th-century water mill. Pottery, weaving, and woodworking classes available.'
  },
  { 
    id: '6', 
    name: 'Stargazing Peak', 
    genre: 'Astronomy', 
    day: 'NIGHTLY', 
    image: 'https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=1000&auto=format&fit=crop',
    description: 'Far from city lights, our mountain peak offers an unobstructed view of the cosmos. Wrap up in a blanket and watch the Milky Way rise.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedKuliner, setSelectedKuliner] = useState<KulinerItem | null>(null);
  const [isSejarahModalOpen, setIsSejarahModalOpen] = useState(false);

  // Handle keyboard navigation for artist modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedArtist) return;
      if (e.key === 'ArrowLeft') navigateArtist('prev');
      if (e.key === 'ArrowRight') navigateArtist('next');
      if (e.key === 'Escape') setSelectedArtist(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtist]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateArtist = (direction: 'next' | 'prev') => {
    if (!selectedArtist) return;
    const currentIndex = LINEUP.findIndex(a => a.id === selectedArtist.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % LINEUP.length;
    } else {
      nextIndex = (currentIndex - 1 + LINEUP.length) % LINEUP.length;
    }
    setSelectedArtist(LINEUP[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-foreground selection:bg-primary selection:text-background cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-foreground cursor-default z-50">DESA BANDINGAN</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Wisata', 'Kuliner', 'Sejarah'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-primary transition-colors text-foreground cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('info')}
          className="hidden md:inline-block border border-foreground px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-300 text-foreground cursor-pointer bg-transparent"
          data-hover="true"
          aria-label="Cari info biaya sewa tempat manasik banjarnegara"
        >
          INFO
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Wisata', 'Kuliner', 'Sejarah'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-heading font-bold text-foreground hover:text-primary transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('info')}
              className="mt-8 border border-primary px-10 py-4 text-sm font-bold tracking-widest uppercase bg-primary text-background"
              aria-label="Cari info biaya sewa tempat manasik banjarnegara"
            >
              INFO
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Watermark Background Image */}
        <img 
          src="https://res.cloudinary.com/dperkgbpn/image/upload/v1784078710/IMG-20260714-WA0033_mjzi9b.jpg" 
          alt="Tempat wisata di banjarnegara terbaru, pemandangan alam desa wisata banjarnegara" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity z-[-1]" 
        />
        {/* Color Overlay to forcefully dye the image with the theme's color */}
        <div className="absolute inset-0 bg-background mix-blend-color opacity-80 z-[-1]"></div>

        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Date / Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-sans text-primary tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-secondary/30 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <span className="md:hidden">BANJARNEGARA</span>
            <span className="hidden md:inline">KABUPATEN BANJARNEGARA</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full animate-pulse"/>
            <span className="md:hidden">BAWANG</span>
            <span className="hidden md:inline">KECAMATAN BAWANG</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center">
            <GradientText 
              text="DESA BANDINGAN" 
              as="h1" 
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] font-black tracking-tighter text-center text-foreground" 
            />
            {/* Optimized Orb - Reduced Blur for Performance */}
            <motion.div 
               className="absolute -z-20 w-[50vw] h-[50vw] bg-primary/20 blur-[60px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 6, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto text-foreground/80 leading-relaxed drop-shadow-sm px-4"
          >
            Destinasi Desa Wisata Banjarnegara
          </motion.p>
        </motion.div>

        {/* MARQUEE - SLOWED DOWN for Performance & Aesthetics */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-3 md:py-4 bg-primary text-background z-20 overflow-hidden border-y-4 border-primary shadow-[0_0_40px_rgba(76,107,93,0.2)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Duplicate content for seamless loop */}
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-2xl md:text-5xl font-heading font-black px-8 flex items-center gap-4">
                    WISATA EDUKASI AGROWISATA <span className="text-background text-xl md:text-3xl">●</span> 
                    WISATA RELIGI MAKAM <span className="text-background text-xl md:text-3xl">●</span> 
                    MANASIK HAJI <span className="text-background text-xl md:text-3xl">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* MIDDLE SECTIONS WRAPPER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-background via-stone-200 via-20% to-secondary/40">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-[10%] -right-32 w-80 h-80 md:w-[500px] md:h-[500px] bg-green-800/20 rounded-full blur-[100px] pointer-events-none z-[0]" />
        <div className="absolute top-[45%] -left-40 w-72 h-72 md:w-[600px] md:h-[600px] bg-green-800/15 rounded-full blur-[120px] pointer-events-none z-[0]" />
        <div className="absolute bottom-[10%] -right-20 w-96 h-96 md:w-[400px] md:h-[400px] bg-green-900/20 rounded-full blur-[90px] pointer-events-none z-[0]" />

      {/* EXPERIENCE SECTION */}
      <section id="wisata" className="relative z-10 py-16 md:py-24 bg-transparent backdrop-blur-sm border-t border-foreground/10 overflow-hidden flex flex-col gap-y-16">

        <FeatureSection
          titleLine1="Wisata Edukasi"
          titleLine2="AGROWISATA"
          description="Kawasan agrowisata edukasi ini merupakan destinasi liburan keluarga untuk sarana edukasi pertanian dan menikmati suasana alam pedesaan yang asri. Di sini, pengunjung dari segala usia bisa bersantai dan belajar tentang kelestarian lingkungan melalui berbagai pengalaman di kawasan yang sejuk"
          features={[
            { icon: Home, title: 'Joglo Tradisional', desc: 'Bangunan Joglo untuk merasakan suasana pedesaan.' },
            { icon: Tractor, title: 'Alat Pertanian Modern', desc: 'Macam-macam alat pertanian canggih.' },
            { icon: Leaf, title: 'Ladang Sayur dan buah', desc: 'Pengunjung dapat melihat sayur dan buah buahan dirawat dan dipanen.' },
          ]}
          imageSrc="https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1787103690/IMG_1453_cmjel6.jpg"
          imageAlt="Sewa joglo di banjarnegara, tempat wisata edukasi untuk anak tk di banjarnegara"
          numberText="01"
          imageCaption="Agrowisata"
          isReversed={false}
          gallerySlides={[
            {
              image: 'https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1787103690/IMG_1453_cmjel6.jpg',
              title: 'Joglo Tradisional',
              subtitle: 'Pusat Budaya',
              description: 'Di bawah naungan hutan yang asri, berdiri bangunan Joglo megah dan pendopo. Di sinilah pengunjung bisa merasakan kedamaian suasana pedesaan. Tempat ini sangat ideal untuk beristirahat, menggelar pertemuan keluarga, atau sekadar menikmati ketenangan di tepi hutan.',
              tag: 'Edukasi',
              altText: 'Sewa joglo di banjarnegara, tempat wisata edukasi untuk anak tk di banjarnegara'
            },
            {
              image: 'https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1787103692/IMG_1463_f232rp.jpg',
              title: 'Alat Pertanian Modern',
              subtitle: 'Teknologi Pertanian',
              description: 'Alat pertanian canggih, mulai dari mesin pemanen padi gabungan, traktor roda empat, hingga traktor tangan, semua alat ini merupakan bagian dari edukasi. Di sini, pengunjung dapat belajar tentang bagaimana teknologi modern membantu petani.',
              tag: 'Edukasi'
            },
            {
              image: 'https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1787103650/IMG_1456_o0lxzj.jpg',
              title: 'Ladang Sayur dan Buah',
              subtitle: 'Panen Sendiri',
              description: 'Ladang sayuran yang subur di mana barisan berbagai tanaman sayur dan buah tumbuh sehat di tanah yang subur. Pengunjung dapat melihat langsung bagaimana sayur dan buah buahan dirawat dan dipanen.',
              tag: 'Edukasi',
              altText: 'Tempat wisata panen buah sayur banjarnegara, wisata pertanian banjarnegara'
            }
          ]}
        />

        <FeatureSection
          titleLine1="Wisata"
          titleLine2="MANASIK HAJI"
          description="Wisata Manasik Haji ini menawarkan pengalaman spiritual sekaligus sarana edukasi bagi umat Muslim. Kawasan ini menjadi pusat bimbingan bagi calon jemaah haji maupun umrah, serta destinasi wisata religi keluarga. Pengunjung diajak memahami setiap tahapan rukun ibadah di area terbuka yang sejuk dan nyaman."
          features={[
            { icon: Box, title: 'Replika Ka\'bah', desc: 'Pusat simulasi tawaf yang dibuat menyerupai aslinya.' },
            { icon: Footprints, title: 'Replika Makam Ibrahim', desc: 'Tempat mengingat jejak nabi saat membangun Baitullah.' },
            { icon: Gem, title: 'Replika Hajar Aswad', desc: 'Titik penting untuk memulai dan mengakhiri putaran tawaf.' },
          ]}
          imageSrc="https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1786778576/IMG_20260815_142217_w2x7qa.jpg"
          imageAlt="Lokasi replika kabah terdekat di banjarnegara, fasilitas praktik umroh banjarnegara"
          numberText="02"
          imageCaption="Manasik Haji"
          isReversed={true}
          gallerySlides={[
            {
              image: 'https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1786778336/IMG_1444_1_rvpfbd.jpg',
              title: 'Replika Kabah',
              subtitle: 'Simulasi Thawaf',
              description: 'Di tengah area terdapat bangunan Ka\'bah yang megah. Replika ini akan memudahkan pengunjung untuk belajar tata cara mengelilingi Ka\'bah dengan lebih baik.',
              tag: 'Religi',
              altText: 'Lokasi replika kabah terdekat di banjarnegara, fasilitas praktik umroh banjarnegara'
            },
            {
              image: 'https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1786778359/IMG_1446_1_jf7x90.jpg',
              title: 'Replika Makam Ibrahim',
              subtitle: 'Jejak Nabi',
              description: 'Monumen kecil berkubah emas ini berisi tiruan jejak telapak kaki Nabi Ibrahim saat membangun Baitullah. Area ini digunakan untuk menunjukkan lokasi yang bagi jemaah untuk mendirikan salat sunah setelah selesai tawaf.',
              tag: 'Religi',
              altText: 'Tempat manasik haji anak tk banjarnegara, wisata manasik haji banjarnegara'
            },
            {
              image: 'https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1786778399/IMG_20260815_141419_iqmvme.jpg',
              title: 'Replika Hajar Aswad',
              subtitle: 'Titik Awal',
              description: 'Terletak di salah satu sudut Ka\'bah, batu hitam dengan bingkai perak ini menjadi patokan untuk memulai dan mengakhiri putaran tawaf. Di titik inilah pengunjung bisa langsung praktik bagaimana tata cara memberikan salam atau melambaikan tangan dari kejauhan.',
              tag: 'Religi'
            }
          ]}
        />

        <FeatureSection
          titleLine1="Wisata Religi"
          titleLine2="MAKAM"
          description="Destinasi ziarah bersejarah yang menjadi saksi keajaiban doa tiga leluhurnya. Di sinilah bersemayam KHR Natanegara, KHR Salim dan KHR Srinem, sosok ahli tirakat yang doanya terbukti mustajab menjadikan anak cucunya sukses sebagai Kiyai dan Pegawai Negeri hingga kini."
          features={[
            { icon: Shield, title: 'Makam KHR Natanegara', desc: 'Prajurit pada masa Perang Diponegoro yang menjadi perintis Desa Bandingan.' },
            { icon: Sparkles, title: 'Makam KHR Srinem', desc: 'Seorang ahli tirakat yang tekun bermunajat, dan doanya terbukti mustajab.' },
            { icon: Users, title: 'Makam KHR Salim', desc: 'Sosok ahli tirakat yang doanya dikabulkan sehingga keturunannya menjadi para Kiyai.' },
          ]}
          imageSrc="https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1786507148/IMG_1438_yhkzvf.jpg"
          imageAlt="Tempat ziarah makam di banjarnegara, wisata religi banjarnegara"
          numberText="03"
          imageCaption="Wisata Religi"
          isReversed={false}
          gallerySlides={[
            {
              image: 'https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1786507234/IMG_1431_spu3k9.jpg',
              title: 'KHR Natanegara',
              subtitle: 'Pendiri Desa',
              description: 'Seorang ulama sekaligus prajurit pembela bangsa. Sebagai prajurit yang gagah berani pada masa Perang Diponegoro, KHR Natanegara mewariskan semangat pantang menyerah melawan penjajahan dan menjadi tonggak awal peradaban di desa ini.',
              tag: 'Ziarah',
              altText: 'Makam KHR Natanegara, makam tokoh agama di banjarnegara'
            },
            {
              image: 'https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1786508690/IMG_1433_luvmv2.jpg',
              title: 'KHR Srinem',
              subtitle: 'Ahli Tirakat',
              description: 'Sosok tangguh yang juga merupakan ahli tirakat. Dalam hening pertapaannya, KHR Srinem bermunajat memohon agar anak cucunya kelak diberikan jalan kemuliaan untuk mengabdi kepada nusa dan bangsa sebagai Pegawai Negeri.',
              tag: 'Ziarah'
            },
            {
              image: 'https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1786508750/IMG_1432_1_on4iw0.jpg',
              title: 'KHR Salim',
              subtitle: 'Ahli Tirakat',
              description: 'Dikenal sebagai ahli tirakat dan petapa yang tekun. Sepanjang hayatnya, beliau senantiasa mendekatkan diri kepada Sang Pencipta dengan satu permohonan agar kelak keturunannya dianugerahi ilmu agama yang mendalam dan menjadi Kiyai.',
              tag: 'Ziarah'
            }
          ]}
        />
      </section>

      {/* SEJARAH SECTION */}
      <section id="sejarah" className="relative z-10 py-24 lg:py-32 bg-transparent border-t border-foreground/10">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center px-6">
          <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-sm break-words w-full md:w-auto text-foreground">
            SEJARAH <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">DESA BANDINGAN</span>
          </h2>

          <div 
            className="w-full aspect-video mt-12 relative rounded-2xl overflow-hidden shadow-2xl bg-stone-200 border border-foreground/10 group cursor-pointer" 
            data-hover="true" 
            onClick={() => setIsSejarahModalOpen(true)}
          >
            <img
              src="https://res.cloudinary.com/dperkgbpn/image/upload/f_auto/v1787474730/Screenshot_20260823_154208_com.huawei.himovie.overseas_edit_6909132176373_kky2ds.jpg"
              alt="Sejarah Video Thumbnail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Arrow Icon Hover */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 p-2 rounded-full bg-primary text-background opacity-0 translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 will-change-transform shadow-lg z-20">
              <ArrowUpRight className="w-6 h-6" />
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-500">
              <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-110">
                <Play className="w-6 h-6 text-white drop-shadow-md ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SejarahVideoModal 
        isOpen={isSejarahModalOpen}
        onClose={() => setIsSejarahModalOpen(false)}
      />
      
      <KulinerDetailModal 
        item={selectedKuliner} 
        onClose={() => setSelectedKuliner(null)} 
      />
      
      {/* LINEUP SECTION */}
      <section id="kuliner" className="relative z-10 py-20 md:py-32 border-t border-foreground/10 bg-transparent">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-sm break-words w-full md:w-auto">
              KULINER <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">DESA BANDINGAN</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 bg-background/50 backdrop-blur-sm">
            {kulinerData.slice(0, 3).map((item) => (
              <KulinerCard key={item.id} item={item} onClick={() => setSelectedKuliner(item)} />
            ))}
          </div>
        </div>
      </section>

      </div>
      {/* END MIDDLE SECTIONS WRAPPER */}

      {/* INFORMASI SECTION */}
      <section id="info" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-secondary/40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-10 text-foreground">
               INFO
             </h2>
             <p className="text-primary font-sans uppercase tracking-widest -mt-3 md:-mt-8 relative z-10 text-sm md:text-base">
               INFORMASI LENGKAP
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Lokasi Google Maps', 
                icon: MapPin, 
                description: 'Temukan rute terbaik menuju Desa Bandingan. Klik untuk membuka peta.', 
                btnText: 'Buka Peta', 
                href: 'https://maps.app.goo.gl/ekUUiShcnpoRn4PFA', 
                accent: 'bg-background/50 border-foreground/10' 
              },
              { 
                name: 'Instagram', 
                icon: Instagram, 
                description: 'Ikuti keseharian warga, update terbaru, dan pesona keindahan desa kami.', 
                btnText: 'Follow IG', 
                href: 'https://www.instagram.com/agroeduwisatareligibandingan/', 
                accent: 'bg-primary/5 border-primary/30' 
              },
              { 
                name: 'WhatsApp', 
                icon: MessageCircle, 
                description: 'Hubungi kami untuk reservasi dan informasi lebih lanjut.', 
                btnText: 'Chat WhatsApp', 
                href: 'https://wa.me/628975909153', 
                accent: 'bg-accent/5 border-accent/30' 
              },
            ].map((info, i) => {
              return (
                <motion.a
                  key={i}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -20 }}
                  className={`relative p-8 md:p-10 border border-foreground/10 backdrop-blur-md flex flex-col min-h-[450px] md:min-h-[550px] transition-colors duration-300 ${info.accent} will-change-transform group cursor-pointer block`}
                  data-hover="true"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <info.icon className="w-16 h-16 md:w-20 md:h-20 text-primary mb-8 md:mb-12" />
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-foreground">{info.name}</h3>
                    <p className="text-base text-foreground/80 leading-relaxed font-light">{info.description}</p>
                  </div>
                  
                  <div 
                    className={`w-full py-4 text-sm font-bold uppercase tracking-[0.2em] border border-primary/30 transition-all duration-300 mt-8 overflow-hidden relative text-center
                      text-foreground group-hover:bg-primary group-hover:text-background group-hover:border-primary`}
                  >
                    <span className="relative z-10">
                      {info.btnText}
                    </span>
                    <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-foreground/10 py-12 md:py-16 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-foreground">DESA BANDINGAN</div>
              <p className="text-sm text-stone-600 max-w-sm leading-relaxed">
                Destinasi Wisata Edukasi, Religi, & Agrowisata Terbaik di Kecamatan Bawang, Banjarnegara.
              </p>
            </div>
            <div className="flex flex-col md:items-end">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-2 text-foreground">UNNES GIAT 16</h4>
              <div className="flex flex-col gap-2 md:items-end text-left md:text-right">
                <a href="https://instagram.com/giat16.desabandingan" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                  @giat16.desabandingan
                </a>
                <a href="mailto:kkndesabandingan2026@gmail.com" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                  kkndesabandingan2026@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="w-full border-t border-stone-300/50 pt-6 mt-8">
            <span className="text-xs text-stone-400 text-center block">
              © 2026 Giat 16 Desa Bandingan. Crafted by M. Rasyidan Gilfary Arzad • Unnes Giat 16.
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
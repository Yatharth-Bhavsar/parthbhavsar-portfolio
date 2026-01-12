import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Mail, ChevronRight, ExternalLink } from 'lucide-react';

/**
 * CONFIGURATION & DATA
 * ------------------------------------------------
 * Content updated based on "Parth Bhavsar Art Portfolio.pdf"
 */

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Sidi Saiyed Ni Jaali",
    category: "Architecture",
    filename: "sidi-saiyed.jpg",
    description: "A handcrafted paper interpretation of the Sidi Saiyed ni Jali, highlighting the detailed latticework and the iconic 'Tree of Life' motif. This work took 21 days of careful carving.",
    featured: true,
  },
  {
    id: 2,
    title: "The Maverick's Gaze (Tesla)",
    category: "Pop Culture",
    filename: "tesla-halftone.jpg",
    description: "A paper-carved halftone portrait of Nikola Tesla. The enigmatic visage emerges from a tapestry of precise cuts, reflecting his ability to perceive the world differently.",
    featured: true,
  },
  {
    id: 3,
    title: "Built for Speed (F1 Diorama)",
    category: "Pop Culture",
    filename: "f1-diorama.jpg",
    description: "Handcrafted F1 podium finish in miniature. Features a racetrack base textured with sandpaper and safety nets made from repurposed cotton bandage.",
    featured: true,
  },
  {
    id: 4,
    title: "Digging Into Detail",
    category: "Mechanical Models",
    filename: "excavator.jpg",
    description: "Komatsu PC200 Hydraulic Excavator. Beyond its detailed appearance, the entire arm mechanism functions just like the real machine, powered by an intricate paper mechanism.",
    featured: true,
  },
  {
    id: 5,
    title: "Whispers of Vrindavan",
    category: "Sanjhi",
    filename: "krishna-sanjhi.jpg",
    description: "Portraying Radha and Krishna in the Sanjhi style. The intricate design captures their eternal love, rendered with delicate balance.",
    featured: false,
  },
  {
    id: 6,
    title: "Geometric Grace",
    category: "Islamic Geometry",
    filename: "islamic-geo-1.jpg",
    description: "Detailed artwork portraying an Islamic geometric pattern called the 9-fold Rosette. A study in patience, balance, and handcrafted detail.",
    featured: false,
  },
  {
    id: 7,
    title: "Atal Bridge",
    category: "Architecture",
    filename: "atal-bridge.jpg",
    description: "A personal tribute to an architectural landmark in Ahmedabad, showcasing how intricate detail can bring grand structures to life on a smaller scale.",
    featured: false,
  },
  {
    id: 8,
    title: "Matchbox to Melody",
    category: "Miniatures",
    filename: "guitar-mini.jpg",
    description: "A miniature guitar carefully made from a matchbox, transforming everyday items into detailed creative expressions.",
    featured: false,
  },
  {
    id: 9,
    title: "Ode to Goddess Saraswati",
    category: "Sanjhi",
    filename: "saraswati.jpg",
    description: "A paper tribute weaving together the precision of paper modeling and the soul of classical music.",
    featured: false,
  },
  {
    id: 10,
    title: "Surya Kiran Formation",
    category: "Miniatures",
    filename: "surya-kiran.jpg",
    description: "Showcasing the breathtaking precision of the IAF Surya Kiran Aerobatic Team flying the BAe Hawk Mk.132.",
    featured: false,
  }
];

const CATEGORIES = ["All", "Sanjhi", "Islamic Geometry", "Architecture", "Miniatures", "Mechanical Models", "Pop Culture"];

// --- UTILITY COMPONENTS ---

/**
 * Image Component
 * Handles the logic: Tries to load local asset, falls back to SVG placeholder if missing.
 */
const AssetImg = ({ filename, alt, className, style, isBackground = false }) => {
  const [error, setError] = useState(false);
  const path = `/assets/images/${filename}`;

  if (error) {
    if (isBackground) {
        // Fallback stock image for hero background if local file is missing
        return (
            <img 
                src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=2000"
                alt="Paper Art Texture"
                className={className}
                style={style}
            />
        )
    }
    // Elegant Placeholder Generator for gallery items
    return (
      <div 
        className={`w-full h-full bg-stone-200 flex flex-col items-center justify-center p-4 text-stone-400 ${className}`}
        style={style}
      >
        <div className="border border-stone-300 p-4 rounded-sm text-center">
          <span className="block text-xs uppercase tracking-widest mb-2">Image Asset</span>
          <span className="font-serif italic text-stone-500">{filename}</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={path} 
      alt={alt} 
      className={className}
      style={style}
      onError={() => setError(true)}
    />
  );
};

// --- MAIN APPLICATION ---

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showNav, setShowNav] = useState(false);

  // Parallax Effect & Scroll Handling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Show navbar only after scrolling past 100px
      setShowNav(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#2D2D2D] font-sans selection:bg-[#C4A484] selection:text-white overflow-x-hidden">
      
      {/* GLOBAL STYLES & ANIMATIONS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
        }

        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-up {
            animation: fadeInUp 1s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }

      `}</style>

      {/* BACKGROUND TEXTURE */}
      <div className="paper-texture"></div>

      {/* NAVIGATION */}
      <nav 
        className={`fixed top-0 w-full z-50 px-6 py-4 md:py-6 flex justify-between items-center mix-blend-difference text-white transition-all duration-700 ease-in-out ${
          showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div 
          onClick={() => scrollTo('home')}
          className="text-lg md:text-xl font-serif font-light tracking-widest uppercase cursor-pointer hover:text-[#C4A484] transition-colors"
        >
          Parth Bhavsar
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm tracking-widest uppercase font-light">
          {['Home', 'About', 'Gallery', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="hover:text-[#C4A484] transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C4A484] transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      <div className={`fixed inset-0 bg-[#F9F7F2] z-40 transform transition-transform duration-500 ease-in-out flex flex-col justify-center items-center space-y-8 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {['Home', 'About', 'Gallery', 'Contact'].map((item) => (
          <button 
            key={item}
            onClick={() => scrollTo(item.toLowerCase())}
            className="text-3xl font-serif italic text-[#2D2D2D] hover:text-[#C4A484]"
          >
            {item}
          </button>
        ))}
      </div>

      {/* SECTIONS */}
      <main className="relative z-10">
        <HomeSection scrollY={scrollY} />
        <AboutSection />
        <GallerySection items={PORTFOLIO_ITEMS} />
        <ContactSection />
      </main>

    </div>
  );
}

// --- SUB-SECTIONS ---

function HomeSection({ scrollY }) {
  return (
    <section id="home" className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#1a1a1a]">
      
      {/* Background Image Logic */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div> {/* Overlay */}
          <div 
            className="w-full h-full"
            style={{ 
                transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
                transition: 'transform 0.1s ease-out'
            }}
          >
            <AssetImg 
                filename="hero-bg.jpg" 
                alt="Background" 
                className="w-full h-full object-cover opacity-80"
                isBackground={true}
            />
          </div>
      </div>
      
      {/* Content */}
      <div className="text-center z-20 px-6 relative text-[#F9F7F2]" style={{ transform: `translateY(${-scrollY * 0.2}px)` }}>
        <p className="text-[#C4A484] text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase mb-4 md:mb-6 opacity-0 animate-fade-up delay-200">
          Paper Artist
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-serif mb-4 md:mb-8 leading-none opacity-0 animate-fade-up delay-500 text-shadow-lg">
          Parth Bhavsar
        </h1>
        <p className="font-serif italic text-lg sm:text-xl md:text-3xl text-stone-200 max-w-lg mx-auto leading-relaxed opacity-0 animate-fade-up delay-700">
          Imagined Worlds in Paper
        </p>
        
        <div className="mt-8 md:mt-12 h-12 md:h-16 w-[1px] bg-[#F9F7F2] mx-auto opacity-0 animate-fade-up delay-700"></div>
      </div>

      <div className="absolute bottom-10 text-[10px] md:text-xs tracking-widest text-[#F9F7F2] animate-bounce z-20 opacity-70">
        SCROLL
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="min-h-[70vh] flex items-center py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1 space-y-6 md:space-y-8">
            <span className="block w-12 h-[2px] bg-[#C4A484]"></span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2D2D2D]">
              The Art of Folding
            </h2>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-[#4B5563] font-light leading-relaxed">
              <p>
                Hi, I’m <span className="font-serif italic text-[#2D2D2D] font-medium">Parth Bhavsar</span>, 
                a paper artist based in Ahmedabad, specialising in handcrafted 2D and 3D paper models.
              </p>
              <p>
                My artistic practice centers on the intricate art of paper modelling. With meticulous cutting, 
                folding, and assembling techniques, I create miniature sculptures of architectural marvels, 
                vehicles, musical instruments, and everyday objects.
              </p>
              <p>
                My work explores the beauty of detail, the versatility of paper, and the unique perspective 
                gained by scaling down familiar forms.
              </p>
            </div>
            
            <div className="pt-4">
              <span className="inline-block border-b border-[#2D2D2D] text-xs md:text-sm uppercase tracking-widest pb-1">
                Based in Ahmedabad, India
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 order-1 lg:order-2 relative w-full">
             <div className="relative aspect-[3/4] w-full max-w-sm md:max-w-md mx-auto shadow-2xl bg-white p-3 md:p-4 rotate-2 transform hover:rotate-0 transition-all duration-700">
                <AssetImg 
                  filename="artist-portrait.jpg" 
                  alt="Parth Bhavsar" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
             </div>
             {/* Decorative Element */}
             <div className="absolute -z-10 top-6 -right-6 md:top-10 md:-right-10 w-full h-full border border-[#C4A484] opacity-50 hidden sm:block"></div>
          </div>

        </div>
      </div>
    </section>
  );
}

function GallerySection({ items }) {
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <section id="gallery" className="min-h-screen py-16 md:py-24 relative bg-[#F9F7F2]">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8">Selected Works</h2>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs md:text-sm uppercase tracking-widest transition-colors duration-300 pb-1 border-b ${
                  filter === cat 
                  ? 'text-[#2D2D2D] border-[#2D2D2D]' 
                  : 'text-[#9CA3AF] border-transparent hover:text-[#4A5D68]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="break-inside-avoid group cursor-pointer relative"
              onClick={() => setSelectedItem(item)}
            >
              <div className="overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-xl duration-500 ease-out">
                <div className="relative overflow-hidden">
                    <AssetImg 
                    filename={item.filename} 
                    alt={item.title} 
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#2D2D2D] bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                
                <div className="p-4 md:p-6 bg-white">
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#4A5D68]">{item.category}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-serif text-[#2D2D2D] group-hover:text-[#C4A484] transition-colors">
                    {item.title}
                    </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Project Modal */}
      {selectedItem && (
        <ProjectModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}

function ProjectModal({ item, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F9F7F2] bg-opacity-95 backdrop-blur-sm p-4 md:p-10 animate-fade-in cursor-pointer"
        onClick={onClose} 
    >
      
      {/* Content Container */}
      <div 
        className="w-full max-w-6xl h-full flex flex-col md:flex-row bg-white shadow-2xl overflow-hidden relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-white/50 hover:bg-white rounded-full text-[#2D2D2D] hover:text-red-800 transition-all shadow-sm"
            title="Close"
        >
            <X size={24} />
        </button>

        {/* Image Side - Adjusted for Mobile */}
        <div className="w-full h-[35vh] md:h-full md:w-2/3 bg-stone-100 flex items-center justify-center p-4 md:p-8 relative shrink-0">
          <div className="w-full h-full relative">
            <AssetImg 
                filename={item.filename}
                alt={item.title}
                className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Text Side - Scrollable content on mobile */}
        <div className="w-full md:w-1/3 flex-1 md:h-full p-6 md:p-12 flex flex-col justify-start md:justify-center overflow-y-auto bg-white">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#C4A484] mb-2 md:mb-4 block shrink-0">
                {item.category}
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#2D2D2D] mb-4 md:mb-6 shrink-0">
                {item.title}
            </h2>
            <div className="w-12 h-[1px] bg-[#2D2D2D] opacity-20 mb-4 md:mb-8 shrink-0"></div>
            <p className="text-[#4B5563] font-light leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                {item.description}
            </p>
            <div className="mt-auto shrink-0 pt-4">
                <p className="text-xs text-stone-400 italic">
                    Artwork by Parth Bhavsar
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-[#2D2D2D] text-[#F9F7F2] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-6xl font-serif mb-8 md:mb-12">Let's Create Together</h2>
        
        <p className="text-stone-400 font-light text-base md:text-lg max-w-xl mx-auto mb-10 md:mb-16">
          Open for commissions, collaborations, and exhibitions.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
          <a 
            href="https://instagram.com/thepianoguy05" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-lg md:text-xl font-light hover:text-[#C4A484] transition-colors group"
          >
            <div className="p-3 md:p-4 border border-stone-600 rounded-full group-hover:border-[#C4A484] transition-colors">
                <Instagram size={20} className="md:w-6 md:h-6" />
            </div>
            <span className="tracking-wide">@thepianoguy05</span>
          </a>

          <a 
            href="mailto:parthbhavsar134@gmail.com" 
            className="flex items-center gap-4 text-lg md:text-xl font-light hover:text-[#C4A484] transition-colors group"
          >
             <div className="p-3 md:p-4 border border-stone-600 rounded-full group-hover:border-[#C4A484] transition-colors">
                <Mail size={20} className="md:w-6 md:h-6" />
            </div>
            <span className="tracking-wide">Contact Email</span>
          </a>
        </div>

        <footer className="mt-20 md:mt-32 text-stone-600 text-[10px] md:text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Parth Bhavsar. All rights reserved.
        </footer>
      </div>
    </section>
  );
}
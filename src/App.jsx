import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Mail, ChevronRight, ExternalLink, ArrowRight, ChevronLeft, ArrowDown } from 'lucide-react';

/**
 * ==============================================================================
 * DATA & CONFIGURATION
 * ==============================================================================
 */

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "A TRIO OF BLESSINGS",
    category: "Divine",
    images: ["jagannath.jpeg"],
    description: "Celebrating the vibrant presence of Shri Lord Jagannath ji, Balabhadra ji and Subhadra ji",
    year: "2024",
  },
  {
    id: 2,
    title: "Ode to Goddess Saraswati",
    category: "Divine",
    images: ["saraswati-1.jpeg", "saraswati-2.jpeg", "saraswati-3.jpeg"],
    description: "A paper tribute weaving together the precision of paper modeling and the soul of classical music.",
    year: "2022",
  },
  {
    id: 3,
    title: "The Maverick's Gaze",
    category: "Portraits",
    images: ["tesla-halftone.jpeg"],
    description: "A paper-carved halftone portrait of Nikola Tesla. The enigmatic visage emerges from a tapestry of precise cuts, reflecting his ability to perceive the world differently.",
    year: "2024",
  },
  {
    id: 4,
    title: "RACING LINES",
    category: "Portraits",
    images: ["vettel.jpeg"],
    description: "This intricate paper carving portrays Sebastian Vettel through the language of lines, mirroring the speed and precision of Formula 1. The halftone effect adds a dynamic quality, reflecting the energy of the racetrack.",
    year: "2024",
  },
  {
    id: 5,
    title: "Komatsu Excavator",
    category: "Mechanical Models",
    images: ["excavator.jpeg"],
    description: "Komatsu PC200 Hydraulic Excavator. Beyond its detailed appearance, the entire arm mechanism functions just like the real machine, powered by an intricate paper mechanism.",
    year: "2023",
  },
  {
    id: 6,
    title: "Komatsu D155AX Bulldozer",
    category: "Mechanical Models",
    images: ["bulldozer.jpeg"],
    description: "Komatsu D155AX Bulldozer. Paper Model A detailed handcrafted paper model featuring a functional front blade with realistic up-and-down movement.",
    year: "2023",
  },
  {
    id: 7,
    title: "Paper Crane Model - Conceptual",
    category: "Mechanical Models",
    images: ["paper-crane.jpeg"],
    description: "HEAVY-DUTY PAPERWORK. This paper crane model meticulously replicates a real crane, but with a unique twist: its entire upper portion rotates a full 360 degrees.",
    year: "2023",
  },
  {
    id: 8,
    title: "AVIATION IN EVERY FOLD",
    category: "Mechanical Models",
    images: ["chipmunk_1.jpeg", "chipmunk_2.jpeg"],
    description: "De Havilland Canada DHC-1 Chipmunk. A two-seat, single-engine primary trainer aircraft developed shortly after World War II.",
    year: "2023",
  },
  {
    id: 9,
    title: "A TRIAD OF MOTION, FROZEN IN STILLNESS",
    category: "Mechanical Models",
    images: ["rickshaw.jpeg"],
    description: "A handcrafted paper rickshaw that captures the spirit of movement in a moment of stillness, three wheels, one story paused in paper.",
    year: "2023",
  },
  {
    id: 10,
    title: "JUST ANOTHER PURR-FECTLY ANGLED CAT",
    category: "Miniatures",
    images: ["paper_cat.jpeg"],
    description: "A carefully handcrafted paper model capturing the gentle form and character of a cat.",
    year: "2023",
  },
  {
    id: 11,
    title: "Whispers of Vrindavan",
    category: "Sanjhi",
    images: ["radha_krishna_sanjhi.jpeg"],
    description: "Portraying Radha and Krishna in the Sanjhi style. The intricate design captures their eternal love, rendered with delicate balance.",
    year: "2022",
  },
  {
    id: 12,
    title: "THE STILLNESS WITHIN",
    category: "Sanjhi",
    images: ["buddha_sanjhi.jpeg"],
    description: "Through the detailed artistry of Sanjhi, this piece depicts Lord Buddha's path to enlightenment.",
    year: "2022",
  },
  {
    id: 13,
    title: "A DIVINE MELODY",
    category: "Sanjhi",
    images: ["krishna_sanjhi.jpeg"],
    description: "Delicately cut from paper, this Sanjhi artwork depicts Lord Krishna as the eternal musician, whose flute weaves devotion into the air.",
    year: "2022",
  },
  {
    id: 14,
    title: "THE DIVINE GAZE",
    category: "Sanjhi",
    images: ["shreenathji_sanjhi.jpeg"],
    description: "Crafted through the delicate art of Sanjhi, this piece portrays Shreenathji, the revered form of Lord Krishna.",
    year: "2022",
  },
  {
    id: 15,
    title: "MEDITATIVE GEOMETRY",
    category: "Islamic Geometry",
    images: ["8_fold_rosette.jpeg"],
    description: "My hand-drawn 8-fold rosette invites you into the intricate world of Islamic patterns.",
    year: "2023",
  },
  {
    id: 16,
    title: "INTERWOVEN HARMONY",
    category: "Islamic Geometry",
    images: ["islamic_geometry_1.jpeg", "islamic_geometry_2.jpeg", "islamic_geometry_3.jpeg"],
    description: "Crafted from a single sheet of paper using a precision knife, this paper cut design delves into profound symmetry.",
    year: "2023",
  },
  {
    id: 17,
    title: "GEOMETRIC GRACE",
    category: "Islamic Geometry",
    images: ["9_fold_rosette-1.jpeg","9_fold_rosette-2.jpeg"],
    description: "This miniature artwork presents the 9-fold rosette, a classic Islamic geometric pattern.",
    year: "2023",
  },
  {
    id: 18,
    title: "PATTERNED PRECISION",
    category: "Islamic Geometry",
    images: ["patterned_precision.jpeg"],
    description: "Drawing from traditional motifs, this piece celebrates patience, balance, and the art of making by hand.",
    year: "2023",
  },
  {
    id: 19,
    title: "LATTICE OF LIGHT",
    category: "Islamic Geometry",
    images: ["lattice_of_light.jpeg"],
    description: "More than a pattern, this piece channels the energy of the sun.",
    year: "2023",
  },
  {
    id: 20,
    title: "A WORLD CONNECTED",
    category: "Islamic Geometry",
    images: ["a_world_connected.jpeg"],
    description: "Delicately hand-cut, this piece reimagines the Expo 2020 Dubai logo as a lace-like form.",
    year: "2023",
  },
  {
    id: 21,
    title: "Sidi Saiyed Ni Jaali",
    category: "Architecture",
    images: ["sidi_saiyed-1.png", "sidi_saiyed-2.jpeg", "sidi_saiyed-3.jpg"],
    description: "A handcrafted paper interpretation of the Sidi Saiyed ni Jali, highlighting the detailed latticework and the iconic 'Tree of Life' motif.",
    year: "2023",
  },
  {
    id: 22,
    title: "A Piece of Ahmedabad",
    category: "Architecture",
    images: ["atal_bridge.jpeg"],
    description: "This handcrafted paper model is a replica miniature of Ahmedabad's Atal Bridge, recreated with close attention to structural accuracy.",
    year: "2024",
  },
  {
    id: 23,
    title: "WORK IN PROGRESS",
    category: "Architecture",
    images: ["work_in_progress-1.jpeg", "work_in_progress-2.jpeg", "work_in_progress-3.jpeg"],
    description: "Inspired by the dynamic energy of a real construction site, this miniature paper scene brings large-scale engineering into an interactive, handcrafted form.",
    year: "2024",
  },
  {
    id: 24,
    title: "I'm Lovin' It",
    category: "Architecture",
    images: ["mcd-1.jpeg","mcd-2.jpeg"],
    description: "My miniature McDonald's outlet, a tiny, detailed recreation of a familiar favorite.",
    year: "2024",
  },
  {
    id: 25,
    title: "MODELLING THE MUNDANE",
    category: "Architecture",
    images: ["shell_pump-1.jpeg", "shell_pump-2.jpeg"],
    description: "A miniature Shell petrol pump, built with meticulous detail to capture everyday reality in a tiny form.",
    year: "2024",
  },
  {
    id: 26,
    title: "IMMORTALIZED IN PAPER",
    category: "Architecture",
    images: ["delhi_gate-1.jpeg", "delhi_gate-2.jpeg"],
    description: "A miniature homage to India's valor at India Gate.",
    year: "2024",
  },
  {
    id: 27,
    title: "PAPER TORII",
    category: "Architecture",
    images: ["paper_torii-1.jpeg", "paper_torii-2.jpeg"],
    description: "A miniature homage to the iconic Japanese Torii gates.",
    year: "2024",
  },
  {
    id: 28,
    title: "Miniature Guitar",
    category: "Musical Instruments",
    images: ["match_box_guitar.jpeg"],
    description: "A carefully crafted miniature guitar made from a matchbox.",
    year: "2023",
  },
  {
    id: 29,
    title: "HARMONIOUS LITTLE CREATION",
    category: "Musical Instruments",
    images: ["harmonium.jpeg"],
    description: "A hand-crafted paper miniature inspired by the warm, retro charm of a classic harmonium.",
    year: "2022",
  },
  {
    id: 30,
    title: "POCKET-SIZED SYMPHONY",
    category: "Musical Instruments",
    images: ["piano.jpeg"],
    description: "My hand-crafted miniature keyboard brings the magic of musical instruments to life in a tiny form.",
    year: "2022",
  },
  {
    id: 31,
    title: "Built for Speed (F1)",
    category: "Miniatures",
    images: ["f1_diorama-1.jpeg", "f1_diorama-2.jpeg", "f1_diorama-3.jpeg"],
    description: "Handcrafted F1 podium finish in miniature. Features a racetrack base textured with sandpaper.",
    year: "2024",
  },
  {
    id: 32,
    title: "FLYING IN FORMATION",
    category: "Miniatures",
    images: ["surya-kiran.jpeg"],
    description: "This work captures the breathtaking precision of the Indian Air Force's Surya Kiran Aerobatic Team.",
    year: "2023",
  },
  {
    id: 33,
    title: "READY TO FLY",
    category: "Miniatures",
    images: ["indigo_mini.png"],
    description: "Inspired by the vibrant spirit of Indigo Airlines, I've transformed a sheet of paper into this miniature Airbus A320.",
    year: "2023",
  },
  {
    id: 34,
    title: "RADIATOR SPRINGS' EXPERT",
    category: "Miniatures",
    images: ["guido.jpeg"],
    description: "A tribute to Guido, the forklift with the fastest hands in Disney Pixar Cars.",
    year: "2023",
  }
];

const CATEGORIES = ["All", "Architecture", "Divine", "Sanjhi", "Islamic Geometry", "Miniatures", "Mechanical Models", "Portraits", "Musical Instruments"];

/**
 * ==============================================================================
 * UTILITY COMPONENTS
 * ==============================================================================
 */
const AssetImg = ({ filename, alt, className, style, isBackground = false }) => {
  const [error, setError] = useState(false);
  const path = `/assets/images/${filename}`;

  if (error) {
    if (isBackground) return <div className={`w-full h-full bg-[#EBE9E4] ${className}`} style={style}></div>;
    return (
      <div className={`w-full h-full bg-stone-100 flex flex-col items-center justify-center p-6 text-stone-400 border border-stone-200 ${className}`} style={style}>
        <span className="font-serif italic text-sm mb-1">{alt}</span>
        <span className="text-[10px] uppercase tracking-widest opacity-50">Image not found</span>
      </div>
    );
  }

  return (
    <img src={path} alt={alt} className={className} style={style} onError={() => setError(true)} loading="lazy" />
  );
};

const ImageCarousel = ({ images, alt, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (e, index) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;
  if (images.length === 1) return <AssetImg filename={images[0]} alt={alt} className={className} />;

  return (
    <div className="relative w-full h-full group/carousel overflow-hidden">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0">
            <div className="w-full h-full relative">
               <AssetImg filename={img} alt={`${alt} ${idx + 1}`} className={className} />
            </div>
          </div>
        ))}
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 rounded-full opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-all hover:bg-white shadow-md text-[#2D2D2D]">
        <ChevronLeft size={14} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 rounded-full opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-all hover:bg-white shadow-md text-[#2D2D2D]">
        <ChevronRight size={14} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, idx) => (
          <button key={idx} onClick={(e) => goToSlide(e, idx)} className={`w-2 h-2 rounded-full transition-all ${currentIndex === idx ? 'bg-[#C4A484] scale-125 shadow-sm' : 'bg-white/60 hover:bg-white'}`} />
        ))}
      </div>
    </div>
  );
};

function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { rootMargin });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref, rootMargin]);
  return isIntersecting;
}

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref, "-50px");
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
  
    useEffect(() => {
      const moveCursor = (e) => {
        if(cursorRef.current && followerRef.current) {
            cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            setTimeout(() => {
                if(followerRef.current) followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }, 50);
        }
      };
      window.addEventListener('mousemove', moveCursor);
      return () => window.removeEventListener('mousemove', moveCursor);
    }, []);
  
    return (
      <>
        <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-[#2D2D2D] rounded-full pointer-events-none z-[9999] -ml-1.5 -mt-1.5 mix-blend-difference hidden md:block" />
        <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-[#2D2D2D] rounded-full pointer-events-none z-[9998] -ml-4 -mt-4 opacity-50 transition-transform duration-100 ease-out hidden md:block" />
      </>
    );
};

const Preloader = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setFadeOut(true), 2000);
        const remove = setTimeout(onComplete, 2800);
        return () => { clearTimeout(timer); clearTimeout(remove); };
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[1000] bg-[#F9F7F2] flex items-center justify-center transition-opacity duration-1000 ease-in-out ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="text-center overflow-hidden">
                <h1 className={`text-4xl md:text-6xl font-serif text-[#2D2D2D] transform transition-transform duration-1000 ${fadeOut ? '-translate-y-full' : 'translate-y-0'}`}>Parth Bhavsar</h1>
                <div className="h-[1px] bg-[#C4A484] w-24 mx-auto mt-4 transition-all duration-1000 delay-200" style={{ width: fadeOut ? '0%' : '100px' }}></div>
            </div>
        </div>
    );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [planeFlying, setPlaneFlying] = useState(false);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AUTOMATIC PLANE FLIGHT & RESET ON SCROLL
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { 
      if (entry.isIntersecting) {
        setPlaneFlying(true);
      } else {
        setPlaneFlying(false); // Make plane reappear when moving away
      }
    }, { threshold: 0.1 });
    
    if (aboutSectionRef.current) observer.observe(aboutSectionRef.current);
    return () => { if (aboutSectionRef.current) observer.unobserve(aboutSectionRef.current); };
  }, []);

  useEffect(() => {
    if (selectedProject || menuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
  }, [selectedProject, menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateProject = (direction) => {
    if (!selectedProject) return;
    const currentIndex = PORTFOLIO_ITEMS.findIndex(item => item.id === selectedProject.id);
    let nextIndex = (currentIndex + direction + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length;
    setSelectedProject(PORTFOLIO_ITEMS[nextIndex]);
  };

  const filteredItems = activeCategory === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);

  return (
    <>
    {loading && <Preloader onComplete={() => setLoading(false)} />}
    
    <div className={`min-h-screen bg-[#F9F7F2] text-[#2D2D2D] font-sans overflow-x-hidden md:cursor-none ${loading ? 'h-screen overflow-hidden' : ''}`}>
      <CustomCursor />

      {/* Global Texture Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-multiply" 
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`, backgroundRepeat: 'repeat' }}
      ></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Lato:wght@300;400;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { -webkit-tap-highlight-color: transparent; }
        ::selection { background: #C4A484; color: white; }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes flyAway { 0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; } 100% { transform: translate(800px, -600px) rotate(45deg) scale(0.1); opacity: 0; } }
        .animate-fly-away { animation: flyAway 2.5s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards; }
      `}</style>

      {/* NAVIGATION */}
      <header className={`fixed top-0 w-full z-[150] transition-all duration-500 ease-in-out ${scrolled ? 'bg-[#F9F7F2]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div onClick={() => scrollTo('hero')} className="cursor-pointer z-50 group">
            <h1 className="text-xl md:text-2xl font-serif font-semibold tracking-wide text-[#2D2D2D]">Parth Bhavsar</h1>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#888] group-hover:text-[#C4A484] transition-colors duration-300">Paper Artist</p>
          </div>
          <nav className="hidden md:flex space-x-8 lg:space-x-12">
            {['About', 'Gallery', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-xs uppercase tracking-[0.15em] font-bold text-[#555] hover:text-[#C4A484] transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-[#C4A484] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </button>
            ))}
          </nav>
          <button className="md:hidden z-50 p-2 text-[#2D2D2D]" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 bg-[#F9F7F2] z-[200] flex flex-col justify-center items-center transition-transform duration-500 cubic-bezier(0.7, 0, 0.3, 1) ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-8 right-6 p-2 text-[#2D2D2D]" onClick={() => setMenuOpen(false)}><X size={32} /></button>
        <nav className="flex flex-col space-y-8 text-center">
          {['Home', 'About', 'Gallery', 'Contact'].map((item) => (
            <button key={item} onClick={() => scrollTo(item === 'Home' ? 'hero' : item.toLowerCase())} className="text-4xl font-serif italic text-[#2D2D2D] hover:text-[#C4A484]">{item}</button>
          ))}
        </nav>
      </div>

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-15" style={{ backgroundImage: `url('assets/images/van-gogh.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
        <div className="absolute inset-0 z-0 bg-white/30 mix-blend-overlay"></div>
        <div className="absolute inset-0 pointer-events-none z-0 opacity-90 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`, backgroundRepeat: 'repeat' }}></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <Reveal delay={200}>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-[#2D2D2D] leading-tight mb-8">
              “Great things are done by <br className="hidden md:block" />
              a series of small things <br className="hidden md:block" />
              <span className="italic text-[#C4A484]">brought together.”</span>
            </h1>
            <p className="text-sm md:text-base tracking-widest uppercase text-[#555] mt-6 font-bold">— Vincent van Gogh</p>
          </Reveal>
          <Reveal delay={600}>
            <button onClick={() => scrollTo('about')} className="mt-20 group inline-flex flex-col items-center gap-2 text-[#2D2D2D] text-[10px] tracking-[0.25em] uppercase hover:text-[#C4A484]">
              Scroll
              <div className="w-[1px] h-12 bg-[#2D2D2D] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#C4A484] -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </div>
              <ArrowDown size={14} className="animate-bounce mt-2" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" ref={aboutSectionRef} className="py-16 md:py-24 bg-white relative z-10 scroll-mt-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-5/12 relative group flex justify-center">
              <Reveal>
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#C4A484] bg-stone-100 shadow-xl relative z-10">
                        <AssetImg filename="artist-portrait.png" alt="Parth Bhavsar" className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105 rounded-full" />
                      </div>
                      <div className={`absolute -top-6 -right-6 z-[60] cursor-pointer ${planeFlying ? 'animate-fly-away' : 'animate-float'}`}>
                        <svg width="80" height="80" viewBox="0 0 50 50" fill="none" className="drop-shadow-2xl transform rotate-12 transition-transform duration-300 hover:scale-110">
                            <path d="M10 25 L45 10 L20 40 Z" fill="#d4d4d4" stroke="#2D2D2D" strokeWidth="0.5" />
                            <path d="M10 25 L45 10 L20 25 Z" fill="#ffffff" stroke="#2D2D2D" strokeWidth="0.5" />
                            <path d="M20 25 L45 10 L20 40" fill="#f0f0f0" stroke="#2D2D2D" strokeWidth="0.5" />
                        </svg>
                      </div>
                      <div className={`absolute top-0 right-0 w-12 h-2 bg-black/20 blur-md rounded-full transform rotate-12 transition-opacity duration-1000 ${planeFlying ? 'opacity-0' : 'opacity-100 animate-float'}`} style={{ animationDelay: '0.1s', transformOrigin: 'center', transform: 'rotate(12deg) scale(0.8)' }}></div>
                  </div>
              </Reveal>
            </div>
            <div className="w-full lg:w-7/12 space-y-6">
              <Reveal><div className="flex items-center gap-4"><span className="h-[1px] w-12 bg-[#C4A484]"></span><span className="text-xs uppercase tracking-[0.2em] text-[#888]">The Artist</span></div></Reveal>
              <Reveal delay={100}><h2 className="text-3xl md:text-5xl font-serif text-[#2D2D2D] leading-none">Transforming the mundane <br/> <span className="italic text-[#C4A484]">into the extraordinary</span></h2></Reveal>
              <Reveal delay={200}><div className="space-y-4 text-[#555] font-light leading-relaxed text-base md:text-lg">
                <p>Hi, I'm <strong className="text-[#2D2D2D] font-bold border-b border-[#C4A484]">Parth Bhavsar</strong>, an Ahmedabad-based paper artist specializing in intricate paper carvings and models.</p>
                <p>My work centers on the intersection of architecture, geometry, and pop culture. Whether I'm recreating the complex lattice of the Sidi Saiyed Ni Jaali or the aerodynamic curves of an F1 car, my goal remains the same.</p>
              </div></Reveal>
              <Reveal delay={300}><div className="pt-6 border-t border-stone-100"><div className="flex gap-16">
                <div><h4 className="text-3xl font-serif text-[#2D2D2D]">4+</h4><p className="text-[10px] uppercase tracking-widest text-[#888] mt-1">Years Experience</p></div>
                <div><h4 className="text-3xl font-serif text-[#2D2D2D]">50+</h4><p className="text-[10px] uppercase tracking-widest text-[#888] mt-1">Projects</p></div>
              </div></div></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 md:py-32 bg-[#F9F7F2] relative overflow-hidden z-10 scroll-mt-20">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-90 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`, backgroundRepeat: 'repeat' }}></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <Reveal><h2 className="text-4xl md:text-5xl font-serif text-[#2D2D2D] mb-8">Selected Works</h2><div className="h-[1px] w-24 bg-[#C4A484] mx-auto mb-12"></div></Reveal>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`text-xs md:text-sm uppercase tracking-widest transition-all duration-300 pb-2 border-b-2 ${activeCategory === cat ? 'text-[#2D2D2D] font-bold border-[#2D2D2D]' : 'text-[#999] border-transparent hover:text-[#C4A484]'}`}>{cat}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Reveal key={item.id}>
                <div className="group cursor-pointer h-full" onClick={() => setSelectedProject(item)}>
                  <div className="bg-white p-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out h-full flex flex-col">
                    <div className="relative overflow-hidden aspect-[4/3] bg-stone-100 rounded-sm">
                      <ImageCarousel images={item.images} alt={item.title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-[#2D2D2D]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] pointer-events-none z-30">
                         <span className="bg-white px-6 py-3 text-[10px] uppercase tracking-widest text-[#2D2D2D] font-bold shadow-lg">View Project</span>
                      </div>
                    </div>
                    <div className="pt-8 pb-4 px-2 flex-1 flex flex-col justify-end">
                      <div className="flex justify-between items-baseline mb-4">
                           <p className="text-[10px] uppercase tracking-[0.2em] text-[#C4A484] font-bold">{item.category}</p>
                           <p className="text-[10px] text-[#999]">{item.year}</p>
                      </div>
                      <h3 className="text-xl font-serif text-[#2D2D2D] group-hover:text-[#C4A484] leading-tight">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 md:py-32 bg-[#1a1a1a] text-white relative overflow-hidden z-10 scroll-mt-20">
        <div className="container mx-auto px-6 text-center">
          <Reveal><h2 className="text-4xl md:text-7xl font-serif mb-8 text-[#EBE9E4]">Commission & Contact</h2><p className="text-[#888] font-light text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">Interested in a custom paper model, architectural replica, or collaboration? Connect via email or social media.</p></Reveal>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            <a href="https://instagram.com/thepianoguy05" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-10 py-5 border border-[#444] rounded-sm hover:border-[#C4A484] hover:text-[#C4A484] transition-all group w-full md:w-auto justify-center"><Instagram size={20} /><span className="tracking-widest uppercase text-sm">@thepianoguy05</span></a>
            <a href="mailto:parthbhavsar134@gmail.com" className="flex items-center gap-3 px-10 py-5 border border-[#444] rounded-sm hover:border-[#C4A484] hover:text-[#C4A484] transition-all group w-full md:w-auto justify-center"><Mail size={20} /><span className="tracking-widest uppercase text-sm">parthbhavsar134@gmail.com</span></a>
          </div>
          <div className="mt-24 pt-8 border-t border-[#333] flex flex-col md:flex-row justify-between items-center text-[#555] text-xs uppercase tracking-widest"><p>&copy; {new Date().getFullYear()} Parth Bhavsar</p><p>Designed with Precision</p></div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[500] bg-[#F9F7F2]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={() => setSelectedProject(null)}>
          <button className="absolute top-6 right-6 z-[520] p-3 rounded-full bg-white text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white shadow-lg group" onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}><X size={24} className="group-hover:rotate-90 transition-transform" /></button>
          
          {/* External Arrows - PC ONLY */}
          <button className="hidden lg:flex absolute left-12 top-1/2 -translate-y-1/2 z-[310] p-5 bg-white/40 hover:bg-white rounded-full text-[#2D2D2D] shadow-xl" onClick={(e) => { e.stopPropagation(); navigateProject(-1); }}><ChevronLeft size={40} /></button>
          <button className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 z-[310] p-5 bg-white/40 hover:bg-white rounded-full text-[#2D2D2D] shadow-xl" onClick={(e) => { e.stopPropagation(); navigateProject(1); }}><ChevronRight size={40} /></button>

          <div className="bg-white w-full max-w-6xl h-[85vh] md:h-[80vh] shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-sm" onClick={(e) => e.stopPropagation()}>
            <div className="w-full md:w-2/3 h-[45%] md:h-full bg-stone-100 flex items-center justify-center p-4 relative overflow-hidden flex-shrink-0">
              <ImageCarousel images={selectedProject.images} alt={selectedProject.title} className="w-full h-full object-contain" />
            </div>
            
            <div className="w-full md:w-1/3 h-[55%] md:h-full p-6 md:p-12 overflow-y-auto flex flex-col justify-start border-l border-stone-100 relative bg-white">
               {/* Phone Layout empty space */}
               <div className="flex lg:hidden justify-between mb-4 pb-4 border-b border-stone-100 h-10 flex-shrink-0" />
               
               <div className="animate-fade-in flex-1">
                 <div className="mb-4">
                   <span className="text-[#C4A484] text-xs uppercase tracking-[0.25em] block mb-4 font-bold">{selectedProject.category} — {selectedProject.year}</span>
                   <h2 className="text-3xl md:text-4xl font-serif text-[#2D2D2D] mb-6 leading-tight break-words">{selectedProject.title}</h2>
                   <div className="w-16 h-[2px] bg-[#2D2D2D] opacity-10 mb-8"></div>
                 </div>
                 <p className="text-[#555] font-light leading-relaxed mb-12 text-sm md:text-base whitespace-pre-wrap">{selectedProject.description}</p>
               </div>
               
               <div className="mt-auto pt-6 border-t border-stone-100 flex-shrink-0"><p className="text-xs text-[#888] italic">Artwork by Parth Bhavsar</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
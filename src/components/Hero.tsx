import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const scrollToContent = () => {
    const firstSection = document.getElementById('professor-grid');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image container */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(/img/hero_ealc.svg)',
        }}
      />
      {/* Darkening Overlay */}
      <div className="absolute inset-0 z-1 bg-black/70"></div> 

      {/* Bottom Fade Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-2 bg-gradient-to-t from-[#1E1E1E] to-transparent pointer-events-none"></div>
      
      {/* Text Content */}
      <div className="container relative z-10 text-center px-4">
        <motion.h1 
          className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        >
          Teaching East Asia, Inspiring Excellence
        </motion.h1>
        
        <motion.p 
          className="text-base md:text-xl max-w-2xl mx-auto mb-12 text-white opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
        >
          Harvard faculty share their most effective classroom strategies and insights for East Asian studies.
        </motion.p>
        
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <button 
            onClick={scrollToContent} 
            className="group flex flex-col items-center cursor-pointer mx-auto"
            aria-label="Scroll to content"
          >
            <span className="uppercase tracking-wider text-sm text-white mb-2">SCROLL TO BEGIN</span>
            <span className="h-10 w-10 rounded-full bg-crimson flex items-center justify-center text-white text-xl group-hover:bg-white group-hover:text-crimson transition-colors">
              ⌄
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 
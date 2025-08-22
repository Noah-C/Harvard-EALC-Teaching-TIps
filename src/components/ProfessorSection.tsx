import React from 'react';
import { motion } from 'framer-motion';
import { Professor } from '../hooks/useProfessors';

type ProfessorSectionProps = {
  professor: Professor;
  isLast?: boolean;
};

const ProfessorSection: React.FC<ProfessorSectionProps> = ({ professor, isLast = false }) => {
  const animationEasing = [0.4, 0.0, 0.2, 1];

  // Log the received professor prop and the specific portrait path
  console.log(`[Debug] Rendering ProfessorSection for: ${professor.name}, Image Path: ${professor.portrait}`);

  return (
    <section className="py-16 bg-[#1E1E1E]">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="md:flex md:items-start md:gap-12"> {/* Use items-start to align columns at the top */}

          {/* Left Column: Image Only */}
          <motion.div
            className="md:w-1/3 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: animationEasing }}
          >
            <div className="rounded-lg overflow-hidden shadow-lg aspect-[3/4]">
              <img
                src={professor.portrait}
                alt={`Portrait of Professor ${professor.name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error(`[Debug] Failed to load image: ${professor.portrait}`);
                  e.currentTarget.src = "https://via.placeholder.com/400x533?text=Image+Error";
                }}
              />
            </div>
          </motion.div>

          {/* Right Column: Name, Title, Tips */}
          <motion.div
            className="md:w-2/3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: animationEasing }}
          >
            {/* Name and Title first */}
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-1">{professor.name}</h2>
            <h3 className="text-lg text-[#AAAAAA] italic mb-8">{professor.title}</h3>
            
            {/* Then Tips */}
            <div className="mt-8">
              <h4 className="text-2xl font-['Playfair_Display'] font-semibold text-white mb-6">Teaching Tips</h4>
              <div className="space-y-6">
                {professor.tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#252525] p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + (index * 0.1),
                      ease: animationEasing
                    }}
                  >
                    {tip.startsWith('"') ? (
                      <blockquote className="text-xl italic text-white leading-relaxed">
                        {tip}
                      </blockquote>
                    ) : (
                      <p className="text-lg text-white leading-relaxed">{tip}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      {/* Conditionally render Separator */} 
      {!isLast && (
        <div className="text-center mt-16 flex items-center justify-center gap-4 px-4">
          <div className="flex-grow h-px bg-gray-700 opacity-50"></div> {/* Left line */}
          <span className="text-crimson opacity-60 text-xl inline-block">❖</span>
          <div className="flex-grow h-px bg-gray-700 opacity-50"></div> {/* Right line */}
        </div>
      )}
    </section>
  );
};

export default ProfessorSection; 
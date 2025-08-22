import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Fuse from 'fuse.js';
import ProfessorCard from '../components/ProfessorCard';
import useBookmarks from '../store/useBookmarks';
import { professors, Professor } from '../data/professors.generated'; 
import ealcLogo from '/img/ealc_logo.svg'; // Import the logo

// Fuse.js options for fuzzy search
const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'title', weight: 0.2 },
    { name: 'bio', weight: 0.2 },
    { name: 'tipsRaw', weight: 0.2 } 
  ],
  includeScore: true,
  threshold: 0.4, // Adjust sensitivity as needed
};

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  // Initialize Fuse instance
  const fuse = useMemo(() => new Fuse(professors, fuseOptions), []);

  // Perform search or show all professors
  const displayedProfessors = useMemo(() => {
    if (!searchTerm.trim()) {
      return professors;
    }
    return fuse.search(searchTerm).map(result => result.item);
  }, [searchTerm, fuse]);

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        {/* EALC Logo */}
        <img 
          src={ealcLogo} 
          alt="Harvard EALC Logo"
          className="h-20 w-auto mx-auto mb-6" // Adjust size and margin as needed
        />
        <h1 className="text-crimson">
          East Asian Languages & Civilizations
          <br />
          Teaching Tips
        </h1>
        <p className="max-w-2xl mx-auto text-gray-700 mt-4">
          A curated collection of teaching advice from EALC professors, 
          designed to help PhD students enhance their pedagogical skills.
        </p>
      </motion.div>
      
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-lg mx-auto">
          <input
            type="search" // Use type="search" for better semantics
            placeholder="Search by name, title, or keyword..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-opacity-50 shadow-sm"
          />
          <svg 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
      
      {/* Professor Grid */}
      <div className="professor-grid">
        {displayedProfessors.map((professor, index) => (
          <motion.div
            key={professor.id}
            // Apply fadeInUp animation logic if defined
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Adjust amount for trigger point
            transition={{ duration: 0.4, delay: index * 0.05 }}
            variants={{ // Define variants directly or import from separate file
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }} 
          >
            <ProfessorCard 
              professor={professor} 
              isBookmarked={isBookmarked(professor.id)}
              onToggleBookmark={toggleBookmark}
            />
          </motion.div>
        ))}
      </div>
      
      {/* No Results Message */}
      {displayedProfessors.length === 0 && searchTerm && (
        <div className="text-center py-12 text-gray-600">
          <p className="text-xl mb-2">No professors found matching "{searchTerm}"</p>
          <p>Try searching for different keywords.</p>
        </div>
      )}
    </div>
  );
};

export default Home; 
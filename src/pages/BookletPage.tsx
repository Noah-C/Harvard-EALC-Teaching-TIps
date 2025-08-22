import React from 'react';
import { useProfessors } from '../hooks/useProfessors';
import Hero from '../components/Hero';
import ProfessorSection from '../components/ProfessorSection';

const BookletPage: React.FC = () => {
  const { professors, loading, error } = useProfessors();

  return (
    <>
      <Hero />
      
      {/* Assign ID for hero scroll button */}
      <div id="professor-grid">
          {loading && (
            <section className="py-16 bg-[#1E1E1E] text-center">
              <p className="text-[#CCCCCC]">Loading professors...</p>
            </section>
          )}

          {error && (
            <section className="py-16 bg-[#1E1E1E] text-center">
              <p className="text-[#FF8888]">Error loading professors. Please try again later.</p>
            </section>
          )}

          {!loading && !error && (
            <>
              {professors.map((professor, index) => (
                <ProfessorSection 
                  key={professor.id} 
                  professor={professor} 
                  isLast={index === professors.length - 1}
                />
              ))}
            </>
          )}

          {!loading && !error && professors.length === 0 && (
            <section className="py-16 bg-[#1E1E1E] text-center">
              <p className="text-[#CCCCCC]">No professors found.</p>
            </section>
          )}
      </div>
    </>
  );
};

export default BookletPage; 
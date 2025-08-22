import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#1E1E1E] text-white">
      {/* Persistent Harvard Logo */}
      <div className="fixed top-4 left-4 z-50">
        <a href="https://www.harvard.edu" target="_blank" rel="noopener noreferrer" className="block">
          <img 
            src="/img/harvard_logo.png" 
            alt="Harvard University Logo" 
            className="h-10 w-auto"
          />
        </a>
      </div>
      
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      
      <footer className="py-6 border-t border-[#333333]">
        <div className="container text-center text-[#AAAAAA] text-sm">
          <p>© 2025 Harvard East Asian Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 
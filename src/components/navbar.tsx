import React from 'react';
import { NavLink } from 'react-router-dom';
import paw from '../cute-assets/paw.png';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-b-2 border-pink/50">
      <div className="flex items-center gap-3 font-bold text-2xl text-darkpink mb-4 sm:mb-0">
        <img src={paw} alt="Paw" className="w-8 animate-wiggle" />
        Reminder Cat
      </div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {[
          { path: '/', label: '🏠 Home' },
          { path: '/activity', label: '📋 Activity' },
          { path: '/statistic', label: '📊 Statistic' },
          { path: '/calendar', label: '📅 Calendar' }
        ].map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({isActive}) => `text-base sm:text-lg font-bold transition-all duration-300 hover:text-darkpink hover:-translate-y-1 ${isActive ? 'text-darkpink border-b-4 border-pink pb-1' : 'text-text/70'}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
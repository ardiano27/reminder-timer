import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#1E2532]/90 backdrop-blur-md border-b-[2px] border-genshingold/50 sticky top-0 z-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3 font-bold text-2xl font-genshin text-genshinlightgold mb-4 sm:mb-0 hover:scale-105 transition-transform cursor-pointer drop-shadow-[0_0_8px_rgba(211,188,142,0.8)]">
        <span className="text-3xl text-genshingold">✦</span>
        Paimon's Planner
      </div>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 font-body text-lg">
        {[
          { path: '/', label: 'Overview' },
          { path: '/activity', label: 'Commissions' },
          { path: '/statistic', label: 'Resin Stats' },
          { path: '/calendar', label: 'Events' }
        ].map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({isActive}) => `relative font-bold transition-all duration-300 hover:text-genshingold tracking-wide uppercase text-sm ${isActive ? 'text-genshingold drop-shadow-[0_0_5px_rgba(211,188,142,0.5)]' : 'text-genshinwhite/80'}`}
          >
            {({isActive}) => (
              <span className="flex flex-col items-center gap-1 group">
                {item.label}
                <span className={`h-[2px] bg-genshingold transition-all duration-300 ${isActive ? 'w-full shadow-[0_0_8px_#D3BC8E]' : 'w-0 group-hover:w-1/2'}`}></span>
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
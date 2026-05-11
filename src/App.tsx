import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/homepages';
import ActivityPage from './pages/activitypages';
import StatisticPage from './pages/statisticpage';
import CalendarPage from './pages/calendarpage';

function App() {
  return (
    <div className="min-h-screen transition-all duration-1000 ease-in-out relative flex flex-col items-center">
      {/* Background container, placeholder for the user's Genshin image later */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url("https://upload-os-bbs.hoyolab.com/upload/2021/08/17/83271719/a7c4eb6e340a6e3d2eb1516e534062a4_3306935930032644265.png")`, opacity: 0.8 }}
      ></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#1E2532]/80 via-[#1E2532]/40 to-[#1E2532]/90 pointer-events-none"></div>
      
      <div className="relative z-10 w-full">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 mt-8 mb-10 w-full px-4 sm:px-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/statistic" element={<StatisticPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
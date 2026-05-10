import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/homepages';
import ActivityPage from './pages/activitypages';
import StatisticPage from './pages/statisticpage';
import CalendarPage from './pages/calendarpage';

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white/70 backdrop-blur-md rounded-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] mt-5 mb-10 border border-white/50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/statistic" element={<StatisticPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
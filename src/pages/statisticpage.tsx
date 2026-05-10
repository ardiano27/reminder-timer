import React, { useState, useEffect } from 'react';
import StatisticChart from '../components/statisticchart';
import axios from 'axios';
import st1 from '../cute-assets/st1.png';

const StatisticPage = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/reminders').then(res => setReminders(res.data));
  }, []);

  const total = reminders.length;
  const completed = reminders.filter(r => r.done).length;

  return (
    <div className="text-center relative flex flex-col items-center">
      <img src={st1} alt="Statistic Cat" className="w-40 mb-4 animate-wiggle" />
      <h2 className="text-3xl h-cute mb-6">📊 Statistik Ke-imut-an</h2>
      <StatisticChart total={total} completed={completed} />
      {total === 0 && <p className="text-center mt-6 text-darkpink font-bold">Belum ada data, yuk tambah pengingat dulu! 🐾</p>}
    </div>
  );
};

export default StatisticPage;
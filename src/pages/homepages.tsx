import React, { useState, useEffect, useCallback, useRef } from 'react';
import catSleep from '../cute-assets/telentang3.png';
import paw from '../cute-assets/paw.png';

const HomePage = () => {
  const [countdown, setCountdown] = useState({ active: false, target: null });
  const [display, setDisplay] = useState('--:--:--');
  const timerRef = useRef(null);

  const startTimer = () => {
    const input = prompt('⏰ Atur waktu hitung mundur (menit):', '5');
    const minutes = parseInt(input, 10);
    if (!isNaN(minutes) && minutes > 0) {
      const target = new Date(Date.now() + minutes * 60000);
      setCountdown({ active: true, target });
    }
  };

  const tick = useCallback(() => {
    if (countdown.active && countdown.target) {
      const diff = countdown.target - Date.now();
      if (diff <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setCountdown({ active: false, target: null });
        setDisplay('00:00:00');
        setTimeout(() => {
          alert('🐱 Waktunya! Jangan lupa aktivitasmu!');
        }, 100);
        return;
      }
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setDisplay(`${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`);
    }
  }, [countdown]);

  useEffect(() => {
    if (!countdown.active) {
      setDisplay('--:--:--');
      return;
    }
    timerRef.current = setInterval(tick, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [countdown.active, tick]);

  return (
    <div className="text-center relative">
      <img src={catSleep} alt="Sleeping Cat" className="max-w-[220px] mx-auto block animate-float" />
      <h1 className="text-4xl h-cute mb-4">Timer Pengingat Imut</h1>
      <div className="card-cute text-5xl font-bold tracking-widest bg-yellow relative overflow-hidden py-10">
        <img src={paw} alt="Paw" className="absolute top-2 left-2 w-10 opacity-50 -rotate-12" />
        <img src={paw} alt="Paw" className="absolute bottom-2 right-2 w-10 opacity-50 rotate-12" />
        <span className="relative z-10">{display}</span>
      </div>
      <button onClick={startTimer} className="btn-cute mt-5">⏳ Mulai Timer Belajar / Istirahat</button>
      <p className="mt-4 font-bold text-darkpink">🐾 Atur timer untuk fokus atau istirahat, ditemani kucing lucu!</p>
    </div>
  );
};

export default HomePage;
import React, { useState, useEffect, useCallback, useRef } from 'react';

const HomePage = () => {
  const [countdown, setCountdown] = useState({ active: false, target: null });
  const [display, setDisplay] = useState('--:--:--');
  const timerRef = useRef(null);

  const startTimer = () => {
    const input = prompt('⌛ Set Commission Timer (minutes):', '25');
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
          alert('✨ Commission Completed! Claim your daily rewards from Katheryne!');
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
    <div className="text-center relative flex flex-col items-center p-4">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-genshingold blur-3xl opacity-20 rounded-full animate-pulse"></div>
        {/* Placeholder for user's chubby genshin character */}
        <div className="w-40 h-40 rounded-full border-4 border-genshingold shadow-[0_0_20px_rgba(211,188,142,0.5)] bg-black/50 flex items-center justify-center relative z-10 hover:scale-105 transition-transform duration-500 overflow-hidden">
          <span className="text-genshingold text-sm font-body px-4">Insert Chubby Character Here ✨</span>
        </div>
      </div>
      
      <h1 className="text-4xl sm:text-5xl h-genshin mb-4">Ad Astra Abyssosque!</h1>
      <p className="text-lg text-genshinwhite mb-8 font-body bg-black/40 px-6 py-2 rounded-full border border-genshingold/30 shadow-sm backdrop-blur-sm">
        "Welcome to the Adventurers' Guild."
      </p>

      <div className="card-genshin !bg-[#2B3544]/80 !border-genshingold text-5xl md:text-6xl font-bold tracking-widest relative py-12 px-8 w-full max-w-md group flex justify-center items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-genshingold to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-genshingold to-transparent"></div>
        
        <div className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-genshinlightgold to-genshingold drop-shadow-[0_2px_10px_rgba(211,188,142,0.4)] font-body">
          {display}
        </div>
      </div>
      
      <button onClick={startTimer} className="btn-genshin mt-8 text-lg w-full sm:w-auto px-10 relative overflow-hidden group">
        <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
        <span className="text-xl">✦</span> 
        Start Expedition
      </button>
      
      <p className="mt-8 font-body text-genshinwhite/60 text-sm tracking-wider uppercase">
        Focus Timer (25 Min) • Teyvat standard time
      </p>
    </div>
  );
};

export default HomePage;
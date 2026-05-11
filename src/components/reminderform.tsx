import React, { useState } from 'react';

interface ReminderFormProps {
  onAdd: (rem: { date: string; time: string; title: string; note: string }) => void;
  selectedDate: string | null;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ onAdd, selectedDate }) => {
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!time || !title) return;
    onAdd({
      date: selectedDate || new Date().toISOString().slice(0,10),
      time,
      title,
      note
    });
    setTime('');
    setTitle('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="card-genshin flex flex-col gap-5 !mt-0 relative group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-genshingold blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
      
      <div className="flex flex-col gap-1 relative z-10">
        <h3 className="text-2xl h-genshin flex items-center gap-2">
          <span className="text-xl">✦</span> New Commission
        </h3>
        <p className="text-sm text-genshindark/60 font-body uppercase tracking-wider">Post a new request to the Adventurers' Guild</p>
      </div>
      
      <div className="relative z-10 flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-genshindark/50 uppercase tracking-widest pl-2">Time</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} required className="input-genshin w-max font-bold text-genshingold" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-genshindark/50 uppercase tracking-widest pl-2">Objective</label>
          <input placeholder="e.g., Defeat 10 Slimes" value={title} onChange={e => setTitle(e.target.value)} required className="input-genshin text-lg" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-genshindark/50 uppercase tracking-widest pl-2">Details (Optional)</label>
          <textarea placeholder="Target location, elemental weaknesses..." value={note} onChange={e => setNote(e.target.value)} rows={2} className="input-genshin resize-none" />
        </div>
      </div>

      <button type="submit" className="btn-genshin mt-4 w-full sm:w-max self-center sm:self-start">
        Post Commission
      </button>
    </form>
  );
};

export default ReminderForm;

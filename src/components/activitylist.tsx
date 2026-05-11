import React from 'react';

interface Reminder {
  id: string;
  date: string;
  time: string;
  title: string;
  note: string;
  done: boolean;
}

interface ActivityListProps {
  reminders: Reminder[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ reminders, onToggle, onDelete }) => {
  return (
    <div className="mt-6 flex flex-col gap-5">
      {reminders.length === 0 && (
        <div className="text-center p-10 card-genshin bg-white/30 border-dashed border-genshingold/40">
          <p className="text-4xl mb-4 opacity-50">✦</p>
          <p className="font-genshin text-genshindark text-xl">No active commissions.</p>
          <p className="font-body text-sm text-genshindark/60 mt-2 uppercase tracking-widest">Visit Katheryne to accept new quests.</p>
        </div>
      )}
      {reminders.map(rem => (
        <div key={rem.id} className={`card-genshin !my-0 flex flex-col sm:flex-row justify-between items-start sm:items-center group transition-all duration-500 hover:shadow-[0_8px_20px_rgba(211,188,142,0.2)] ${rem.done ? 'opacity-60 bg-[#E8E8E8]/50 border-gray-300' : ''}`}>
          <div className="flex-1 mb-4 sm:mb-0 relative z-10 pl-2 border-l-[3px] border-genshingold">
            <h4 className={"text-xl font-bold font-body transition-all duration-300 " + (rem.done ? 'line-through text-genshindark/50' : 'text-genshindark group-hover:text-genshingold')}>{rem.title}</h4>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-genshindark text-genshinlightgold text-xs px-3 py-1 rounded-sm tracking-widest uppercase">{rem.date}</span>
              <span className="text-genshindark text-sm font-bold flex items-center gap-1">✦ {rem.time}</span>
            </div>
            {rem.note && <p className="text-sm mt-3 text-genshindark/80 bg-white/50 px-4 py-2 rounded-md font-body italic border border-genshingold/20">"{rem.note}"</p>}
          </div>
          <div className="flex gap-3 sm:ml-6 self-end sm:self-center relative z-10">
            <button onClick={() => onToggle(rem.id)} className={"px-5 py-2 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-sm " + (rem.done ? 'bg-gray-200 text-gray-500 hover:bg-gray-300' : 'bg-genshingold text-white hover:bg-[#c2a975] hover:shadow-[0_0_10px_#D3BC8E]')} title={rem.done ? "Reactivate" : "Complete Commission"}>
              {rem.done ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onDelete(rem.id)} className="px-5 py-2 rounded-full font-bold text-sm tracking-wider uppercase bg-white border border-red-300 text-red-500 hover:bg-red-50 transition-all duration-300 shadow-sm" title="Abandon Quest">
              Abandon
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
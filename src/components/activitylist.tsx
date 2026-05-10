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
    <div className="mt-4">
      {reminders.length === 0 && <p className="text-center font-bold text-darkpink">🐱 Belum ada pengingat, yuk tambah!</p>}
      {reminders.map(rem => (
        <div key={rem.id} className="card-cute !bg-white/90 flex justify-between items-center hover:shadow-lg transition-shadow">
          <div className="flex-1">
            <h4 className={"text-xl font-bold transition-all " + (rem.done ? 'line-through text-text/50' : 'text-darkpink')}>{rem.title}</h4>
            <small className="text-text/70 font-semibold">{rem.date} ⏰ {rem.time}</small>
            {rem.note && <p className="text-sm mt-1 text-text/90">💬 {rem.note}</p>}
          </div>
          <div className="flex gap-3 ml-4">
            <button onClick={() => onToggle(rem.id)} className={"p-2 rounded-full shadow-md hover:scale-110 transition-transform flex items-center justify-center w-10 h-10 " + (rem.done ? 'bg-lavender text-text/50' : 'bg-mint')}>
              {rem.done ? '✅' : '✔️'}
            </button>
            <button onClick={() => onDelete(rem.id)} className="p-2 rounded-full shadow-md bg-red-300 hover:scale-110 transition-transform flex items-center justify-center w-10 h-10">
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
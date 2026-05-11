import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay } from 'date-fns';

interface Reminder {
  id: string;
  date: string;
}

interface CalendarViewProps {
  reminders: Reminder[];
  onSelectDate: (date: string) => void;
  selectedDate: string | null;
}

const CalendarView: React.FC<CalendarViewProps> = ({ reminders, onSelectDate, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const remindersByDate = reminders.reduce((acc, r) => {
    if (!acc[r.date]) acc[r.date] = [];
    acc[r.date].push(r);
    return acc;
  }, {});

  return (
    <div className="relative animate-fade-in">
      <div className="flex justify-between items-center mb-6 px-4 relative z-10">
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 text-genshinwhite hover:text-genshingold transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-genshin text-genshingold drop-shadow-md">{format(currentMonth, 'MMMM')}</h2>
          <p className="text-genshinwhite/70 font-body text-sm tracking-[0.2em]">{format(currentMonth, 'yyyy')}</p>
        </div>
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 text-genshinwhite hover:text-genshingold transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 sm:gap-3 p-6 card-genshin relative z-10">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
          <div key={d} className="text-center font-bold text-genshindark/50 pb-2 border-b border-genshingold/30 font-body text-xs tracking-widest">{d}</div>
        ))}
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const hasReminder = remindersByDate[dateStr]?.length > 0;
          const isSelected = selectedDate && isSameDay(day, new Date(selectedDate));
          const isToday = isSameDay(day, new Date());
          
          return (
            <div
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={`relative p-3 sm:p-4 text-center cursor-pointer font-body text-lg transition-all duration-300 rounded-lg flex items-center justify-center
                ${isSelected ? 'bg-genshingold text-white shadow-[0_4px_10px_rgba(211,188,142,0.5)] scale-110 z-10' : 
                  hasReminder ? 'bg-genshinlightgold/50 text-genshindark border border-genshingold/30 hover:bg-genshinlightgold' : 
                  'text-genshindark/80 hover:bg-black/5'}
                ${isToday && !isSelected ? 'ring-2 ring-genshingold ring-offset-2 ring-offset-genshinwhite' : ''}
              `}
            >
              <span className={isSelected ? 'font-bold' : ''}>{format(day, 'd')}</span>
              {hasReminder && <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 text-[10px] sm:text-xs text-genshingold drop-shadow-sm">✦</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
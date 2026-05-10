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
    <div>
      <div className="flex justify-between items-center mb-6 px-4">
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-3 bg-white hover:bg-pink rounded-full shadow-sm transition-colors text-xl">👈</button>
        <h2 className="text-2xl font-bold text-darkpink">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-3 bg-white hover:bg-pink rounded-full shadow-sm transition-colors text-xl">👉</button>
      </div>
      <div className="grid grid-cols-7 gap-2 md:gap-4 p-4 card-cute !bg-white/80">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
          <div key={d} className="text-center font-bold text-darkpink pb-2 border-b-2 border-pink/30">{d}</div>
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
              className={`relative p-2 md:p-3 text-center rounded-xl cursor-pointer transition-all hover:scale-105 font-bold ${isSelected ? 'bg-pink shadow-md text-darkpink' : hasReminder ? 'bg-mint text-darkmint' : 'hover:bg-whitecream text-text/80'} ${isToday ? 'border-4 border-lavender' : ''}`}
            >
              {format(day, 'd')}
              {hasReminder && <span className="absolute bottom-1 right-1 text-xs sm:text-sm">🐾</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
import React, { useState, useEffect } from 'react';
import CalendarView from '../components/calendarview';
import ReminderForm from '../components/reminderform';
import ActivityList from '../components/activitylist';
import axios from 'axios';
import cat6 from '../cute-assets/6.png';

const API = 'http://localhost:4000/api/reminders';

const CalendarPage = () => {
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0,10));

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    const res = await axios.get(API);
    setReminders(res.data || []);
  };

  const addReminder = async (rem) => {
    await axios.post(API, rem);
    fetchReminders();
  };

  const toggleDone = async (id) => {
    await axios.patch(`${API}/${id}/toggle`);
    fetchReminders();
  };

  const deleteReminder = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchReminders();
  };

  const remindersForDate = reminders.filter(r => r.date === selectedDate);

  return (
    <div className="relative">
      <img src={cat6} alt="Calendar Cat" className="absolute -top-4 -right-4 w-32 z-10 animate-peek" />
      <h2 className="text-3xl h-cute mb-6">📅 Kalender Pengingat</h2>
      <CalendarView 
        reminders={reminders} 
        onSelectDate={setSelectedDate} 
        selectedDate={selectedDate}
      />
      <div className="mt-8">
        <h3 className="text-2xl h-cute mb-4">🐾 Pengingat untuk {selectedDate}</h3>
        <ReminderForm onAdd={addReminder} selectedDate={selectedDate} />
        <ActivityList 
          reminders={remindersForDate} 
          onToggle={toggleDone} 
          onDelete={deleteReminder} 
        />
      </div>
    </div>
  );
};

export default CalendarPage;
import React, { useEffect, useState } from 'react';
import ReminderForm from '../components/reminderform';
import ActivityList from '../components/activitylist';
import axios from 'axios';
import cat1 from '../cute-assets/1.png';

const API = 'http://localhost:4000/api/reminders';

const ActivityPage = () => {
  const [reminders, setReminders] = useState([]);
  const selectedDate = null;

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

  return (
    <div className="relative">
      <img src={cat1} alt="Cute Cat" className="absolute -top-8 right-0 w-32 z-10 animate-bounce" />
      <h2 className="text-3xl h-cute mb-2">📋 Aktivitas Pengingat</h2>
      <p className="mb-4 text-text/80 font-semibold">Tanggal terpilih: {selectedDate || 'Hari ini (default)'}</p>
      <ReminderForm onAdd={addReminder} selectedDate={selectedDate} />
      <ActivityList reminders={reminders} onToggle={toggleDone} onDelete={deleteReminder} />
    </div>
  );
};

export default ActivityPage;

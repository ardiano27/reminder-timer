import React, { useState } from 'react';

interface ReminderFormProps {
  onAdd: (rem: { date: string; time: string; title: string; note: string }) => void;
  selectedDate: string | null;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ onAdd, selectedDate }) => {
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
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
    <form onSubmit={handleSubmit} className="card-cute flex flex-col gap-3 !mt-0">
      <h3 className="text-xl h-cute">🐾 Tambah Pengingat Imut</h3>
      <input type="time" value={time} onChange={e => setTime(e.target.value)} required className="input-cute" />
      <input placeholder="Judul (misal: Kasih makan kucing)" value={title} onChange={e => setTitle(e.target.value)} required className="input-cute" />
      <textarea placeholder="Catatan kecil..." value={note} onChange={e => setNote(e.target.value)} rows={2} className="input-cute resize-none" />
      <button type="submit" className="btn-cute mt-2 w-max self-center sm:self-start">✨ Simpan</button>
    </form>
  );
};

export default ReminderForm;

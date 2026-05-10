import express, { Request, Response } from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import fsSync from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const dbFile = path.join(dataDir, 'db.json');

if (!fsSync.existsSync(dataDir)) {
  fsSync.mkdirSync(dataDir, { recursive: true });
}

interface Reminder {
  id: string;
  date: string;
  time: string;
  title: string;
  note: string;
  done: boolean;
  createdAt: string;
}

interface Stats {
  completedCount: number;
  streak: number;
}

interface DBData {
  reminders: Reminder[];
  stats: Stats;
}

const readDB = async (): Promise<DBData> => {
  try {
    const data = await fs.readFile(dbFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { reminders: [], stats: { completedCount: 0, streak: 0 } };
  }
};

const writeDB = async (data: DBData): Promise<void> => {
  await fs.writeFile(dbFile, JSON.stringify(data, null, 2), 'utf8');
};

app.get('/api/reminders', async (req: Request, res: Response) => {
  const db = await readDB();
  res.json(db.reminders);
});

app.post('/api/reminders', async (req: Request, res: Response) => {
  const { date, time, title, note } = req.body;
  const db = await readDB();
  const newRem: Reminder = {
    id: Date.now().toString(),
    date,
    time,
    title,
    note,
    done: false,
    createdAt: new Date().toISOString()
  };
  db.reminders.push(newRem);
  await writeDB(db);
  res.status(201).json(newRem);
});

app.delete('/api/reminders/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await readDB();
  db.reminders = db.reminders.filter(r => r.id !== id);
  await writeDB(db);
  res.json({ success: true });
});

app.patch('/api/reminders/:id/toggle', async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await readDB();
  const reminder = db.reminders.find(r => r.id === id);
  if (!reminder) {
     res.status(404).json({ error: 'not found' });
     return;
  }
  
  reminder.done = !reminder.done;
  if (reminder.done) {
    db.stats.completedCount += 1;
  } else {
    db.stats.completedCount = Math.max(0, db.stats.completedCount - 1);
  }
  
  await writeDB(db);
  res.json(reminder);
});

app.get('/api/stats', async (req: Request, res: Response) => {
  const db = await readDB();
  res.json(db.stats);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🐱 Server imut berjalan di http://localhost:${PORT}`);
});
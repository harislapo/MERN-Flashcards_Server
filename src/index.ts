import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Deck from './models/Deck';

config();

const PORT = 5000;
const app = express();

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.post('/decks', async (req: Request, res: Response) => {
  const deck = new Deck({
    title: req.body.title,
  });
  const response = await deck.save();
  res.json(response);
});

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});

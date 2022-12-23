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

// Fetch all decks
app.get('/decks', async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks);
});

// Add a deck
app.post('/decks', async (req: Request, res: Response) => {
  const deck = new Deck({
    title: req.body.title,
  });
  const response = await deck.save();
  res.json(response);
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
  const id = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(id);
  res.json({
    message: 'Succesfully deleted the deck',
    deck,
  });
});

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});

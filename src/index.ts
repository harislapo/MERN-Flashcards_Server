import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Deck from './models/Deck';
import { getDecksController } from './controllers/getDecksController';
import { addDeckController } from './controllers/addDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';

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
app.get('/decks', getDecksController);

// Add a deck
app.post('/decks', addDeckController);

// Delete a deck
app.delete('/decks/:deckId', deleteDeckController);

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});

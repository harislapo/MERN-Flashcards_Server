import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { getDecksController } from './controllers/getDecksController';
import { addDeckController } from './controllers/addDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { addCardToDeckController } from './controllers/addCardToDeckController';
import { getDeckController } from './controllers/getDeckController';
import { deleteCardController } from './controllers/deleteCardController';

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

// Add a card to an existing deck
app.post('/decks/:deckId/cards', addCardToDeckController);

// Get a deck
app.get('/decks/:deckId', getDeckController);

// Delete a card from deck
app.delete('/decks/:deckId/cards/:index', deleteCardController);

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});

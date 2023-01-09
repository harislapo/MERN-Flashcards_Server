import { Request, Response } from 'express';
import Deck from '../models/Deck';

export const addCardToDeckController = async (req: Request, res: Response) => {
  // Get deck id
  const deckId = req.params.deckId;
  const { cardText } = req.body;

  // Find deck in db
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send('No deck found.');

  // If deck is found, push the card onto the deck's card collection.
  deck.cards.push(cardText);
  await deck.save();

  res.json(deck);
};

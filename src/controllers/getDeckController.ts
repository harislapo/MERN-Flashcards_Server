import { Request, Response } from 'express';
import Deck from '../models/Deck';

export const getDeckController = async (req: Request, res: Response) => {
  const { deckId } = req.params;
  const deck = await Deck.findById(deckId);
  res.json(deck);
};

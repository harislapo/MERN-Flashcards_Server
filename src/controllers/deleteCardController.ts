import { Request, Response } from 'express';
import Deck from '../models/Deck';

export const deleteCardController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;

  //   Get card's index
  const index = req.params.index;
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send('No deck found.');

  //   Delete card with given index
  deck.cards.splice(parseInt(index), 1);

  //   Update the new cards array
  await deck.save();

  res.json(deck);
};

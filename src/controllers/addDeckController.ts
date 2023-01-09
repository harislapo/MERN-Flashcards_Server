import { Request, Response } from 'express';
import Deck from '../models/Deck';

export const addDeckController = async (req: Request, res: Response) => {
  const deck = new Deck({
    title: req.body.title,
  });
  const response = await deck.save();
  res.json(response);
};

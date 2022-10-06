import { Request, Response } from 'express';
import { TwPersonalCard } from '@b0th/tw-utils';

const BACKGROUNDS_DIR = './data/scenes/backgrounds/';
const NONE = '-';

// Generate a scene 
const personalCard = async (req: Request, res: Response) => {
  let { 
    username,
    clan,
    gamemode,
    since,
    description
  } = req.body;

  const card = new TwPersonalCard()
    .setUsername(username || NONE)
    .setClan(clan || NONE)
    .setGamemode(gamemode || NONE)
    .setSince(since || NONE)
    .setDescription(description || NONE);

  try {
    await card.setRandomBackground(BACKGROUNDS_DIR);
    await card.process();
    
    card.canvas.createPNGStream().pipe(res);
  } catch (err) {
    res.status(500).json(err);
  }
}

export {
  personalCard
};

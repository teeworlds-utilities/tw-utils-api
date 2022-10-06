import { Request, Response } from 'express';
import { TwAssetChanger } from '@b0th/tw-utils';

import { argsChecker } from '../libs/error';

// Change element on the dest with src
const changer = async (req: Request, res: Response) => {
  const {
    src,
    dest,
    type,
    elements
  } = req.body;

  if (argsChecker(req.body, 'src', 'dest', 'elements', 'type') === false) {
    res.status(400).json({
      'error': 'Missing arguments'
    });
    return;
  }

  const asset = new TwAssetChanger(type, src, dest);

  try {
    await asset.preprocess();

    asset.extract(...elements)
      .change(...elements)
      .dests[0].canvas.pngStream().pipe(res);
  } catch (err) {
    res.status(500).json(String(err));
  }
}

export { changer };

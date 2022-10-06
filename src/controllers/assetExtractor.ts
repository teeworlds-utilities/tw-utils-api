import { Request, Response } from 'express';
import { TwAssetExtractor } from '@b0th/tw-utils';

import { argsChecker } from '../libs/error';

// Render a skin
const skinRendering = async (req: Request, res: Response) => {
  const {
    skin,
    eye
  } = req.body;

  if (argsChecker(req.body, 'skin') === false) {
    res.status(400).json({
      'error': 'Missing arguments'
    });
    return;
  }

  const asset = new TwAssetExtractor('skin', skin);

  try {
    await asset.preprocess();
    asset.render(eye || 'default_eye');
    asset.rCanvas.createPNGStream().pipe(res);
  } catch (err) {
    if (err.name === 'InvalidFile') {
      res.status(422).json(err);
    } else {
      res.status(500).json(err);
    }
  }
}

// Render a skin with colors
const skinRenderingColor = async (req, res) => {
  const {
    skin,
    eye,
    bcolor,
    fcolor,
    mode
  } = req.body

  if (argsChecker(req.body, 'skin', 'bcolor', 'fcolor', 'mode') === false) {
    res.status(400).json({
      'error': 'Missing arguments'
    });
    return;
  }

  const asset = new TwAssetExtractor('skin', skin);
  try {
    await asset.preprocess();
    const renderEye = eye || 'default_eye';
  
    asset.extract('body', 'body_shadow', 'foot_shadow', 'foot', renderEye)
      .setColor(bcolor, mode, renderEye)
      .setColor(bcolor, mode, 'body')
      .setColor(bcolor, mode, 'body_shadow')
      .setColor(fcolor, mode, 'foot')
      .setColor(fcolor, mode, 'foot_shadow')
      .render(renderEye);
  
    asset.rCanvas.createPNGStream().pipe(res);
  } catch (err) {
    res.status(500).json(err);
  }
}

export { 
  skinRendering,
  skinRenderingColor
};

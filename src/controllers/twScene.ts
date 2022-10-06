import { Request, Response } from 'express';
import fs from 'fs';
import { TwSceneMaker, TwAssetExtractor } from '@b0th/tw-utils';

import { argsChecker } from '../libs/error';

const SCHEMESDIR = './data/scenes/schemes/';

// Generate a scene 
const sceneOnly = async (req: Request, res: Response) => {
  let { name } = req.body;

  if (argsChecker(req.body, 'name') === false) {
    res.status(400).json({
      'error': 'Missing arguments'
    });
    return;
  }

  name += '.json';

  if (fs.readdirSync(SCHEMESDIR).includes(name) === false) {
     res.status(422).json({
      'error': 'Invalid scheme'
    });
    return;
  }

  const path = SCHEMESDIR + name;
  const scene = new TwSceneMaker(path);

  try {
    scene.preprocess();
    await scene.renderScene();
    scene.canvas.createPNGStream().pipe(res);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// Generate a scene with a rendered skin
const sceneRenderWithSkin = async (req: Request, res: Response) => {
  let {
    name,
    skin
  } = req.body;

  if (argsChecker(req.body, 'name', 'skin') === false) {
    res.status(400).json({
      'error': 'Missing arguments'
    });
    return;
  }

  name += '.json';

  if (fs.readdirSync(SCHEMESDIR).includes(name) === false) {
     res.status(422).json({
      'error': 'Invalid scheme'
    });
    return;
  }

  const path = SCHEMESDIR + name;
  const scene = new TwSceneMaker(path);

  try {
    scene.preprocess();
    await scene.renderScene();
  } catch (err) {
    res.status(500).json(err);
    return;
  }

  const asset = new TwAssetExtractor('skin', skin);

  try {
    await asset.preprocess();
    asset.render();
    scene.pasteCanvas(asset.rCanvas, 200, 138, 225, 225);
  } catch (err) {
    res.status(500).json(err);
  }

  scene.canvas.createPNGStream().pipe(res);
}

// Returns the available scenes
const sceneList = async (_req: Request, res: Response) => {
  const schemesDir = './data/scenes/schemes/'
  const schemes = fs.readdirSync(schemesDir).map(
    name => name.split('.')[0]
  );

  res.status(200).json(schemes);
}

export {
  sceneRenderWithSkin,
  sceneOnly,
  sceneList
};

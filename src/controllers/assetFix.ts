import { Request, Response } from 'express';
import { TwAssetFix } from '@b0th/tw-utils';

// Fixing an asset size 
const assetFix = async (req: Request, res: Response) => {
  let { 
    category,
    path,
  } = req.body;

  const asset = new TwAssetFix(category, path);

  try {
    await asset.preprocess()
    
    asset.fix();
    asset.fixedCanvas.createPNGStream().pipe(res);
  } catch (err) {
    res.status(500).json(err);
  }
}

export {
  assetFix
};

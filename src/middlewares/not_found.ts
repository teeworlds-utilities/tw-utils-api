import { Request, Response } from 'express';

export default (_req: Request, res: Response) => {
  res.status(404).json({'error': 'Not found'});
};

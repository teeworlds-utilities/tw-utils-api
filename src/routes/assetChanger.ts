import express from 'express';

import * as controller from '../controllers/assetChanger';

const router = express.Router();

router.get('/changer', controller.changer);

export default router;

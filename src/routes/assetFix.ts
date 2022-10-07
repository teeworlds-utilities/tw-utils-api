import express from 'express';

import * as controller from '../controllers/assetFix';

const router = express.Router();

router.get('/assetFix', controller.assetFix);

export default router;

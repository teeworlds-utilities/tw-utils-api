import express from 'express';

import * as controller from '../controllers/twCard';

const router = express.Router();

router.get('/personalCard', controller.personalCard);

export default router;

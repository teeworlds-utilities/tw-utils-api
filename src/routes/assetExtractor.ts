import express from 'express';

import * as controller from '../controllers/assetExtractor';

const router = express.Router();

router.get('/render', controller.skinRendering);
router.get('/renderColor', controller.skinRenderingColor);

export default router;

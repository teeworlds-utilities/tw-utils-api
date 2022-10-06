import express from 'express';

import * as controller from '../controllers/twScene';

const router = express.Router();

router.get('/scene', controller.sceneRenderWithSkin);
router.get('/sceneOnly', controller.sceneOnly);
router.get('/sceneList', controller.sceneList);

export default router;

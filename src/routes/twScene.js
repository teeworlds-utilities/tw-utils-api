const express = require("express")
const router = express.Router()
const controller = require("../controllers/twScene")

router.get("/scene", controller.sceneRender)
router.get("/sceneList", controller.sceneList)

module.exports = router

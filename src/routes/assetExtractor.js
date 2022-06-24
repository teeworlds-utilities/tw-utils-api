const express = require("express")
const router = express.Router()
const controller = require("../controllers/assetExtractor")

router.get("/render", controller.skinRendering)
router.get("/renderColor", controller.skinRenderingColor)

module.exports = router

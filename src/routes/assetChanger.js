const express = require("express")
const router = express.Router()
const controller = require("../controllers/assetChanger")

router.get("/changer", controller.changer)

module.exports = router
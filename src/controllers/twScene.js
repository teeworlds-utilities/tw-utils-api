const { argsChecker } = require("../libs/error")
const { listFile } = require("../libs/utils")

const { TwSceneMaker, TwAssetExtractor } = require("@b0th/tw-utils")

// Generate a scene
const sceneRender = async (req, res) =>
{
    var {
        name,
        skin
    } = req.body

    if (!argsChecker(req.body, "name", "skin"))
        return (res.status(400).json({"error": "Missing arguments"}))

    name += ".json"

    const schemesDir = "./data/scenes/schemes/"

    if (listFile(schemesDir).includes(name) === false)
        return ((res.status(422).json({"error": "Invalid scheme"})))

    const path = schemesDir + name
    const scene = new TwSceneMaker(path)

    try {
        scene.preprocess()
        await scene.renderScene()
    } catch (err) {
        return (res.status(500).json(err))
    }

    const asset = new TwAssetExtractor("skin", skin)

    try {
        await asset.preprocess()
        asset.render()
        scene.pasteCanvas(asset.rCanvas, 200, 138, 225, 225)
    } catch (err) {
        res.status(500).json(err)
    }

    scene.canvas.pngStream().pipe(res)
}

// Returns the available scenes
const sceneList = async (req, res) =>
{
    const schemesDir = "./data/scenes/schemes/"
    const schemes = listFile(schemesDir).map(
        name => name.split(".")[0]
    )

    res.status(200).json(schemes)
}

module.exports = {
    sceneRender,
    sceneList
}

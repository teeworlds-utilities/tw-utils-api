const { argsChecker } = require("../libs/error")
const { TwAssetExtractor } = require("@b0th/tw-utils")

// Render a skin
const skinRendering = async (req, res) =>
{
    const {
        skin,
        eye
    } = req.body

    if (!argsChecker(req.body, "skin"))
        return (res.status(400).json({"error": "Missing arguments"}))

    const asset = new TwAssetExtractor("skin", skin)
    try {
        await asset.preprocess()
        asset.render(eye || "default_eye")
        asset.rCanvas.pngStream().pipe(res)
    } catch (err) {
        if (err.name === "InvalidFile")
            res.status(422).json(err)
        else
            res.status(500).json(err)
    }
}

// Render a skin with colors
const skinRenderingColor = async (req, res) =>
{
    const {
        skin,
        eye,
        bcolor,
        fcolor,
        mode
    } = req.body

    if (!argsChecker(req.body, "skin", "bcolor", "fcolor", "mode"))
        return (res.status(400).json({"error": "Missing arguments"}))

    const asset = new TwAssetExtractor("skin", skin)
    try {
        await asset.preprocess()
        const renderEye = eye || "default_eye"

        asset.extract("body", "body_shadow", "foot_shadow", "foot", renderEye)
        asset.setColor(bcolor, mode, renderEye)
        asset.setColor(bcolor, mode, "body")
        asset.setColor(bcolor, mode, "body_shadow")
        asset.setColor(fcolor, mode, "foot")
        asset.setColor(fcolor, mode, "foot_shadow")
        asset.render(renderEye)
        asset.rCanvas.pngStream().pipe(res)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    skinRendering,
    skinRenderingColor
}

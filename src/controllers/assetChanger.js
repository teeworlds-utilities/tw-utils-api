const { argsChecker } = require("../libs/error")
const { TwAssetChanger } = require("@b0th/tw-utils")

// Change element on the dest with src
const changer = async (req, res) =>
{
    const {
        src,
        dest,
        type,
        elements
    } = req.body

    if (!argsChecker(req.body, "src", "dest", "elements", "type"))
        return (res.status(400).json({"error": "Missing arguments"}))

    console.log(elements)
    const asset = new TwAssetChanger(type, src, dest)
    try {
        await asset.preprocess()
        asset.extract(...elements)
        asset.change(...elements)
        asset.dests[0].canvas.pngStream().pipe(res)
    } catch (err) {
        res.status(500).json(String(err))
    }
}

module.exports = {
    changer
}
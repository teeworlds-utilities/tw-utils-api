const fs = require("fs")

const listFile = (path) =>
{
    var ret = fs.readdirSync(path, function (err) {
        if (err)
            throw err
    })

    return (ret)
}

module.exports = {
    listFile
}

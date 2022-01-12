// Check if every arguments needed are in the HTTP(s) request
const argsChecker = (args, ...neededArgs) =>
{
    if (!args)
        return (false)

    const keys = Object.keys(args)

    for (const neededArg of neededArgs) {
        if (keys.includes(neededArg) == false) {
            return (false)
        }
    }
    return (true)
}

module.exports = {
    argsChecker
}
// Load .env
require("dotenv").config()

// External libs
const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

// Routers
const notFound = require("./middlewares/not_found")
const assetRouter = require("./routes/assetExtractor")
const assetChanger = require("./routes/assetChanger")

// Disabling this header because attackers can see what program is used
app.disable("x-powered-by")
app.use(cors())
app.use(bodyParser.json())

// Routes
app.use("/", assetRouter)
app.use("/", assetChanger)

// If unknow route
app.use(notFound)

// Bind a port for HTTP server
const port = process.env.PORT
app.listen(port, () => {console.log(`Listening on ${port}`)})

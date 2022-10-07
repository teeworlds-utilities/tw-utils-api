// Load .env
import dotenv from 'dotenv';

dotenv.config();

// External libs
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

// Routers
import notFound from './middlewares/not_found';
import assetRouter from './routes/assetExtractor';
import assetChanger from './routes/assetChanger';
import twScene from './routes/twScene';
import twCard from './routes/twCard';
import assetFix from './routes/assetFix';

function main() {
  const app = express()

    // Disabling this header because attackers can see what program is used
    .disable('x-powered-by')
    .use(cors())
    .use(bodyParser.json())

    // Routes
    .use('/', assetRouter)
    .use('/', assetChanger)
    .use('/', twScene)
    .use('/', twCard)
    .use('/', assetFix)

    // If unknown route
    .use(notFound);

  // Bind a port for HTTP server
  const port = process.env.PORT;

  app.listen(port, () => console.log(`Listening on ${port}`));
}

main();

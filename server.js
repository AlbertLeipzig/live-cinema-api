import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { filmRouter } from './routers/filmRouter.js';
import { movieSessionRouter } from './routers/movieSessionRouter.js';
import { roomRouter } from './routers/roomRouter.js';
import { fakeRouter } from './utils/generateFakeData.js';
import { connectToDb } from './utils/connectToDb.js';
import { handleError } from './utils/handleError.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 9090;
const DB_URI = process.env.DB_URI;

app.use(express.json());
app.use(
  cors({
    'Access-Control-Allow-Origin': '*',
  })
);

app.use('/film', filmRouter);
app.use('/session', movieSessionRouter);
app.use('/room', roomRouter);
app.use('/fake', fakeRouter);

app.use(handleError);

const startServer = () => {
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
};

/* startServer(); */

connectToDb(DB_URI).then(() => startServer());

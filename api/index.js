import express from 'express';
import cors from 'cors';
import { getSolPrice } from './controllers/getSolPrice.js';

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/sol-price', getSolPrice);



app.listen(5000, () => console.log(`Listening on port ${PORT}...`));


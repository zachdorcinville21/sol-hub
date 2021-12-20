import express from 'express';
import cors from 'cors';
import { getSolPrice } from './controllers/getSolPrice.js';
import { getSolDayChange } from './controllers/getSolDayChange.js';

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/sol-price', getSolPrice);

app.get('/sol-day-change', getSolDayChange);


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


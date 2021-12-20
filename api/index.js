import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getSolPrice } from './controllers/getSolPrice.js';
import { getSolDayChange } from './controllers/getSolDayChange.js';
import { createUser } from './controllers/createUser.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.get('/sol-price', getSolPrice);

app.get('/sol-day-change', getSolDayChange);

app.post('/create-user', createUser);


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


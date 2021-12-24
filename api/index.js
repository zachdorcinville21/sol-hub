import express from 'express';
import cors from 'cors';
import { getSolPrice } from './controllers/getSolPrice.js';
import { getSolDayChange } from './controllers/getSolDayChange.js';
import UserController from './controllers/types/UserController.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const uc = new UserController();

app.get('/sol-price', getSolPrice);

app.get('/sol-day-change', getSolDayChange);

app.post('/create-user', uc.createUser);

app.post('/update-username', uc.updateUsername);

app.post('/get-username', uc.getUsername);


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


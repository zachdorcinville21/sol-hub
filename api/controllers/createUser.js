import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserSchema } from '../models/index.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const Users = mongoose.model('Model', UserSchema, 'Users');

export async function createUser(req, res) {
    const { walletAddress } = req.body.data;

    const user = new Users({
        wallet_addr: walletAddress,
        username: null,
    });

    await user.save((err, newUser) => {
        if (err) {
            res.status(500);
            console.error(err);
        } else {
            res.status(200);
            console.log(`${newUser.wallet_addr} was saved to the Users collection.`);
        }
    });

    return res.sendStatus(res.statusCode);
}


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserSchema } from '../../models/index.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const Users = mongoose.model('Model', UserSchema, 'Users');

/**
 * An object for performing CRUD operations on a user.
 */
export default class UserController {
    async createUser(req, res) {
        const { walletAddress } = req.body.data;

        const existingUser = await Users.findOne({ wallet_addr: walletAddress });

        if (typeof existingUser !== 'undefined' && existingUser !== null) {
            console.log('user already exists.');
            return res.sendStatus(200);
        }

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

    async updateUsername(req, res) {
        const { username, walletAddress } = req.body.data;
        let updatedUser = null;

        try {
            updatedUser = await Users.findOneAndUpdate({ wallet_addr: walletAddress }, {
                $set: {
                    username: username,
                }
            }, { new: true });
        } catch (e) {
            throw new Error(e);
        }

        return res.send(updatedUser);
    }

    async getUsername(req, res) {
        const { walletAddress } = req.body.data;

        let username = null;

        try {
            const user = await Users.findOne({ wallet_addr: walletAddress });
            if (typeof user !== 'undefined' && user !== null) username = user.username;
        } catch (e) {
            throw new Error(e);
        }

        return res.send({ username: username });
    }
}


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
    constructor() {
        this.onlineUsers = [];
        this.createUser = this.createUser.bind(this);
    }

    async createUser(req, res) {
        const { walletAddress } = req.body.data;

        const existingUser = await Users.findOne({ wallet_addr: walletAddress });

        if (existingUser !== null) {
            console.log('user already exists.');
            console.log(this.onlineUsers);
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

    async getUser(walletAddr) {
        try {
            return await Users.findOne({ wallet_addr: walletAddr });
        } catch (e) {
            throw new Error(`Unable to retreive user: ${e}`);
        }
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

    addOnlineUser(socketId, walletAddress, username) {
        console.log('attempting to add');
        if (!this.onlineUsers.some(user => user.username === username && user.wallet_addr === walletAddress)) {
            this.onlineUsers.push({
                socket_id: socketId,
                wallet_addr: walletAddress, 
                username: username,
            });
        }
    }

    removeOnlineUser(socketId) {
        this.onlineUsers = this.onlineUsers.filter(user => user.socket_id !== socketId);
    }

    getOnlineUser(walletAddress) {
        let user = null;

        if (this.onlineUsers.some(user => user.wallet_addr === walletAddress && user.username !== null)) {
            user = this.onlineUsers.find(user => user.wallet_addr === walletAddress && user.username !== null);
        } else {
            user = this.onlineUsers.find(user => user.wallet_addr === walletAddress);
        }

        if (!user) return null;

        return user;
    }
}


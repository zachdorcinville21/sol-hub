import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserSchema } from '../../models/index.js';
import nodemailer from 'nodemailer';

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
            console.log('existing user returned');
            return res.sendStatus(200);
        }

        const user = new Users({
            wallet_addr: walletAddress,
            username: null,
            email: null,
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

    async updateEmail(req, res) {
        const { email, walletAddress } = req.body.data;
        let updatedUser = null;

        try {
            updatedUser = await Users.findOneAndUpdate({ wallet_addr: walletAddress }, {
                $set: {
                    email: email,
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
        console.log(this.onlineUsers)
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

    async sendEmail(senderAddr, receiverAddr, message) {
        const recipient = await Users.findOne({ wallet_addr: receiverAddr });
        const email = recipient.email;

        if (email === null) return;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'notifications@solhub.app',
                pass: 'solZ1135'
            }
        });

        const mailOptions = {
            from: 'notifications@solhub.app',
            to: email,
            subject: `$SOLHub: new message from ${senderAddr}`,
            text: message
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (e) {
            throw new Error(e);
        }
    }
}


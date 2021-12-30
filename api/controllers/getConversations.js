import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ConversationSchema } from '../models/index.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const Conversations = mongoose.model('Conversations', ConversationSchema);

export async function getConversations(req, res) {
    const { walletAddress } = req.body.data;
    let convos = null;

    try {
        convos = await Conversations.find({ participants: { $in: [walletAddress] } });
    } catch (e) {
        throw new Error(`Unable to fetch conversation data: ${e}`);
    }

    return res.send({ convos: convos });
}


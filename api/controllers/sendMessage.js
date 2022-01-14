import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ConversationSchema } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const Conversations = mongoose.model('Conversations', ConversationSchema);

export async function sendMessage(senderWalletAddress, receiverWalletAddress, message) {
    const potentialCurrentConvo = await Conversations.findOne({ participants: { $all: [senderWalletAddress, receiverWalletAddress] } });

    if (potentialCurrentConvo !== null) {
        try {
            const messagesLength = potentialCurrentConvo.messages.length;
            await Conversations.findOneAndUpdate({ participants: { $all: [senderWalletAddress, receiverWalletAddress] } }, {
                $push: {
                    messages: {
                        message_id: messagesLength + 1,
                        author_id: senderWalletAddress,
                        receiver_id: receiverWalletAddress,
                        message: message,
                        created_at: new Date(),
                    }
                }
            });
        } catch (e) {
            throw new Error(`Unable to send message: ${e}`);
        }
    } else {
        const convoId = uuidv4();

        const convo = new Conversations({
            convo_id: convoId,
            participants: [senderWalletAddress, receiverWalletAddress],
            updated_at: new Date(),
            messages: [{
                message_id: 1,
                author_id: senderWalletAddress,
                receiver_id: receiverWalletAddress,
                message: message,
                created_at: new Date(),
            }],
        });

        await convo.save((err, newConvo) => {
            if (err) {
                throw new Error(`Unable to save`);
            } else {
                console.log(`conversation with id ${newConvo.convo_id} was saved to the Conversations collection.`);
            }
        });
    }
}


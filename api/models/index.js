import mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
    "wallet_addr": "String",
    "username": "String"
});

export const ConversationSchema = new mongoose.Schema({
    convo_id: "String",
    participants: [String],
    updated_at: "Date",
    messages: [{
        message_id: "Number",
        author_id: "String",
        receiver_id: "String",
        message: "String",
        created_at: "Date"
    }]
});


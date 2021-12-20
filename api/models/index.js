import mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
    "wallet_addr": "String",
    "username": "String"
});


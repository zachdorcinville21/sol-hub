import axios from 'axios';
import APIQuery from './APIQuery';

export default class UserController extends APIQuery {
    async getUsername(walletAddress: string | null): Promise<string | null> {
        let username = null;

        const options = {
            method: 'POST',
            data: { walletAddress: walletAddress },
        };

        try {
            const result = await axios.post(this.getUsernameRoute, options);
            if (result) username = result.data.username;
        } catch (e) {
            console.error(e);
        }

        return username;
    }

    async updateUsername(walletAddress: string | null, username: string): Promise<string> {
        let newUsername = null;

        const options = {
            method: 'POST',
            data: {
                walletAddress: walletAddress,
                username: username
            },
        };

        try {
            const result = await axios.post(this.updateUsernameRoute, options);
            if (result) newUsername = result.data.username;
        } catch (e) {
            console.error(e);
        }

        return newUsername;
    }

    async updateEmail(walletAddress: string | null, email: string): Promise<string> {
        let newEmail = null;

        const options = {
            method: 'POST',
            data: {
                walletAddress: walletAddress,
                email: email
            },
        };

        try {
            const result = await axios.post(this.updateEmailRoute, options);
            if (result) newEmail = result.data.email;
        } catch (e) {
            console.error(e);
        }

        return newEmail;
    }

    async getConversations(walletAddress: string): Promise<{ [key: string]: Convo[] }> {
        let msgObjects = null;

        const options = {
            method: 'POST',
            data: { walletAddress: walletAddress },
        };

        try {
            const response = await axios.post(this.getConvosRoute, options);
            if (response) msgObjects = response.data;
        } catch (e) {
            console.error(e);
        }

        return msgObjects;
    }

    async deleteConversation(senderWallet: string | null, receiverWallet: string | null): Promise<string> {
        let status = null;

        const options = {
            method: 'POST',
            data: { senderWallet: senderWallet, receiverWallet: receiverWallet },
        };

        try {
            const response = await axios.post(this.deleteConvoRoute, options);
            if (response) status = response.data;
        } catch (e) {
            console.error(e);
        }

        return status;
    }

    async getSolNfts(publicKey: string): Promise<Record<string, any>[]> {
        let nfts = [];

        try {
            const result = await axios.post(this.getSolNftsRoute, {
                data: {
                    publicKey,
                }
            });
            if (result) nfts = result.data.tokenList;
        } catch (e) {
            console.error(e);
        }

        return nfts;
    }
}


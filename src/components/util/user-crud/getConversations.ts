import axios from 'axios';
import { Convo } from '../types/Message';


export async function getConversations(walletAddress: string): Promise<{ [key: string]: Convo[] }> {
    let msgObjects = null;

    const options = {
        method: 'POST', 
        data: { walletAddress: walletAddress },
    };

    try {
        const response = await axios.post('http://localhost:5000/get-conversations', options);
        if (response) msgObjects = response.data;
    } catch (e) {
        console.error(e);
    }

    return msgObjects;
}



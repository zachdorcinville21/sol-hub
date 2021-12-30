import axios from 'axios';


export async function getConversations(walletAddress: string): Promise<{ [key: string]: any[] }> {
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



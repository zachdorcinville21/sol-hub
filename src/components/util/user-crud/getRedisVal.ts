import axios from 'axios';
import { Message } from '../types/Message';

export async function getRedisVal(key: string): Promise<Message[]> {
    let msgs = null;

    const options = {
        method: 'POST', 
        data: { key: key },
    };

    try {
        const response = await axios.post('http://localhost:5000/get-redis-val', options);
        if (response) msgs = response.data;
    } catch (e) {
        console.error(e);
    }

    return msgs;
}
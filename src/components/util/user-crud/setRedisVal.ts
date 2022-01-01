import axios from 'axios';


export async function setRedisVal(key: string, val: any): Promise<string> {
    let status = null;

    const options = {
        method: 'POST', 
        data: { key: key, val: val },
    };

    try {
        const response = await axios.post('http://localhost:5000/set-redis-val', options);
        if (response) status = response.data;
    } catch (e) {
        console.error(e);
    }

    return status;
}


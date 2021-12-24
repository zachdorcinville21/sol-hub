import axios from 'axios';


export async function getUsername(walletAddress: string | null): Promise<string | null> {
    let username = null;

    const options = {
        method: 'POST', 
        data: { walletAddress: walletAddress },
    };

    try {
        const result = await axios.post('http://localhost:5000/get-username', options);
        if (result) username = result.data.username;
    } catch (e) {
        console.error(e);
    }

    return username;
}


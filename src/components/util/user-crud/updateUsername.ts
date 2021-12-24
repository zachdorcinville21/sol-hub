import axios from 'axios';


export async function updateUsername(walletAddress: string | null, username: string): Promise<string> {
    let newUsername = null;

    const options = {
        method: 'POST',
        data: {
            walletAddress: walletAddress,
            username: username
        },
    };

    try {
        const result = await axios.post('http://localhost:5000/update-username', options);
        if (result) newUsername = result.data.username;
    } catch (e) {
        console.error(e);
    }

    return newUsername;
}


import axios from 'axios';


export async function updateEmail(walletAddress: string | null, email: string): Promise<string> {
    let newEmail = null;

    const options = {
        method: 'POST',
        data: {
            walletAddress: walletAddress,
            email: email
        },
    };

    try {
        const result = await axios.post('http://localhost:5000/update-email', options);
        if (result) newEmail = result.data.email;
    } catch (e) {
        console.error(e);
    }

    return newEmail;
}


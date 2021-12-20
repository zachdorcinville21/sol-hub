import axios from 'axios';


export async function createUser(walletAddress: string): Promise<string | null> {
    let status: string | null = null;

    const options = {
        method: 'POST', 
        data: { walletAddress: walletAddress },
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await axios.post('http://localhost:5000/create-user', options);
        const data = response.data;
        console.log("🚀 ~ file: createUser.ts ~ line 17 ~ createUser ~ data", data)

        if (data) status = data;
    } catch (e) {
        console.error(e);
    }

    return status;
}


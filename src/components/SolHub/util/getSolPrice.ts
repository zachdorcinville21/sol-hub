import axios from 'axios';

export async function getSolPrice(): Promise<number> {
    let solPrice = null;
    
    try {
        const result = await axios.get('http://localhost:5000/sol-price');

        if (result.data) solPrice = result.data;
    } catch (e) {
        console.error(e);
    }

    return solPrice;
}
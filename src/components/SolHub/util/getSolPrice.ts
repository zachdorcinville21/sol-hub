import axios from 'axios';

export async function getSolPrice(): Promise<number> {
    let solPrice = null;
    
    try {
        const result = await axios.get('https://solhub.app/api/sol-price');

        if (result.data) solPrice = result.data.price;
    } catch (e) {
        console.error(e);
    }

    return solPrice;
}
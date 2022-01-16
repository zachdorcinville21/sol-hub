import axios from 'axios';


export async function getSolDayChange(): Promise<any> {
    let data = null;

    try {
        const result = await axios.get('https://solhub.app/api/sol-day-change');
        
        if (result) data = result.data;
    } catch (e) {
        console.error(e);
    }

    return data;
}


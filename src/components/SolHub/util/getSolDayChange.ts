import axios from 'axios';


export async function getSolDayChange(): Promise<number> {
    let data = null;

    try {
        const result = await axios.get('http://localhost:5001/api/sol-day-change');
        
        if (result) data = result.data.change;
    } catch (e) {
        console.error(e);
    }

    return data;
}


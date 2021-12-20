import axios from 'axios';

export async function getSolDayChange(req, res) {
    let change = null;

    try {
        const result = await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT');
        
        if (result) change = result.data;
    } catch (e) {
        throw new Error(e);
    }

    return res.send(change);
}


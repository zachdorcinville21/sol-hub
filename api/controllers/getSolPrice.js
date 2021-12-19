import axios from 'axios';

export async function getSolPrice(req, res) {
    let price = null;

    try {
        const result = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT');
        const data = result.data;
        console.log(data)

        if (data) price = data;
    } catch (e) {
        console.error(e)
    }

    return res.send(price);
}
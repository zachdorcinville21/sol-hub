import axios from 'axios';

export async function getSolDayChange(req, res) {
    let change = null;

    try {
        const result = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=SOL', {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
            }
        });

        const { percent_change_24h: solChange } = result.data.data.SOL[0].quote.USD;

        if (solChange) change = solChange;
    } catch (e) {
        throw new Error(e);
    }

    return res.send({ change });
}
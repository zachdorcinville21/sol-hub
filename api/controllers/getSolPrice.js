import axios from 'axios';

export async function getSolPrice(req, res) {
    let price = null;

    try {
        const result = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=SOL', {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
            }
        });

        const { price: solPrice } = result.data.data.SOL[0].quote.USD;

        if (solPrice) price = solPrice;
    } catch (e) {
        console.error(e);
    }

    return res.send({ price });
}
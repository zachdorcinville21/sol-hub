import axios from 'axios';

export async function getSolDayChange(req, res) {
    try {
        const result = await axios.get('https://api.coingecko.com/api/v3/coins/solana', {
            headers: {
                'x-cg-pro-api-key': process.env.COINGECKO_API_KEY,
            }
        });
        return res.send({ change: result.data.market_data.price_change_percentage_24h_in_currency.usd });
    } catch (e) {
        return res.status(500).send({ message: `unable to fetch price change: ${e}` });
    }
}


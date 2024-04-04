import axios from 'axios';

export async function getSolPrice(_, res) {
    try {
        const chartDataResult = await axios.get(`https://api.coingecko.com/api/v3/coins/solana`, {
            headers: {
                'x-cg-api-key': process.env.COINGECKO_API_KEY,
            }
        });

        return res.send({ price: chartDataResult.data.market_data.current_price.usd })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: `unable to fetch price: ${e}` });
    }
}


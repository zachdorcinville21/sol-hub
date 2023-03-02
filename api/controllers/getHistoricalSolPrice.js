import axios from 'axios';

export async function getHistoricalSolPrice(req, res) {
    const { interval } = req.body.data;

    let solPrices = [];
    const start = new Date(Date.now() - 86400000).toISOString(), end = new Date(Date.now()).toISOString();

    try {
        const result = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/historical?symbol=SOL&time_start=${start}&time_end=${end}`, {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
            },
        });

        const { quotes } = result.data.data.SOL[0];
        console.log("🚀 ~ file: getHistoricalSolPrice.js:17 ~ getHistoricalSolPrice ~ quotes:", quotes)

        if (result) solPrices = quotes;
        res.send({ solPrices });
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}
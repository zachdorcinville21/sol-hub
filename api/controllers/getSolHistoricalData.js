import axios from "axios";

export async function getSolHistoricalData(req, res) {
  try {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/solana/market_chart?days=7&vs_currency=usd`, {
      headers: {
        'x-cg-api-key': process.env.COINGECKO_API_KEY,
      }
    });
    res.send({ prices: result.data.prices });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: `unable to fetch historical data: ${e}` });
  }
}
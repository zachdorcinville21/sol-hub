import axios from "axios";
import { sub } from 'date-fns';

export async function getSolHistoricalData(_, res) {
  const oneMonthAgo = sub(new Date(), {
    months: 1
  })
  try {
    const result = await axios.get(`https://pro-api.coinmarketcap.com/v3/cryptocurrency/quotes/historical?symbol=SOL&time_start=${oneMonthAgo.getTime()}&interval=daily&count=30`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
      }
    });
    const quotes = result.data.data.SOL[0].quotes.map((quote) => ({ timestamp: new Date(quote.timestamp).getTime(), price: quote.quote.USD.price }));
    res.send({ quotes });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: `unable to fetch historical data: ${e}` });
  }
}
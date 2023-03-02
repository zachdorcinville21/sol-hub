import axios from "axios";
import { useEffect, useRef, useMemo } from "react";

enum PriceDataKeys {
  ClosePrice = "4a. close (USD)",
}

export const useHistoricalSolPrices = () => {
  const historicalPrices = useRef<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          "http://localhost:5001/api/get-sol-historical",
          {
            data: {
              interval: "1d",
            },
          }
        );
        console.log(res.data.solPrices)
        if (res) historicalPrices.current = res.data.solPrices;
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const solPrices: GraphPoint[] = useMemo(() => {
    return historicalPrices.current.map((val: any) => {
      return {
        name: "Price",
        date: val.timestamp,
        value: val.quote.USD.price,
      };
    });
  }, [historicalPrices.current]);

  return solPrices;
};

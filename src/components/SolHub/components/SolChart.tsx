import React, { useState, useEffect, useMemo } from "react";
import { SolChartData } from "../../util/types/SolChartData";
import { getSolHistoricalData } from "../util/getSolHistoricalData";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

interface PriceDataItem {
  name: string;
  price: number;
  xAxisLabel: string;
}

interface SolChartProps {
  solDayChange: string;
}

export function SolChart({ solDayChange }: SolChartProps) {
  const [prices, setPrices] = useState<SolChartData>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await getSolHistoricalData();
      if (result !== null) {
        setPrices(result);
        setIsLoading(false);
      } else {
        return;
      }
    })();
  }, []);

  const chartData = useMemo((): PriceDataItem[] => {
    return prices.map((priceArr) => ({
      name: format(priceArr[0], "M/dd, h:mm aaa"),
      price: priceArr[1],
      xAxisLabel: format(priceArr[0], "M/dd"),
    }));
  }, [prices]);

  return (
    <AreaChart width={1400} height={650} data={chartData}>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="5%"
            stopColor={
              solDayChange.includes("-") ? "rgb(185, 28, 28)" : "#03C03C"
            }
            stopOpacity={0.8}
          />
          <stop
            offset="95%"
            stopColor={
              solDayChange.includes("-") ? "rgb(185, 28, 28)" : "#03C03C"
            }
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis dataKey="price" />
      <Tooltip
        formatter={(value: number) => `$${value.toFixed(2)}`}
        contentStyle={{
          backgroundColor: "#000",
          border: "none",
          borderRadius: '4px'
        }}
        labelStyle={{color: '#fff'}}
      />
      <Area
        type="monotone"
        dataKey="price"
        fill="url(#gradient)"
        fillOpacity={1}
      />
    </AreaChart>
  );
}

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { useSolQuotes } from "../../util/hooks/react-query/useSolQuotes";
import { PuffLoader } from "react-spinners";
import { theme } from "../../util/theme";
import { motion } from "framer-motion";
import { useScreenSize } from "../../util/hooks/useScreenSize";

interface PriceDataItem {
  name: string;
  price: number;
  xAxisLabel: string;
}

interface SolChartProps {
  solDayChange: string;
}

export function SolChart({ solDayChange }: SolChartProps) {
  const { data: quotes, isLoading, isError } = useSolQuotes();
  const { screenWidth } = useScreenSize();

  const chartData = useMemo((): PriceDataItem[] => {
    if (!quotes) return [];
    return quotes.map((quote) => ({
      name: format(quote.timestamp, "M/dd, h:mm aaa"),
      price: quote.price,
      xAxisLabel: format(quote.timestamp, "M/dd"),
    }));
  }, [quotes]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-80">
        <PuffLoader color={theme.colors.blue[900]} size="100px" />
      </div>
    );
  }

  return (
    <motion.div
      className="w-full lg:w-11/12 flex justify-center items-center min-h-[300px] lg:min-h-[600px] max-w-[87.5rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ResponsiveContainer
        width="100%"
        minHeight={screenWidth < 768 ? 300 : 600}
        style={{ maxWidth: "87.5rem" }}
      >
        <AreaChart
          data={chartData}
          margin={
            screenWidth > 768
              ? { top: 0, right: 50, left: 0, bottom: 0 }
              : { left: -24 }
          }
        >
          <defs>
            {solDayChange.includes("-") ? (
              <linearGradient id="gradient" x1=".5" y1="1" x2=".5">
                <stop stop-color="#0d1421" />
                <stop offset=".32" stop-color="#0d1421" stop-opacity=".5" />
                <stop offset="1" stop-color="#7f1d1d" stop-opacity=".3" />
              </linearGradient>
            ) : (
              <linearGradient id="gradient" x1=".5" y1="1" x2=".5">
                <stop stop-color="#0d1421" />
                <stop offset=".32" stop-color="#0d1421" stop-opacity=".5" />
                <stop offset="1" stop-color="#28c420" stop-opacity=".3" />
              </linearGradient>
            )}
          </defs>
          <XAxis dataKey="name" stroke={theme.colors.gray[850]} />
          <YAxis dataKey="price" stroke={theme.colors.gray[850]} />
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: "#000",
              border: "none",
              borderRadius: "4px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="price"
            fill="url(#gradient)"
            fillOpacity={1}
            stroke={solDayChange.includes("-") ? "darkred" : "green"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

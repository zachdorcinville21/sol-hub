import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { SolChartData } from "../../types/SolChartData";
import { SOL_PRICES_QUERY_KEY } from "../../../../constants";
import { getSolHistoricalData } from "../../../SolHub/util/getSolHistoricalData";

export function useSolQuotes(): UseQueryResult<SolChartData> {
  return useQuery({
    queryKey: [SOL_PRICES_QUERY_KEY],
    queryFn: getSolHistoricalData,
    staleTime: Infinity,
  });
}

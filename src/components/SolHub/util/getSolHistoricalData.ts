import axios from "axios";
import { API_BASE_URL } from "../../../constants";
import { SolChartData } from "../../util/types/SolChartData";

export async function getSolHistoricalData(): Promise<SolChartData | null> {
  try {
    const result = await axios.get(`${API_BASE_URL}/api/sol-historical`);
    return result.data.quotes;
  } catch (e) {
    console.error(e);
    return null;
  }
}

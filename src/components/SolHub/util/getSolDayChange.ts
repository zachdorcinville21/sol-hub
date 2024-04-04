import axios from "axios";
import { API_BASE_URL } from "../../../constants";

export async function getSolDayChange(): Promise<number> {
  let data = null;

  try {
    const result = await axios.get(`${API_BASE_URL}/api/sol-day-change`);
    if (result) data = result.data.change;
  } catch (e) {
    console.error(e);
  }

  return data;
}

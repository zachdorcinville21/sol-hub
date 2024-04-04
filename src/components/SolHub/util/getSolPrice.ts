import axios from "axios";
import { API_BASE_URL } from "../../../constants";

export async function getSolPrice(): Promise<number> {
  let solPrice = null;

  try {
    const result = await axios.get(`${API_BASE_URL}/api/sol-price`);

    if (result.data) solPrice = result.data.price;
  } catch (e) {
    console.error(e);
  }

  return solPrice;
}

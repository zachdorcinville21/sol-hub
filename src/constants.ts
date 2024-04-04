export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://solhub.app"
    : "http://localhost:5000";

export const SOL_PRICES_QUERY_KEY = 'sol-prices';

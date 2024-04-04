export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://solhub.app"
    : "http://localhost:5000";

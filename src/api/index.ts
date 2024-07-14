import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";
let baseURL = "https://localhost:7212/api/v1";

if (!isDevelopment) {
  baseURL = "https://localhost:7212/api/v1";
}

const api = axios.create({
  baseURL,
});

export default api;

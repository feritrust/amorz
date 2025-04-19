import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://88.99.55.86:3000", // Base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

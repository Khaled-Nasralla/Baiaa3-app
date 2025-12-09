import axios from "axios";

// Replace with your local machine IP
const API_URL = "http://192.168.1.9:5271/api";

export const api = axios.create({
  baseURL: API_URL,
});

import { API_ENDPOINT } from "@/utils/config";
import axios from "axios";

export const api = axios.create({
  // baseURL: "http://192.168.1.112:3333",
  baseURL: API_ENDPOINT,
  timeout: 700,
  headers: {
    "Content-Type": "application/json",
  },
});

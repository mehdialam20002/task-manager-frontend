import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-backend-t2lg.onrender.com",
  withCredentials: false, // JWT header based auth
});

import { getToken } from "./auth";

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
//
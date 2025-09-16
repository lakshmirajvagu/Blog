import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/api", // change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to attach Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("idToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

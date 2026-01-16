import axios from "axios";

// Create a pre-configured Axios instance
export const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // if you add auth later
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // handle global errors here
    return Promise.reject(error);
  }
);

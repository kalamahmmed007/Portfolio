// Token utils
export const setToken = (token) => localStorage.setItem("admin_token", token);
export const getToken = () => localStorage.getItem("admin_token");
export const removeToken = () => localStorage.removeItem("admin_token");
// src/services/api.js
import axios from "axios";

// Base URL of your backend
// Change this to your backend URL or localhost
const BASE_URL = "http://localhost:5000/api";

// Create axios instance
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: Add a request interceptor to attach token if needed
api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem("adminUser");
        if (user) {
            const token = JSON.parse(user).token; // assuming your user object has a JWT token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // you can handle 401 globally here if needed
        return Promise.reject(error);
    }
);


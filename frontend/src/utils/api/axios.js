// src/utils/axios.js
import axios from "axios";

// ==============================
//  CONFIG INSTANSI AXIOS
// ==============================
const api = axios.create({
  baseURL: "http://localhost:1210/", // Base URL backend kamu
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
//  REQUEST INTERCEPTOR
// ==============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==============================
//  RESPONSE INTERCEPTOR
// ==============================
api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Jika token expired atau tidak valid
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;

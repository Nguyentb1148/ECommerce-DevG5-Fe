import axios from "axios";

const api = axios.create({
  baseURL: "https://project-2-back-end.onrender.com/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("------------------->", token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

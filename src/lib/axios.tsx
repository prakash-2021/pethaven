import axios from "axios";

const token = localStorage.getItem("token") || "";

const instance = axios.create({
  baseURL: "https://pethaven-backend.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
  headers: { Authorization: token },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || "";
    if (config.headers && token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

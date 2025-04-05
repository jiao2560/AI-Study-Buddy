import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // 改成你的后端 API 根路径
});

// 自动在请求里加上 token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

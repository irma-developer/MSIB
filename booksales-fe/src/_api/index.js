import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // ganti sesuai alamat API kamu
});

// inject Authorization otomatis kalau ada token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // simpan token di sini
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

// api.jsx
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
  },
});

// Interceptor para agregar el token a todas las peticiones
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
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/file/upload/", formData,);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
export default api;

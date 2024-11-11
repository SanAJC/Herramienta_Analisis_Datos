import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log para debug
    console.log("Request Config:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.data);
    return response;
  },
  (error) => {
    console.error("Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Ha ocurrido un error";

    throw new Error(errorMessage);
  }
);

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const fileExtension = file.name.split(".").pop().toLowerCase();
  formData.append("file_type", fileExtension);

  // Log para debug
  console.log("Uploading file:", {
    fileName: file.name,
    fileType: fileExtension,
    fileSize: file.size,
  });

  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Verificar que el token existe

    const response = await api.post("/file/upload/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // No establecer Content-Type, dejarlo automático para FormData
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
};

// Funciones para el historial de archivos
export const obtenerHistorial = async () => {
  try {
    const response = await api.get("/file/record/");
    console.log("Historial obtenido:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener historial:", error);
    throw error;
  }
};

export const obtenerDetalleArchivo = async (id) => {
  try {
    const response = await api.get(`/file/${id}/`);
    console.log("Detalle de archivo obtenido:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalle del archivo:", error);
    throw error;
  }
};

// Función para procesar datos del archivo
export const procesarArchivo = async (id) => {
  try {
    const response = await api.post(`/file/${id}/process/`);
    console.log("Archivo procesado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al procesar archivo:", error);
    throw error;
  }
};

// Función para eliminar archivo
export const eliminarArchivo = async (id) => {
  try {
    const response = await api.delete(`/file/${id}/`);
    console.log("Archivo eliminado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    throw error;
  }
};

export default api;

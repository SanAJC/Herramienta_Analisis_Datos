// // // api.jsx
// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: "http://localhost:8000/api",
// // });

// // // Interceptor para agregar el token a todas las peticiones
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api",
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// // Interceptor para agregar el token a todas las peticiones
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Interceptor para manejar errores de respuesta
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // Error de autenticación
//       if (error.response.status === 401) {
//         localStorage.removeItem('token'); // Eliminar token inválido
//         // Aquí podrías redirigir al login si lo deseas
//         window.location.href = '/login';
//       }
//       // Mostrar mensaje de error específico
//       const errorMessage = error.response.data?.message || 'Ha ocurrido un error';
//       console.error('Error API:', errorMessage);
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

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

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error de autenticación
      if (error.response.status === 401) {
        localStorage.removeItem("token"); // Eliminar token inválido
        // Aquí podrías redirigir al login si lo deseas
        window.location.href = "/login";
      }
      // Mostrar mensaje de error específico
      const errorMessage =
        error.response.data?.message || "Ha ocurrido un error";
      console.error("Error API:", errorMessage);
    }
    return Promise.reject(error);
  }
);

// Función para cargar archivo
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  // Determinar el tipo de archivo
  const fileExtension = file.name.split(".").pop().toLowerCase();
  formData.append("file_type", fileExtension);

  try {
    const response = await api.post("/file/", formData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al cargar el archivo"
    );
  }
};

// Función para cargar archivo desde URL
export const uploadFileFromUrl = async (url) => {
  try {
    const response = await api.post("/file/", {
      url: url,
      file_type: url.split(".").pop().toLowerCase(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al cargar el archivo desde URL"
    );
  }
};

// Función para listar archivos
export const listFiles = async () => {
  try {
    const response = await api.get("/file/");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener la lista de archivos"
    );
  }
};

// Función existente para extraer datos
export const extractData = async (fileId) => {
  try {
    const response = await api.get(`/file/${fileId}/extract_file_data/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al extraer datos");
  }
};

export default api;

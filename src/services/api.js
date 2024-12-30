import axios from 'axios';

// URL base da API
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333/', // Substitua pela URL da sua API
});

// Interceptor para adicionar o token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    // Pegue o token do localStorage ou de outro método
    const token = localStorage.getItem('token'); // Ajuste conforme o armazenamento do seu token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export default axiosInstance;

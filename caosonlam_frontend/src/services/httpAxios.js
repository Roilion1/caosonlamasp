import axios from "axios";
import AuthService from "./AuthService"; 

const httpAxios = axios.create({
  baseURL: 'https://localhost:7033/api', 
});

// Interceptor cho request
httpAxios.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken(); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
httpAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token không hợp lệ hoặc đã hết hạn, vui lòng đăng nhập lại.");
      AuthService.logout(); 
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default httpAxios;

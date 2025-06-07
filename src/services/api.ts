import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cliqagenda-api-production.up.railway.app',
  withCredentials: true, 
});

console.log('API baseURL:', process.env.NEXT_PUBLIC_API_BASE_URL);


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event('unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;

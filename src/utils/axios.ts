import axios from "axios";


console.log();

const instance = axios.create({
  // baseURL: 'http://localhost:8879/api',
  baseURL: `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_PORT}/api/`,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
  return config;
},
  error => {
    console.log("ERRor", error)
    return Promise.reject(error);
  }
);

export default instance
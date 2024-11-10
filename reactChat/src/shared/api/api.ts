import axios from 'axios';

const $api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

export { $api };

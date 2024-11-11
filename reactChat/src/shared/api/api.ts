import { AppDispatch } from '@/app/store';
import { reset } from '@/entities/User';
import { IAuthResponse } from '@/shared/api/auth';
import axios from 'axios';

const $api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

export const setupRefreshInterceptor = (dispatch: AppDispatch) => {
  const handleRefreshError = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    dispatch(reset());
  };

  $api.interceptors.response.use(
    (config) => config,
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem('refresh');

      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry &&
        refreshToken
      ) {
        originalRequest._isRetry = true;

        try {
          const response = await axios.post<IAuthResponse>(
            `${import.meta.env.VITE_PUBLIC_API}auth/refresh/`,
            { refresh: refreshToken }
          );
          localStorage.setItem('token', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);

          return $api.request(originalRequest);
        } catch {
          handleRefreshError();
        }
      }

      handleRefreshError();

      return Promise.reject(error);
    }
  );
};

export { $api };

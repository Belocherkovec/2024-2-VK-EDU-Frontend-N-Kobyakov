import axios from 'axios';

import { IAuthResponse } from './types';

export const login = (
  username: string,
  password: string,
  callback?: (isAuth: boolean) => void
): void => {
  axios
    .post<IAuthResponse>(`${import.meta.env.VITE_PUBLIC_API}auth/`, {
      password,
      username
    })
    .then(({ data, status }) => {
      if (status === 200) {
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh', data.refresh);
      }

      if (callback) {
        callback(true);
      }
    })
    .catch(() => {
      if (callback) {
        callback(false);
      }
    });
};

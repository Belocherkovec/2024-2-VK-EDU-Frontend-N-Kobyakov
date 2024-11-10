import { $api } from '@/shared/api';

import { IAuthResponse } from './types';

export const login = (username: string, password: string): void => {
  $api
    .post<IAuthResponse>('auth/', {
      password,
      username
    })
    .then(({ data, status }) => {
      if (status === 200) {
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh', data.refresh);
      }
    });
};

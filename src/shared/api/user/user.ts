import axios, { AxiosResponse } from 'axios';

import { buildUrlWithQuery } from '../../utils/urlUtils';
import { $api } from '../api';
import {
  IAuthResponse,
  IGetUsersQueryParams,
  IGetUsersResponse,
  IRegistrationRequest,
  IUser
} from './types';

export const registrationRequest = (
  data: IRegistrationRequest,
  callback?: (res: AxiosResponse) => void
): void => {
  axios
    .post(`${import.meta.env.VITE_PUBLIC_API}register/`, data, {
      headers: {
        'Content-Type': data.avatar ? 'multipart/form-data' : 'application/json'
      }
    })
    .then((res) => {
      if (callback) {
        callback(res);
      }
    })
    .catch((error) => {
      if (callback) {
        callback(error);
      }
    });
};

export const loginRequest = (
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

export const getCurrentUser = (): Promise<AxiosResponse<IUser>> =>
  $api.get<IUser>('user/current/');

export const updateUser = (
  userId: string,
  data: FormData
): Promise<AxiosResponse<IUser>> => $api.patch<IUser>(`user/${userId}/`, data);

export const deleteUser = (userId: string): Promise<void> =>
  $api.delete(`user/${userId}/`);

export const getUsers = (
  pageSize?: number,
  page?: number,
  search?: string
): Promise<AxiosResponse<IGetUsersResponse>> => {
  const queryParams: IGetUsersQueryParams = {};

  if (pageSize) {
    queryParams.page_size = pageSize;
  }

  if (page) {
    queryParams.page = page;
  }

  if (search) {
    queryParams.search = search;
  }

  return $api.get<IGetUsersResponse>(buildUrlWithQuery('users/', queryParams));
};

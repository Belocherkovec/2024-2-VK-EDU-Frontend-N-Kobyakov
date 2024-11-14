import { buildUrlWithQuery } from '@/shared/utils/urlUtils';
import { AxiosResponse } from 'axios';

import { $api } from '../api';
import { IGetUserResponse, IUser } from './types';

type IGetUsersQueryParams = {
  page?: number;
  page_size?: number;
  search?: string;
};

export const getCurrentUser = (): Promise<AxiosResponse<IUser>> =>
  $api.get<IUser>('user/current/');

export const getUsers = (
  pageSize?: number,
  page?: number,
  search?: string
): Promise<AxiosResponse<IGetUserResponse>> => {
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

  return $api.get<IGetUserResponse>(buildUrlWithQuery('users/', queryParams));
};

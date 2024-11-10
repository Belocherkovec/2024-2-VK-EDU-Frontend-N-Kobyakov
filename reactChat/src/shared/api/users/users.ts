import { $api } from '@/shared/api';
import { IGetUserResponse } from '@/shared/api/users/types';
import { buildUrlWithQuery } from '@/shared/utils/urlUtils';
import { AxiosResponse } from 'axios';

type IGetUsersQuery = {
  page?: number;
  page_size?: number;
  search?: string;
};

export const getUsers = (
  pageSize?: number,
  page?: number,
  search?: string
): Promise<AxiosResponse<IGetUserResponse>> => {
  const queryParams: IGetUsersQuery = {};

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

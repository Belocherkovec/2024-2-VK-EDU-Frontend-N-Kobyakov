import { $api } from '@/shared/api';
import { IGetUserResponse } from '@/shared/api/users/types';
import { buildUrlWithQuery } from '@/shared/utils/urlUtils';

type IGetChatsQueryParams = {
  page?: number;
  page_size?: number;
  search?: string;
};

export const getChats = (pageSize?: number, page?: number, search?: string) => {
  const queryParams: IGetChatsQueryParams = {};

  if (pageSize) {
    queryParams.page_size = pageSize;
  }

  if (page) {
    queryParams.page = page;
  }

  if (search) {
    queryParams.search = search;
  }

  return $api.get<IGetUserResponse>(buildUrlWithQuery('chats/', queryParams));
};

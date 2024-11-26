import { AxiosResponse } from 'axios';

import { buildUrlWithQuery } from '../../utils';
import { $api } from '../api';
import { ICreateChatResponse, IGetChatsResponse } from './types';

type IGetChatsQueryParams = {
  page?: number;
  page_size?: number;
  search?: string;
};

export const getChats = (
  pageSize?: number,
  page?: number,
  search?: string
): Promise<AxiosResponse<IGetChatsResponse>> => {
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

  return $api.get<IGetChatsResponse>(buildUrlWithQuery('chats/', queryParams));
};

export const createPrivateChat = (
  interlocutorId: string
): Promise<AxiosResponse<ICreateChatResponse>> =>
  $api.post<ICreateChatResponse>('chats/', {
    is_private: true,
    members: [interlocutorId]
  });

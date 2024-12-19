import { AxiosResponse } from 'axios';

import { buildUrlWithQuery } from '../../utils';
import { $api } from '../api';
import { IChat, IGetChatsResponse } from './types';

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

export const getChat = (uuid: string) => $api.get<IChat>(`chat/${uuid}/`);

export const createPrivateChat = (
  interlocutorId: string
): Promise<AxiosResponse<IChat>> =>
  $api.post<IChat>('chats/?fallback=on', {
    is_private: true,
    members: [interlocutorId]
  });

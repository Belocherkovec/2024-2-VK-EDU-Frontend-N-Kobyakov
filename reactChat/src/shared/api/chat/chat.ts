import { $api } from '@/shared/api';
import {
  ICreateChatResponse,
  IGetChatsResponse
} from '@/shared/api/chat/types';
import { buildUrlWithQuery } from '@/shared/utils/urlUtils';
import { AxiosResponse } from 'axios';

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

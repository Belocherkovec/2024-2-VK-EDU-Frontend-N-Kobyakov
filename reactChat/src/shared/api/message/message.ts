import { AxiosResponse } from 'axios';

import { buildUrlWithQuery } from '../../utils';
import { $api } from '../api';
import { ICreateMessageRequest, IGetMessagesResponse, IMessage } from './types';

type IGetMessageQueryParams = {
  chat: string;
  page?: number;
  page_size?: number;
  search?: string;
};

export const getMessages = (
  chat: string,
  page?: number,
  pageSize?: number,
  search?: string
): Promise<AxiosResponse<IGetMessagesResponse>> => {
  const queryParams: IGetMessageQueryParams = {
    chat
  };

  if (pageSize) {
    queryParams.page_size = pageSize;
  }

  if (page) {
    queryParams.page = page;
  }

  if (search) {
    queryParams.search = search;
  }

  return $api.get<IGetMessagesResponse>(
    buildUrlWithQuery('messages/', queryParams)
  );
};

export const createMessage = (
  data: ICreateMessageRequest
): Promise<AxiosResponse<IMessage>> =>
  $api.post<IMessage>('messages/', data, {
    headers: {
      'Content-Type':
        data.files?.length || data.voice
          ? 'multipart/form-data'
          : 'application/json'
    }
  });

export const postReadMessage = (
  msgId: string
): Promise<AxiosResponse<IMessage>> =>
  $api.post<IMessage>(`message/${msgId}/read/`, {});

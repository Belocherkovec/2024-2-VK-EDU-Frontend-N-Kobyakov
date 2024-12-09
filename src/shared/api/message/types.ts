import { IUser } from '../user';

export interface ICreateMessageRequest {
  chat: string;
  files?: File[];
  text?: string;
  voice?: File;
}

export interface IGetMessagesResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: IMessage[];
}

export interface IMessage {
  chat: string;
  created_at: string;
  files: { item: string }[];
  id: string;
  sender: IUser;
  text: null | string;
  updated_at: null | string;
  voice: null | string;
  was_read_by: IUser[];
}

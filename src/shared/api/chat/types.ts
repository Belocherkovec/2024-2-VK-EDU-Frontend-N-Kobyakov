import { IMessage } from '../message';
import { IUser } from '../user';

export interface IGetChatsResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: IChat[];
}

export interface IChat {
  avatar: null | string;
  created_at: string;
  creator: IUser;
  id: string;
  is_private: boolean;
  last_message: IMessage;
  members: IUser[];
  title: string;
  updated_at: string;
  unread_messages_count: number;
}

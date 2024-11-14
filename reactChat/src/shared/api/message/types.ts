import { IUser } from '../user';

export interface IMessage {
  chat: string;
  created_at: string;
  files: File[];
  id: string;
  sender: IUser;
  text: null | string;
  updated_at: string;
  voice: null | string;
}

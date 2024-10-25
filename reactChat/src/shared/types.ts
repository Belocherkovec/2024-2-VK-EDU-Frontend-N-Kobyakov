import { MessageStatuses } from '@/shared/consts/statuses';

export interface IReactChat {
  avatar: string;
  messages: Array<IReactChatMessage>;
  userId: number;
  userName: string;
}

export interface IReactChatMessage {
  author: string;
  sendDate: string;
  status: MessageStatuses;
  text: string;
}

export interface IStorage {
  chat: Record<string, IReactChat>;
  filter: string;
  isInverted: boolean;
}

export type ChatType = Record<string, IReactChat>;

import { Store } from '@/app/store';
import { USERNAME } from '@/shared/consts';
import { MessageStatuses } from '@/shared/consts/statuses';
import { IReactChatMessage } from '@/shared/types';
import { useContext } from 'react';

export const useChat = (userId: number) => {
  const {
    store: {
      chat: {
        [userId]: { avatar, draftMessage, fullName, messages }
      }
    }
  } = useContext(Store);

  const lastMessage = messages.at(-1);

  const unreadMessage: number = messages.filter(
    (msg: IReactChatMessage) =>
      msg.author !== USERNAME && msg.status === MessageStatuses.STATUS_SEND
  ).length;

  return {
    avatar,
    draftMessage,
    fullName,
    lastMessage,
    unreadMessage
  };
};

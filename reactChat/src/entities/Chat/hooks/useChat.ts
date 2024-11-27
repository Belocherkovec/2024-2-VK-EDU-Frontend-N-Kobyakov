import { RootState } from '@/app';
import { useSelector } from 'react-redux';

import { selectCurrentChat } from '../model';
import { selectUserInfo } from '@/entities/User';
import { getFormattedDate, MessageStatuses } from '@/shared';

export const useChat = (userId: string) => {
  const selectCurrentUserInfo = useSelector(selectUserInfo);
  const chatData = useSelector((state: RootState) =>
    selectCurrentChat(state, userId)
  );

  const { avatar, title, is_private: isPrivate, last_message } = chatData;

  const lastMessageText = last_message.text;
  const lastMessageTimestamp = last_message.created_at
    ? getFormattedDate(new Date(last_message.created_at))
    : undefined;
  const isUserMessage = selectCurrentUserInfo.id === userId;
  const lastMessageStatus = last_message.was_read_by.length
    ? MessageStatuses.STATUS_READ
    : MessageStatuses.STATUS_SEND;

  return {
    avatar,
    title,
    isPrivate,
    lastMessageText,
    isUserMessage,
    lastMessageTimestamp,
    lastMessageStatus
  };
};

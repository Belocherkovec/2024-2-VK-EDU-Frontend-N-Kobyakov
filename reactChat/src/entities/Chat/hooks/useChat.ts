import { RootState } from '@/app';
import { useSelector } from 'react-redux';

import { selectCurrentChat } from '../model';
import { selectUserInfo } from '@/entities/User';
import { getFormattedDate, MessageStatuses } from '@/shared';

export const useChat = (userId: string) => {
  const currentUserInfo = useSelector(selectUserInfo);
  const chatData = useSelector((state: RootState) =>
    selectCurrentChat(state, userId)
  );

  const {
    avatar,
    title,
    is_private: isPrivate,
    last_message,
    members
  } = chatData;

  const lastMessage = last_message || {
    text: '',
    created_at: null,
    was_read_by: []
  };

  const lastMessageText = lastMessage.text;
  const lastMessageTimestamp = lastMessage.created_at
    ? getFormattedDate(new Date(lastMessage.created_at))
    : undefined;
  const isUserMessage = currentUserInfo.id === userId;
  const isOnline = members.filter(
    (member) => member.id !== currentUserInfo.id
  )[0]?.is_online;
  const lastMessageStatus = lastMessage.was_read_by.length
    ? MessageStatuses.STATUS_READ
    : MessageStatuses.STATUS_SEND;

  return {
    avatar,
    title,
    isOnline,
    isPrivate,
    lastMessageText,
    isUserMessage,
    lastMessageTimestamp,
    lastMessageStatus
  };
};

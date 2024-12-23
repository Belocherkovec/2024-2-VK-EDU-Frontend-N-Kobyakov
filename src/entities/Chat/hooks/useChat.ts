import { RootState } from '@/app';
import { useSelector } from 'react-redux';

import { selectCurrentChat } from '../model';
import { selectUserInfo } from '@/entities/User';
import { getFormattedDate, IMessage, MessageStatuses, TEXTS } from '@/shared';

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
    members,
    unread_messages_count: unreadMessagesCount
  } = chatData;

  const lastMessage: IMessage = last_message || {
    created_at: chatData.created_at,
    files: [],
    sender: {},
    text: TEXTS.empty,
    updated_at: null,
    voice: null,
    was_read_by: []
  };

  const lastMessageText = lastMessage.text;
  const lastMessageSender = `${lastMessage.sender.first_name} ${lastMessage.sender.last_name}: `;
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
    isUserMessage,
    lastMessageText,
    lastMessageSender,
    lastMessageStatus,
    lastMessageTimestamp,
    unreadMessagesCount
  };
};

import { AppDispatch } from '@/app';
import { fetchChats, selectChatMap } from '@/entities/Chat';
import {
  fetchMessages,
  resetMessages,
  selectMessagesIdx,
  selectMessagesMap
} from '@/entities/Message';
import { fetchUsers, selectUserInfo, selectUsersMap } from '@/entities/User';
import {
  createMessage,
  getFormattedDate,
  ICreateMessageRequest,
  postReadMessage,
  TEXTS,
  useIntersectionObserver
} from '@/shared';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useDialogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const containersRef = useRef<HTMLLIElement[]>([]);
  const params = useParams<{ chatId: string }>();
  const { chatId = TEXTS.empty } = params;
  const chats = useSelector(selectChatMap);
  const users = useSelector(selectUsersMap);
  const messagesIdx = useSelector(selectMessagesIdx);
  const messagesMap = useSelector(selectMessagesMap);
  const currentUserInfo = useSelector(selectUserInfo);

  const {
    avatar,
    title,
    members,
    is_private: isPrivate
  } = chats[chatId] || {
    avatar: null,
    title: TEXTS.empty,
    members: []
  };
  const lastOnline = isPrivate
    ? getFormattedDate(
        new Date(
          members.filter(
            (member) => member.id !== currentUserInfo.id
          )[0].last_online_at
        )
      )
    : undefined;
  const isOnline = members.filter(
    (member) => member.id !== currentUserInfo.id
  )[0]?.is_online;

  useEffect(() => {
    document.body.style.backgroundColor = '#F0F1F5';

    if (chatId) {
      dispatch(fetchMessages(chatId));
    }

    if (!Object.keys(chats).length) {
      dispatch(fetchChats());
    }

    if (!Object.keys(users).length) {
      dispatch(fetchUsers());
    }

    return () => {
      document.body.style.backgroundColor = TEXTS.empty;
      dispatch(resetMessages());
    };
  }, []);

  const isUserMessage = (msgId: string) => {
    let result = false;

    if (
      messagesMap[msgId].sender &&
      currentUserInfo &&
      currentUserInfo.id &&
      messagesMap[msgId].sender.id !== currentUserInfo.id
    ) {
      result = true;
    }

    return result;
  };

  if (containersRef.current.length !== messagesIdx.length) {
    containersRef.current = [];
  }

  const handleSetRef = (element: HTMLLIElement | null) => {
    if (!element) {
      return;
    }

    containersRef.current.push(element);
  };

  const callbackFunction: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const msgId = (entry.target as HTMLElement).dataset.index;

        if (
          msgId &&
          isUserMessage(msgId) &&
          !messagesMap[msgId].was_read_by.length
        ) {
          postReadMessage(msgId);
        }
      }
    });
  };

  useIntersectionObserver(containersRef.current, callbackFunction);

  const handleAreaSend = (value: string) => {
    if (!value) {
      return;
    }

    const responseData: ICreateMessageRequest = {
      chat: chatId,
      text: value
    };

    createMessage(responseData);
  };

  return {
    avatar,
    lastOnline,
    isOnline,
    chatId,
    handleAreaSend,
    handleSetRef,
    isUserMessage,
    messagesIdx,
    messagesMap,
    title
  };
};

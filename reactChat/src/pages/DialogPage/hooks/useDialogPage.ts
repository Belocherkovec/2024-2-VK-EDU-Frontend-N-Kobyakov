import { AppDispatch } from '@/app/store';
import { fetchChats, selectChatMap } from '@/entities/Chat/model';
import {
  selectMessagesIdx,
  selectMessagesMap
} from '@/entities/Message/Message/model/Message.slice';
import {
  fetchMessages,
  readMessage,
  sendMessage
} from '@/entities/Message/Message/model/Message.thunk';
import { selectUserInfo, selectUsersMap } from '@/entities/User/model';
import { fetchUsers } from '@/entities/User/model/User.thunk';
import { ICreateMessageRequest } from '@/shared/api/message/types';
import { TEXTS } from '@/shared/consts/texts';
import { useIntersectionObserver } from '@/shared/hooks';
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
  const user = useSelector(selectUserInfo);

  const { avatar, title } = chats[chatId] || {
    avatar: null,
    title: TEXTS.empty
  };

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
    };
  }, []);

  const isUserMessage = (msgId: string) => {
    let result = false;

    if (
      messagesMap[msgId].sender &&
      user &&
      user.id &&
      messagesMap[msgId].sender.id !== user.id
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
          dispatch(readMessage(msgId));
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

    dispatch(sendMessage(responseData));
  };

  return {
    avatar,
    chatId,
    handleAreaSend,
    handleSetRef,
    isUserMessage,
    messagesIdx,
    messagesMap,
    title
  };
};

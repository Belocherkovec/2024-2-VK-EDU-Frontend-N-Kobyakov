import { AppDispatch } from '@/app';
import { fetchChats, selectChatMap } from '@/entities/Chat';
import {
  fetchMessages,
  resetMessages,
  selectMessagesIdx,
  selectMessagesIsLoading,
  selectMessagesMap
} from '@/entities/Message';
import { fetchUsers, selectUserInfo, selectUsersMap } from '@/entities/User';
import {
  createMessage,
  getFormattedDate,
  postReadMessage,
  TEXTS,
  timeFormatter,
  useIntersectionObserver
} from '@/shared';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useDialogPage = () => {
  const containersRef = useRef<HTMLLIElement[]>([]);
  useIntersectionObserver(containersRef.current, callbackFunction);

  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ chatId: string }>();
  const { chatId = TEXTS.empty } = params;
  const chats = useSelector(selectChatMap);
  const users = useSelector(selectUsersMap);
  const isMessagesLoading = useSelector(selectMessagesIsLoading);
  const messagesIdx = useSelector(selectMessagesIdx);
  const messagesMap = useSelector(selectMessagesMap);
  const currentUserInfo = useSelector(selectUserInfo);
  const lastMessageDate = useRef<Date | null>(null);

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
          members.filter((member) => member.id !== currentUserInfo.id)[0]
            ?.last_online_at || new Date(0)
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

  useEffect(() => {
    containersRef.current.at(-1)?.scrollIntoView();
  }, [isMessagesLoading]);

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

  function callbackFunction(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const msgId = (entry.target as HTMLElement).dataset.index;

        if (
          msgId &&
          isUserMessage(msgId) &&
          !messagesMap[msgId].was_read_by.find(
            (user) => user.id === currentUserInfo.id
          )
        ) {
          postReadMessage(msgId);
        }
      }
    });
  }

  const handleAreaSend = (value?: string, files?: File[], voice?: Blob) => {
    const data = {
      chat: chatId,
      text: value
    };
    const formData = new FormData();
    formData.append('chat', chatId);

    if (voice) {
      formData.append('voice', voice, 'voice.ogg');
    } else {
      if (value) {
        formData.append('text', value);
      }

      if (files && files.length) {
        files.forEach((file) => {
          formData.append('files', file);
        });
      }
    }

    const reader = files?.length || voice ? formData : data;

    createMessage(reader).then(() => {
      containersRef.current
        .at(-1)
        ?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  };

  const getMessageTimeStamp = (msgId: string) => {
    if (
      !msgId ||
      !messagesMap ||
      !messagesMap[msgId] ||
      !messagesMap[msgId].created_at
    ) {
      return TEXTS.empty;
    }

    lastMessageDate.current = new Date(messagesMap[msgId].created_at);
    return timeFormatter.format(new Date(messagesMap[msgId].created_at));
  };

  const isDateDiff = (msgId: string): boolean => {
    if (
      !msgId ||
      !messagesMap ||
      !messagesMap[msgId].created_at ||
      !lastMessageDate.current
    ) {
      return false;
    }

    const date1 = lastMessageDate.current;
    const date2 = new Date(messagesMap[msgId].created_at);

    return (
      date1.getDate() !== date2.getDate() ||
      date1.getMonth() !== date2.getMonth() ||
      date1.getFullYear() !== date2.getFullYear()
    );
  };

  return {
    title,
    chatId,
    avatar,
    isOnline,
    isPrivate,
    lastOnline,
    messagesIdx,
    messagesMap,
    handleSetRef,
    isUserMessage,
    handleAreaSend,
    isMessagesLoading,
    isDateDiff,
    getMessageTimeStamp
  };
};

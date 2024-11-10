import { Store } from '@/app/oldStore';
import { USERNAME } from '@/shared/consts';
import { MessageStatuses } from '@/shared/consts/statuses';
import { TEXTS } from '@/shared/consts/texts';
import { useIntersectionObserver } from '@/shared/hooks';
import authorImg from '@/shared/img/Nikolai_avatar.jpg';
import { IReactChat } from '@/shared/types';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

export const useDialogPage = () => {
  const {
    handleStoreUpdate,
    store: { chat, isInverted }
  } = useContext(Store);

  const containersRef = useRef<HTMLLIElement[]>([]);
  const params = useParams<{ chatId: string }>();
  const { chatId = TEXTS.empty } = params;

  const userChatData: IReactChat = chat[chatId];
  const { messages } = userChatData;
  const fullName = isInverted ? USERNAME : userChatData.fullName;
  const author = isInverted ? userChatData.fullName : USERNAME;

  useEffect(() => {
    document.body.style.backgroundColor = '#F0F1F5';

    return () => {
      document.body.style.backgroundColor = TEXTS.empty;
    };
  }, []);

  if (containersRef.current.length !== messages.length) {
    containersRef.current = [];
  }

  const isReadMessage = (msgId: number): boolean =>
    messages[msgId].status === MessageStatuses.STATUS_READ;

  const isAuthorMessage = (msgId: number): boolean =>
    messages[msgId].author === author;

  const handleSetRef = (element: HTMLLIElement | null, idx: number) => {
    if (!element || isAuthorMessage(idx) || isReadMessage(idx)) {
      return;
    }

    containersRef.current.push(element);
  };

  const callbackFunction: IntersectionObserverCallback = (entries) => {
    const updateMessagesIdx: number[] = [];

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const msgId = (entry.target as HTMLElement).dataset.index;

        if (msgId) {
          updateMessagesIdx.push(+msgId);
        }
      }
    });

    handleStoreUpdate(
      `chat.${chatId}.messages`,
      messages.map((msg, id) => {
        if (updateMessagesIdx.includes(id)) {
          return { ...msg, status: MessageStatuses.STATUS_READ };
        }

        return msg;
      })
    );
  };

  useIntersectionObserver(containersRef.current, callbackFunction);

  const avatar = useMemo(
    () => (isInverted ? authorImg : userChatData.avatar),
    [isInverted, userChatData.avatar]
  );

  const getIsUserMessageValue = (author: string): boolean => {
    let result = false;

    if (author !== USERNAME) {
      result = true;
    }

    if (isInverted) {
      result = !result;
    }

    return result;
  };

  const handleAreaSend = (value: string) => {
    if (!value) {
      return;
    }

    const newMessage = {
      author,
      sendDate: new Date(),
      status: MessageStatuses.STATUS_SEND,
      text: value.trim()
    };
    handleStoreUpdate(`chat.${chatId}`, {
      ...chat[chatId],
      draftMessage: TEXTS.empty,
      messages: [...messages, newMessage]
    });
  };

  return {
    avatar,
    chatId,
    fullName,
    getIsUserMessageValue,
    handleAreaSend,
    handleSetRef,
    messages
  };
};

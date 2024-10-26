import { Store } from '@/app/store';
import { USERNAME } from '@/shared/consts';
import { MessageStatuses } from '@/shared/consts/statuses.ts';
import { TEXTS } from '@/shared/consts/texts.ts';
import authorImg from '@/shared/img/Nikolai_avatar.jpg';
import { IReactChat } from '@/shared/types.ts';
import { useContext, useEffect, useMemo } from 'react';

export const useDialog = () => {
  const {
    handleStoreUpdate,
    store: { chat, isInverted }
  } = useContext(Store);

  const { hash } = window.location;
  const params = new URLSearchParams(hash.slice(hash.indexOf('?')));
  const userId = params.get('id') as string;

  const userChatData: IReactChat = chat[userId];
  const { messages } = userChatData;
  const userName = isInverted ? USERNAME : userChatData.userName;
  const author = isInverted ? userChatData.userName : USERNAME;

  useEffect(() => {
    document.body.style.backgroundColor = '#F0F1F5';

    return () => {
      document.body.style.backgroundColor = TEXTS.empty;
    };
  }, []);

  useEffect(() => {
    handleStoreUpdate(
      `chat.${userId}.messages`,
      messages.map((msg) => {
        if (
          msg.author !== USERNAME ||
          (msg.author === USERNAME && isInverted)
        ) {
          return { ...msg, status: MessageStatuses.STATUS_READ };
        }

        return msg;
      })
    );
  }, [isInverted]);

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
    const newMessage = {
      author,
      sendDate: new Date(),
      status: MessageStatuses.STATUS_SEND,
      text: value.trim()
    };
    handleStoreUpdate(`chat.${userId}.messages`, [...messages, newMessage]);
  };

  return {
    avatar,
    getIsUserMessageValue,
    handleAreaSend,
    messages,
    userName
  };
};

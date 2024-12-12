import { Centrifuge, Subscription } from 'centrifuge';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, deleteMessage, updateMessage } from '@/entities/Message';
import { useNotification } from '@/entities/Notification';
import { selectChatMap } from '@/entities/Chat';
import {
  fetchCurrentUser,
  selectUserInfo,
  setUserUnauthorized
} from '@/entities/User';
import {
  CentrifugoEventTypes,
  ICentrifugoEvent,
  initAndStartCentrifugo,
  sendNotification,
  setupRefreshInterceptor,
  useAuthRedirect
} from '@/shared';

import { AppDispatch } from '../store';

export const useApp = () => {
  useAuthRedirect();
  useNotification();

  const dispatch = useDispatch<AppDispatch>();

  const currentUserInfo = useSelector(selectUserInfo);
  const chats = useSelector(selectChatMap);

  const [centrifugeObj, setCentrifugeObj] = useState<{
    centrifuge: Centrifuge;
    subscription: Subscription;
  } | null>(null);

  useEffect(() => {
    setupRefreshInterceptor(dispatch);

    if (!localStorage.getItem('token')) {
      dispatch(setUserUnauthorized());
    }

    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    if (currentUserInfo.id) {
      const centrifugeInstance = initAndStartCentrifugo(currentUserInfo.id);
      centrifugeInstance.subscription.on('publication', (ctx) =>
        handlePublicationEvent(ctx.data)
      );
      setCentrifugeObj(centrifugeInstance);
    }

    return () => {
      if (centrifugeObj) {
        centrifugeObj.centrifuge.disconnect();
        centrifugeObj.subscription.removeAllListeners();
        centrifugeObj.subscription.unsubscribe();
      }
    };
  }, [currentUserInfo]);

  const handleSetNotification = (data: ICentrifugoEvent) => {
    const chatId = data.message.chat;
    const targetChat = chats[chatId];

    if (targetChat) {
      sendNotification(targetChat.title);
    }
  };

  const handlePublicationEvent = (data: ICentrifugoEvent) => {
    const currentPage = window.location.hash.split('/');

    if (
      (data.message.sender.id !== currentUserInfo.id &&
        currentPage.includes('dialog') &&
        currentPage.at(-1) !== data.message.chat) ||
      (!currentPage.includes('dialog') &&
        data.event === CentrifugoEventTypes.CREATE)
    ) {
      handleSetNotification(data);
    }

    if (
      currentPage.includes('dialog') &&
      currentPage.at(-1) === data.message.chat
    ) {
      switch (data.event) {
        case CentrifugoEventTypes.CREATE:
          dispatch(addMessage(data.message));
          break;
        case CentrifugoEventTypes.DELETE:
          dispatch(deleteMessage(data.message));
          break;
        case CentrifugoEventTypes.READ:
          dispatch(updateMessage(data.message));
          break;
        case CentrifugoEventTypes.UPDATE:
          dispatch(updateMessage(data.message));
          break;
      }
    }
  };
};

import { Centrifuge, Subscription } from 'centrifuge';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CentrifugoEventTypes,
  ICentrifugoEvent,
  ICentrifugoResponse
} from './types';
import { selectUserInfo } from '@/entities/User';
import { addMessage, deleteMessage, updateMessage } from '@/entities/Message';
import { getChat, sendNotification } from '@/shared';
import { replaceChat, selectChatMap } from '@/entities/Chat';
import { AppDispatch } from '@/app';

import { $api } from '../api';

export const useCentrifugo = () => {
  const currentUserInfo = useSelector(selectUserInfo);
  const chats = useSelector(selectChatMap);
  const chatsRef = useRef(chats);
  const dispatch = useDispatch<AppDispatch>();

  const [centrifuge, setCentrifuge] = useState<Centrifuge | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    chatsRef.current = chats;
  }, [chats]);

  useEffect(() => {
    if (currentUserInfo.id && !centrifuge && !subscription) {
      createCentrifugo(currentUserInfo.id);
    }
    return () => {
      if (centrifuge) {
        centrifuge.disconnect();
        setCentrifuge(null);
      }
      if (subscription) {
        subscription.removeAllListeners();
        subscription.unsubscribe();
        setSubscription(null);
      }
    };
  }, [currentUserInfo, centrifuge, subscription]);

  const handleSetNotification = (data: ICentrifugoEvent) => {
    const chatId = data.message.chat;
    const targetChat = chatsRef.current[chatId];

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
        data.event === CentrifugoEventTypes.CREATE &&
        data.message.sender.id !== currentUserInfo.id)
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

    getChat(data.message.chat).then((res) => {
      dispatch(replaceChat(res.data));
    });
  };

  const createCentrifugo = (channel: string) => {
    if (centrifuge) {
      return;
    }

    const centrifugoInstance = new Centrifuge(
      'wss://vkedu-fullstack-div2.ru/connection/websocket/',
      {
        debug: false,
        getToken: async (ctx) => {
          const {
            data: { token }
          } = await $api.post<ICentrifugoResponse>('centrifugo/connect/', {
            ctx
          });

          return token;
        }
      }
    );

    centrifugoInstance.connect();
    setCentrifuge(centrifugoInstance);

    const subscriptionInstance = centrifugoInstance.newSubscription(channel, {
      getToken: async (ctx) => {
        try {
          const {
            data: { token }
          } = await $api.post<ICentrifugoResponse>('centrifugo/subscribe/', {
            ctx
          });

          return token;
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error during token request:', error.message);
          } else {
            console.error('Unknown error during token request');
          }

          throw error;
        }
      }
    });

    subscriptionInstance.subscribe();
    subscriptionInstance.on('publication', (ctx) =>
      handlePublicationEvent(ctx.data)
    );

    setSubscription(subscriptionInstance);
  };
};

import { Centrifuge, Subscription } from 'centrifuge';

import { $api } from '../api';
import { ICentrifugoEvent, ICentrifugoResponse } from './types';

let centrifugoInstance: Centrifuge;
let subscriptionInstance: Subscription;

const createCentrifugoInstance = () => {
  if (centrifugoInstance) {
    return centrifugoInstance;
  }

  centrifugoInstance = new Centrifuge(
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
  return centrifugoInstance;
};

const createCentrifugoSubscription = (channel: string) => {
  if (subscriptionInstance) {
    return subscriptionInstance;
  }

  subscriptionInstance = centrifugoInstance.newSubscription(channel, {
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
  return subscriptionInstance;
};

export const initAndStartCentrifugo = (
  userId: string,
  callback: (data: ICentrifugoEvent) => void
) => {
  const centrifuge = createCentrifugoInstance();
  const subscription = createCentrifugoSubscription(userId);

  subscription.on('publication', (ctx) => {
    callback(ctx.data);
  });

  return { centrifuge, subscription };
};

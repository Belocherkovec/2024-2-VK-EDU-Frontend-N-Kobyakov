import { Centrifuge } from 'centrifuge';

import { $api } from '../api';
import { ICentrifugoResponse } from './types';

export const centrifugoConnect = (userId: string) => {
  const centrifuge = new Centrifuge(
    'wss://vkedu-fullstack-div2.ru/connection/websocket/',
    {
      debug: true,
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

  const subscription = centrifuge.newSubscription(userId, {
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

  subscription.on('publication', (ctx) => {
    console.log(ctx.data);
  });

  centrifuge.connect();
  subscription.subscribe();

  return { centrifuge, subscription };
};

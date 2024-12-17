import { TEXTS } from '@/shared';

export const sendNotification = async (initials: string) => {
  const perm = await Notification.requestPermission();

  if (perm === 'granted') {
    new Notification(TEXTS.notification.title, {
      body: TEXTS.notification.body(initials)
    });
  }
};

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app';
import { useEffect } from 'react';

import { removeNotification, selectNotifications } from '../index';

export const useNotification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector(selectNotifications);

  useEffect(() => {
    const activeTimers: Record<string, NodeJS.Timeout> = {};

    notifications.forEach((notification) => {
      if (notification.key && activeTimers[notification.key]) return;

      const timer = setTimeout(() => {
        if (notification.key) {
          delete activeTimers[notification.key];
        }
        dispatch(removeNotification(notification.key as string));
      }, notification.lifeTime);

      if (notification.key) {
        activeTimers[notification.key] = timer;
      }
    });

    // Очищаем таймеры, когда уведомления удаляются
    return () => {
      Object.values(activeTimers).forEach(clearTimeout);
    };
  }, [notifications, dispatch]);

  return { notifications };
};

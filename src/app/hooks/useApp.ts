import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNotification } from '@/entities/Notification';
import { fetchCurrentUser, setUserUnauthorized } from '@/entities/User';
import {
  setupRefreshInterceptor,
  useAuthRedirect,
  useCentrifugo
} from '@/shared';

import { AppDispatch } from '../store';

export const useApp = () => {
  useAuthRedirect();
  useNotification();
  useCentrifugo();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setupRefreshInterceptor(dispatch);

    if (!localStorage.getItem('token')) {
      dispatch(setUserUnauthorized());
    }

    dispatch(fetchCurrentUser());
  }, []);
};

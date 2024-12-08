import {
  createMessage,
  deleteMessage,
  updateMessage
} from '@/entities/Message';
import {
  fetchCurrentUser,
  selectUserInfo,
  setUserUnauthorized
} from '@/entities/User';
import {
  CentrifugoEventTypes,
  ICentrifugoEvent,
  initAndStartCentrifugo,
  setupRefreshInterceptor,
  switchStatusOffline,
  switchStatusOnline,
  useAuthRedirect
} from '@/shared';
import { Centrifuge, Subscription } from 'centrifuge';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../store';

export const useApp = () => {
  useAuthRedirect();

  const dispatch = useDispatch<AppDispatch>();

  const selectCurrentUserInfo = useSelector(selectUserInfo);

  const [centrifugeObj, setCentrifugeObj] = useState<{
    centrifuge: Centrifuge;
    subscription: Subscription;
  } | null>(null);

  useEffect(() => {
    setupRefreshInterceptor(dispatch);
    document.addEventListener('visibilitychange', handleCloseTab);

    if (!localStorage.getItem('token')) {
      dispatch(setUserUnauthorized());
    }

    dispatch(fetchCurrentUser());

    return () => {
      document.removeEventListener('visibilitychange', handleCloseTab);
    };
  }, []);

  useEffect(() => {
    if (selectCurrentUserInfo.id) {
      setCentrifugeObj(
        initAndStartCentrifugo(selectCurrentUserInfo.id, handlePublicationEvent)
      );
    }

    return () => {
      if (centrifugeObj) {
        centrifugeObj.centrifuge.disconnect();
        centrifugeObj.subscription.removeAllListeners();
        centrifugeObj.subscription.unsubscribe();
        switchStatusOffline();
      }
    };
  }, [selectCurrentUserInfo]);

  const handleCloseTab = () => {
    if (document.visibilityState === 'hidden') {
      switchStatusOffline();
    } else {
      switchStatusOnline();
    }
  };

  const handlePublicationEvent = (data: ICentrifugoEvent) => {
    const currentPage = window.location.hash.split('/');

    if (!currentPage.includes('dialog') || currentPage.length !== 3) {
      return;
    }

    switch (data.event) {
      case CentrifugoEventTypes.CREATE:
        dispatch(createMessage(data.message));
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
  };
};

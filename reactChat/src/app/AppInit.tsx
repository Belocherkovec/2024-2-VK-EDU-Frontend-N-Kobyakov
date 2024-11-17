import { AppDispatch } from '@/app/store';
import { selectUserInfo, setUserUnauthorized } from '@/entities/User/model';
import { fetchCurrentUser } from '@/entities/User/model/User.thunk';
import { setupRefreshInterceptor } from '@/shared/api';
import { centrifugoConnect } from '@/shared/api/centrifugo';
import { Centrifuge, Subscription } from 'centrifuge';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppRouter } from './routers';

export const AppInit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectCurrentUserInfo = useSelector(selectUserInfo);

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
    if (selectCurrentUserInfo.id) {
      setCentrifugeObj(centrifugoConnect(selectCurrentUserInfo.id));
    }

    return () => {
      if (centrifugeObj) {
        centrifugeObj.centrifuge.disconnect();
        centrifugeObj.subscription.removeAllListeners();
        centrifugeObj.subscription.unsubscribe();
      }
    };
  }, [selectCurrentUserInfo]);

  useEffect(() => {
    sessionStorage.setItem('lastVisitedUrl', location.pathname);

    return () => sessionStorage.removeItem('lastVisitedUrl');
  }, [location.pathname]);

  return <AppRouter />;
};

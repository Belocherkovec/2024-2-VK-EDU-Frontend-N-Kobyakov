import {
  selectUserInfo,
  setUserAuthorized,
  setUserInfo
} from '@/entities/User';
import { setupRefreshInterceptor } from '@/shared/api';
import { centrifugoConnect } from '@/shared/api/centrifugo';
import { getCurrentUser } from '@/shared/api/user';
import { Centrifuge, Subscription } from 'centrifuge';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppRouter } from './routers';

export const AppInit = () => {
  const dispatch = useDispatch();
  const selectCurrentUserInfo = useSelector(selectUserInfo);

  const [centrifugeObj, setCentrifugeObj] = useState<{
    centrifuge: Centrifuge;
    subscription: Subscription;
  } | null>(null);

  useEffect(() => {
    setupRefreshInterceptor(dispatch);

    if (localStorage.getItem('token')) {
      dispatch(setUserAuthorized());
      getCurrentUser().then(({ data }) => dispatch(setUserInfo(data)));
    }
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

  return <AppRouter />;
};

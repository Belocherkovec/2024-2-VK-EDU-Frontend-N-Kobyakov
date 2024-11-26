import { selectUserIsAuthenticated } from '@/entities/User';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RoutePaths } from '../consts';

export const useAuthRedirect = () => {
  const isAuthorized = useSelector(selectUserIsAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('lastVisitedUrl', location.pathname);

    return () => sessionStorage.removeItem('lastVisitedUrl');
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthorized) {
      if (history.length < 3) {
        navigate(RoutePaths.chatsPage, { replace: true });
      } else {
        navigate(-1);
      }
    }
  }, [isAuthorized]);
};

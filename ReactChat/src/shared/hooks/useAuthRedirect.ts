import { selectUserIsAuthenticated } from '@/entities/User';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { PublicPaths, RoutePaths } from '@/shared/index';

export const useAuthRedirect = () => {
  const isAuthorized = useSelector(selectUserIsAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === RoutePaths.initial) {
      const from = isAuthorized ? RoutePaths.chatsPage : RoutePaths.authPage;

      navigate(from, { replace: true });
    }

    if (
      isAuthorized &&
      Object.values(PublicPaths).some((path) =>
        location.pathname.includes(path)
      )
    ) {
      if (navigate.length > 2) {
        navigate(-1);
      } else {
        navigate(RoutePaths.chatsPage, { replace: true });
      }
    }

    sessionStorage.setItem('lastVisitedUrl', location.pathname);
  }, [location.pathname, isAuthorized]);
};

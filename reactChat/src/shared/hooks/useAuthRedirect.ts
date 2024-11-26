import { selectUserIsAuthenticated } from '@/entities/User';
import { PublicPaths, RoutePaths } from '@/shared';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

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
      const from =
        sessionStorage.getItem('lastVisitedUrl') || RoutePaths.chatsPage;

      navigate(from, { replace: true });
    }

    sessionStorage.setItem('lastVisitedUrl', location.pathname);
  }, [location.pathname, isAuthorized]);
};

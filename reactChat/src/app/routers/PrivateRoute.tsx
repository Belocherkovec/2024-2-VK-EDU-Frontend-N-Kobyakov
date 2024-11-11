import { selectIsAuthenticated } from '@/entities/User';
import { RoutePaths } from '@/shared/consts';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthorized = useSelector(selectIsAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate(RoutePaths.authPage, { replace: true });
    }
  }, [isAuthorized, navigate]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};
import { selectUserIsAuthenticated } from '@/entities/User';
import { RoutePaths } from '@/shared/consts';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthorized = useSelector(selectUserIsAuthenticated);
  const navigate = useNavigate();

  if (!isAuthorized) {
    navigate(RoutePaths.authPage, { replace: true });
  }

  return isAuthorized ? <>{children}</> : null;
};

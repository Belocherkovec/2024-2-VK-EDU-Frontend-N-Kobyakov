import { selectUserIsAuthenticated } from '@/entities/User';
import { RoutePaths } from '@/shared';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthorized = useSelector(selectUserIsAuthenticated);

  return isAuthorized ? (
    children
  ) : (
    <Navigate replace to={RoutePaths.authPage} />
  );
};

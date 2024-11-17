import { selectUserIsAuthenticated } from '@/entities/User/model';
import { RoutePaths } from '@/shared/consts';
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

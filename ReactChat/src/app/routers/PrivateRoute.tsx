import { selectUserIsAuthenticated } from 'ReactChat/src/entities/User';
import { PublicPaths, RoutePaths } from 'ReactChat/src/shared';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const lastVisitedUrl = sessionStorage.getItem('lastVisitedUrl');
  const isLastPagePublic =
    lastVisitedUrl &&
    Object.values(PublicPaths).some((path) => lastVisitedUrl.includes(path));
  const isAuthorized = useSelector(selectUserIsAuthenticated);

  return isAuthorized ? (
    children
  ) : (
    <Navigate
      replace
      to={isLastPagePublic ? lastVisitedUrl : RoutePaths.authPage}
    />
  );
};

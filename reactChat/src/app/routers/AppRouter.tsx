import { PrivateRoute } from '@/app/routers/PrivateRoute';
import {
  ChatsPage,
  DialogPage,
  EditProfilePage,
  ErrorPage,
  NotFoundPage
} from '@/pages';
import { AuthPage } from '@/pages/AuthPage';
import { RoutePaths } from '@/shared/consts';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    path: RoutePaths.authPage
  },
  {
    element: <PrivateRoute children={<ChatsPage />} />,
    errorElement: <ErrorPage />,
    path: RoutePaths.chatsPage
  },
  {
    element: <PrivateRoute children={<DialogPage />} />,
    errorElement: <ErrorPage />,
    path: RoutePaths.dialogPage
  },
  {
    element: <PrivateRoute children={<EditProfilePage />} />,
    errorElement: <ErrorPage />,
    path: RoutePaths.editProfilePage
  },
  {
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
    path: '*'
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;

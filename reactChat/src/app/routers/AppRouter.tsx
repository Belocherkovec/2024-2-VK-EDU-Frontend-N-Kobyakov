import { setUserAuthorized } from '@/entities/User';
import {
  ChatsPage,
  DialogPage,
  EditProfilePage,
  ErrorPage,
  NotFoundPage
} from '@/pages';
import { AuthPage } from '@/pages/AuthPage';
import { RoutePaths } from '@/shared/consts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    path: RoutePaths.authPage
  },
  {
    element: <ChatsPage />,
    errorElement: <ErrorPage />,
    path: RoutePaths.chatsPage
  },
  {
    element: <DialogPage />,
    errorElement: <ErrorPage />,
    path: RoutePaths.dialogPage
  },
  {
    element: <EditProfilePage />,
    errorElement: <ErrorPage />,
    path: RoutePaths.editProfilePage
  },
  {
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
    path: '*'
  }
]);

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setUserAuthorized());
    }
  }, []);

  return <RouterProvider router={router} />;
};

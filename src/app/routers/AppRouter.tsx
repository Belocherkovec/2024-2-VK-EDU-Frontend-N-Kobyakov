import {
  AuthPage,
  ChatsPage,
  CreateChatPage,
  DialogPage,
  EditProfilePage,
  ErrorPage,
  NotFoundPage,
  RegistrationPage
} from '@/pages';
import { RoutePaths } from '@/shared';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { App } from '../App';
import { PrivateRoute } from './PrivateRoute';

const router = createHashRouter([
  {
    children: [
      {
        element: <AuthPage />,
        path: RoutePaths.authPage
      },
      {
        element: <RegistrationPage />,
        path: RoutePaths.registrationPage
      },
      {
        element: <PrivateRoute children={<ChatsPage />} />,
        path: RoutePaths.chatsPage
      },
      {
        element: <PrivateRoute children={<CreateChatPage />} />,
        path: RoutePaths.createChatPage
      },
      {
        element: <PrivateRoute children={<DialogPage />} />,
        path: RoutePaths.dialogPage
      },
      {
        element: <PrivateRoute children={<EditProfilePage />} />,
        path: RoutePaths.editProfilePage
      },
      {
        element: <NotFoundPage />,
        path: RoutePaths.notFound
      }
    ],
    element: <App />,
    errorElement: <ErrorPage />,
    path: RoutePaths.main
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;

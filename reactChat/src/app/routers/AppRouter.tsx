import { App } from '@/app';
import { PrivateRoute } from '@/app/routers/PrivateRoute';
import {
  ChatsPage,
  DialogPage,
  EditProfilePage,
  ErrorPage,
  NotFoundPage
} from '@/pages';
import { AuthPage } from '@/pages/AuthPage';
import { CreateChatPage } from '@/pages/CreateChatPage/CreateChatPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { RoutePaths } from '@/shared/consts';
import { createHashRouter, RouterProvider } from 'react-router-dom';

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

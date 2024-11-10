import { DialogPage, EditProfilePage, ErrorPage, NotFoundPage } from '@/pages';
import { AuthPage } from '@/pages/AuthPage';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    path: '/'
  },
  {
    element: <DialogPage />,
    errorElement: <ErrorPage />,
    path: '/dialog/:chatId'
  },
  {
    element: <EditProfilePage />,
    errorElement: <ErrorPage />,
    path: '/profile/edit/:profileId'
  },
  {
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
    path: '*'
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;

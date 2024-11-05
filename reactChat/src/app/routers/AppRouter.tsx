import { ChatsPage } from '@/pages';
import { ErrorPage } from '@/pages';
import { DialogPage } from '@/pages';
import { EditProfilePage } from '@/pages';
import { NotFoundPage } from '@/pages';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    element: <ChatsPage />,
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

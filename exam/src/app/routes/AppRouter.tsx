import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import { HistoryPage } from "../../pages/HistoryPage/HistoryPage";
import { Translate } from "../../pages/Translate/Translate";

const router = createHashRouter([
  {
    path: '/',
    element: <Translate/>
  },
  {
    path: '/history',
    element: <HistoryPage/>
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />
  }
])

export const AppRouter = () => <RouterProvider router={router} />;
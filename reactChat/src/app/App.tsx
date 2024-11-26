import { useApp } from '@/app/hooks/useApp';

import './app.scss';

import { Outlet } from 'react-router-dom';

export const App = () => {
  useApp();

  return <Outlet />;
};

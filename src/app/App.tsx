import { Outlet } from 'react-router-dom';

import './app.scss';
import { useApp } from './hooks';

export const App = () => {
  useApp();

  return <Outlet />;
};

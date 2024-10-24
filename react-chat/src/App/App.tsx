import { AppRouter } from '@/app/routers';
import { StoreProvider } from '@/app/store';

import './App.scss';

export const App = () => (
  <StoreProvider>
    <AppRouter />
  </StoreProvider>
);

import { AppRouter } from '@/app/routers';
import { StoreProvider } from '@/app/store';

import './app.scss';

export const App = () => (
  <StoreProvider>
    <AppRouter />
  </StoreProvider>
);

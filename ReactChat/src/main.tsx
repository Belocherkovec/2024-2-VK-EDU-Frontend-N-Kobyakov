import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { AppRouter, store } from 'ReactChat/src/app';
import { Notification } from 'ReactChat/src/entities/Notification';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Notification />
      <AppRouter />
    </Provider>
  </StrictMode>
);
import './app.scss';

import { Provider } from 'react-redux';

import { AppInit } from './AppInit';
import { StoreProvider } from './oldStore';
import { store } from './store';

export const App = () => (
  <StoreProvider>
    <Provider store={store}>
      <AppInit />
    </Provider>
  </StoreProvider>
);

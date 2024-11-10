import { Provider } from 'react-redux';

import './app.scss';
import { StoreProvider } from './oldStore';
import { AppRouter } from './routers';
import { store } from './store';

export const App = () => (
  <StoreProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StoreProvider>
);

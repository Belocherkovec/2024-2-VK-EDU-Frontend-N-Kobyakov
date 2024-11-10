import { ReactNode } from 'react';

import { useStoreProvider } from './hooks/useStoreProvider';
import { Store } from './types';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const { handleStoreUpdate, store } = useStoreProvider();

  return (
    <Store.Provider value={{ handleStoreUpdate, store }}>
      {children}
    </Store.Provider>
  );
};

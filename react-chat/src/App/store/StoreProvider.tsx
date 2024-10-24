import { Store } from '@/app/store';
import { getLocalStorageData, setLocalStorageData } from '@/shared/utils';
import { ReactNode, useState } from 'react';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [store, setStore] = useState(() => ({
    chat: getLocalStorageData(),
    filter: '',
    isInverted: false
  }));

  const handleStoreUpdate = (path: string, value: any) => {
    const keys = path.split('.');
    const lastKey = keys.pop() as string;
    const resultObj = { ...store };

    let currentObj: any = resultObj;

    for (const key of keys) {
      if (Array.isArray(currentObj[key])) {
        currentObj[key] = [...currentObj[key]];
      } else {
        currentObj[key] = { ...currentObj[key] };
      }

      currentObj = currentObj[key];
    }

    currentObj[lastKey] = value;

    setStore(resultObj);

    if (keys.includes('chat')) {
      setLocalStorageData(resultObj.chat);
    }
  };

  return (
    <Store.Provider value={{ handleStoreUpdate, store }}>
      {children}
    </Store.Provider>
  );
};

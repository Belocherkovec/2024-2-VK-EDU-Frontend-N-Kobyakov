import { IStore } from '@/app/store/types';
import { TEXTS } from '@/shared/consts/texts';
import { getLocalStorageData, setLocalStorageData } from '@/shared/utils';
import { useState } from 'react';

export const useStoreProvider = (): IStore => {
  const [store, setStore] = useState(() => ({
    chat: getLocalStorageData(),
    filter: TEXTS.empty,
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

  return {
    handleStoreUpdate,
    store
  };
};

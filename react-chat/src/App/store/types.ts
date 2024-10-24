import { IStorage } from '@/shared/types';
import { createContext } from 'react';

export const Store = createContext<IStore>({
  handleStoreUpdate: () => { },
  store: {
    chat: {},
    filter: ''
  }
});

export interface IStore {
  handleStoreUpdate: (key: string, value: any) => void;
  store: IStorage;
}

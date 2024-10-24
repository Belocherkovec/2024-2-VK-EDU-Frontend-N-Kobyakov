import { templateChatsData } from '@/shared/consts';
import { ChatType } from '@/shared/types';

export const getLocalStorageData = (): ChatType => {
  let localStorageData = localStorage.getItem('react-chat') || '';

  if (!localStorageData) {
    setLocalStorageData(templateChatsData);
    localStorageData = localStorage.getItem('react-chat') || '';
  }

  return JSON.parse(localStorageData);
};

export const setLocalStorageData = (data: ChatType): void => {
  localStorage.setItem('react-chat', JSON.stringify(data));
};

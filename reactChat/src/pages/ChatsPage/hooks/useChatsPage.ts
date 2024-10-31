import { Store } from '@/app/store';
import { useContext, useState } from 'react';

export const useChatsPage = () => {
  const {
    store: { chat, filter }
  } = useContext(Store);

  const [isShowUpdates, setIsShowUpdates] = useState(
    !localStorage.getItem('isShowUpdates1')
  );

  const handleCloseShowUpdates = () => {
    setIsShowUpdates(false);
    localStorage.setItem('isShowUpdates1', 'showed');
  };

  return { chat, filter, handleCloseShowUpdates, isShowUpdates };
};

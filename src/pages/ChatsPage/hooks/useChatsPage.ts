import { AppDispatch } from '@/app';
import { fetchChats, selectChatIds, selectChatMap } from '@/entities/Chat';
import { selectUserInfo } from '@/entities/User';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useChatsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(selectUserInfo);
  const chatIds = useSelector(selectChatIds);
  const chatMap = useSelector(selectChatMap);

  const [isShowUpdates, setIsShowUpdates] = useState(
    !localStorage.getItem('isShowUpdates4')
  );

  useEffect(() => {
    if (!chatIds.length) {
      dispatch(fetchChats());
    }
  }, []);

  const handleCloseShowUpdates = () => {
    setIsShowUpdates(false);
    localStorage.setItem('isShowUpdates4', 'showed');
  };

  return { chatIds, chatMap, handleCloseShowUpdates, isShowUpdates, userInfo };
};

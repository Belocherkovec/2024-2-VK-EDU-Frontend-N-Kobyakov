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
    !localStorage.getItem('isShowUpdates3')
  );

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  const handleCloseShowUpdates = () => {
    setIsShowUpdates(false);
    localStorage.setItem('isShowUpdates3', 'showed');
  };

  return { chatIds, chatMap, handleCloseShowUpdates, isShowUpdates, userInfo };
};

import { AppDispatch } from '@/app/store';
import {
  fetchChats,
  selectChatIds,
  selectChatMap
} from '@/entities/Chat/model';
import { selectUserInfo } from '@/entities/User/model';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useChatsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(selectUserInfo);
  const chatIds = useSelector(selectChatIds);
  const chatMap = useSelector(selectChatMap);

  const [isShowUpdates, setIsShowUpdates] = useState(
    !localStorage.getItem('isShowUpdates1')
  );

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  const handleCloseShowUpdates = () => {
    setIsShowUpdates(false);
    localStorage.setItem('isShowUpdates1', 'showed');
  };

  return { chatIds, chatMap, handleCloseShowUpdates, isShowUpdates, userInfo };
};

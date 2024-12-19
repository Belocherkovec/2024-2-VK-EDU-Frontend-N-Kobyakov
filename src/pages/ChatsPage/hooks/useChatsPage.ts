import { AppDispatch } from '@/app';
import { fetchChats, selectChatIds, selectChatMap } from '@/entities/Chat';
import { selectUserInfo } from '@/entities/User';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/shared';

export const useChatsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(selectUserInfo);
  const chatIds = useSelector(selectChatIds);
  const chatMap = useSelector(selectChatMap);

  const [isShowUpdates, setIsShowUpdates] = useState(
    !localStorage.getItem('isShowUpdates4')
  );
  const [isShowMenu, setIsShowMenu] = useState(false);

  useEffect(() => {
    if (!chatIds.length) {
      dispatch(fetchChats());
    }
  }, []);

  const handleCloseShowUpdates = () => {
    setIsShowUpdates(false);
    localStorage.setItem('isShowUpdates4', 'showed');
  };
  const handleIsShowMenuChange = () => setIsShowMenu(!isShowMenu);
  const handleClickSettings = () => {
    navigate(RoutePaths.editProfilePage);
  };

  return {
    chatIds,
    chatMap,
    userInfo,
    isShowMenu,
    isShowUpdates,
    handleClickSettings,
    handleCloseShowUpdates,
    handleIsShowMenuChange
  };
};

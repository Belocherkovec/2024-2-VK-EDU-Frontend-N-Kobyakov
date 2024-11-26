import { AppDispatch } from '@/app';
import { fetchUsers, selectUsersIds, selectUsersMap } from '@/entities/User';
import { createPrivateChat } from '@/shared';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCreateChatPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const usersIds = useSelector(selectUsersIds);
  const usersMap = useSelector(selectUsersMap);

  const handleUserClick = (id: string) => {
    createPrivateChat(id).then((res) => console.log(res));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return {
    handleUserClick,
    usersIds,
    usersMap
  };
};

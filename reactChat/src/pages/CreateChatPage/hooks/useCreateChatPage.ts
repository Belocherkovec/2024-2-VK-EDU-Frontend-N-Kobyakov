import { AppDispatch } from '@/app/store';
import { selectUsersIds, selectUsersMap } from '@/entities/User/model';
import { fetchUsers } from '@/entities/User/model/User.thunk';
import { createPrivateChat } from '@/shared/api/chat/chat';
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

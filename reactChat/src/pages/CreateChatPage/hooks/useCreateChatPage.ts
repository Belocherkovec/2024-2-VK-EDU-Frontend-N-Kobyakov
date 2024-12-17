import { AppDispatch } from '@/app';
import { fetchUsers, selectUsersIds, selectUsersMap } from '@/entities/User';
import { createPrivateChat, RoutePaths } from '@/shared';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addChat } from '@/entities/Chat';

export const useCreateChatPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const usersIds = useSelector(selectUsersIds);
  const usersMap = useSelector(selectUsersMap);

  const handleUserClick = async (id: string) => {
    const createChatResult = await createPrivateChat(id);

    if (createChatResult.status === 201) {
      dispatch(addChat(createChatResult.data));
    }

    navigate(
      RoutePaths.dialogPage.replace(':chatId', createChatResult.data.id)
    );
  };

  useEffect(() => {
    if (!usersIds.length) {
      dispatch(fetchUsers());
    }
  }, []);

  return {
    handleUserClick,
    usersIds,
    usersMap
  };
};

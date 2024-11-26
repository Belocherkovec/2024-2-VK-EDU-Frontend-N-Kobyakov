import { AppDispatch } from '@/app';
import { addChat } from '@/entities/Chat';
import { fetchUsers, selectUsersIds, selectUsersMap } from '@/entities/User';
import { createPrivateChat, getChat, RoutePaths } from '@/shared';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useCreateChatPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const usersIds = useSelector(selectUsersIds);
  const usersMap = useSelector(selectUsersMap);

  const handleUserClick = async (id: string) => {
    const createChatResult = await createPrivateChat(id);

    let getCreatedChatInfo;

    if (createChatResult.status === 201) {
      getCreatedChatInfo = await getChat(createChatResult.data.id);
    }

    if (getCreatedChatInfo && getCreatedChatInfo.status === 200) {
      dispatch(addChat(getCreatedChatInfo.data));
    }

    navigate(
      RoutePaths.dialogPage.replace(':chatId', createChatResult.data.id)
    );
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

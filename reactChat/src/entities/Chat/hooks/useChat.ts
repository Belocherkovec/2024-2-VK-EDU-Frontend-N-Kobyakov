import { RootState } from '@/app';
import { useSelector } from 'react-redux';

import { selectCurrentChat } from '../model';

export const useChat = (userId: string) => {
  const chatData = useSelector((state: RootState) =>
    selectCurrentChat(state, userId)
  );

  const { avatar, title } = chatData;

  return { avatar, title };
};

import { RootState } from '@/app/store';
import { selectCurrentChat } from '@/entities/Chat/model';
import { useSelector } from 'react-redux';

export const useChat = (userId: string) => {
  const chatData = useSelector((state: RootState) =>
    selectCurrentChat(state, userId)
  );

  const { avatar, title } = chatData;

  return { avatar, title };
};

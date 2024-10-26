import { Store } from '@/app/store';
import { generator } from '@/shared/consts';
import { TEXTS } from '@/shared/consts/texts.ts';
import { IReactChat } from '@/shared/types.ts';
import { useContext } from 'react';

export const useCreateNewChat = () => {
  const {
    handleStoreUpdate,
    store: { chat }
  } = useContext(Store);

  const handleClick = () => {
    const newUserName = prompt(TEXTS.actions.createNewUser);

    if (!newUserName) {
      throw new Error(TEXTS.errors.invalidNewUser);
    }

    const newUserId = Object.keys(chat).length + 1;

    const newUserData: IReactChat = {
      avatar: generator.generateRandomAvatar(),
      messages: [],
      userId: newUserId,
      userName: newUserName.trim()
    };

    handleStoreUpdate(`chat.${newUserId}`, newUserData);
  };

  return { handleClick };
};

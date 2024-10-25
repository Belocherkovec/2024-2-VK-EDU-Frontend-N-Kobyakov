import { Store } from '@/app/store';
import { generator } from '@/shared/consts';
import { IReactChat } from '@/shared/types';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useContext } from 'react';

import styles from './createNewChat.module.scss';

export const CreateNewChat: React.FC = () => {
  const {
    handleStoreUpdate,
    store: { chat }
  } = useContext(Store);

  const handleClick = () => {
    const newUserName = prompt('Введите имя пользователя для нового диалога');

    if (!newUserName) {
      throw new Error('Не задано имя для нового пользователя');
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

  return (
    <button
      className={styles['new-chat-button']}
      id="button-create-chat"
      onClick={handleClick}
    >
      <AddRoundedIcon className={styles.icon} />
    </button>
  );
};

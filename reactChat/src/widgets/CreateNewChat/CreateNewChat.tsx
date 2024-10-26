import AddRoundedIcon from '@mui/icons-material/AddRounded';

import styles from './createNewChat.module.scss';
import { useCreateNewChat } from './hooks/useCreateNewChat.ts';

export const CreateNewChat: React.FC = () => {
  const { handleClick } = useCreateNewChat();

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

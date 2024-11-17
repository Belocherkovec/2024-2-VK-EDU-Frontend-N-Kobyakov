import { Avatar } from '@/shared/components';
import { TEXTS } from '@/shared/consts/texts';
import { useNavigate } from 'react-router-dom';

import styles from './userInfo.module.scss';

export const UserInfo: React.FC<{
  avatar: string;
  chatId: string;
  fullName: string;
}> = ({ avatar, chatId, fullName }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/edit/${chatId}`);
  };

  return (
    <div className={styles.user} onClick={handleClick}>
      <Avatar
        alt={TEXTS.images.avatar}
        className={styles.user__avatar}
        src={avatar}
      />
      <div className={styles['user__name-container']}>
        <p className={styles.user__name}>{fullName}</p>
        <p className={styles['user__last-online']}>
          {TEXTS.lastActivity.recently}
        </p>
      </div>
    </div>
  );
};

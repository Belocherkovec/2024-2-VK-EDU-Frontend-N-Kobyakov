import { Avatar, TEXTS } from '@/shared';

import styles from './userInfo.module.scss';

export const UserInfo: React.FC<{
  avatar: null | string;
  title: string;
  lastOnline?: string;
}> = ({ avatar, title, lastOnline }) => (
  <div className={styles.user}>
    <Avatar
      alt={TEXTS.images.avatar}
      className={styles.user__avatar}
      firstName={title.split(' ')[0]}
      lastName={title.split(' ')[1]}
      src={avatar}
      isGroupChat={!lastOnline}
    />
    <div className={styles['user__name-container']}>
      <p className={styles.user__name}>{title}</p>
      <p className={styles['user__last-online']}>
        {lastOnline && `был(а) в ${lastOnline}`}
      </p>
    </div>
  </div>
);

import { Avatar, TEXTS } from '@/shared';

import styles from './userInfo.module.scss';

export const UserInfo: React.FC<{
  avatar: null | string;
  title: string;
}> = ({ avatar, title }) => (
  <div className={styles.user}>
    <Avatar
      alt={TEXTS.images.avatar}
      className={styles.user__avatar}
      firstName={title.split(' ')[0]}
      lastName={title.split(' ')[1]}
      src={avatar}
    />
    <div className={styles['user__name-container']}>
      <p className={styles.user__name}>{title}</p>
      <p className={styles['user__last-online']}>
        {TEXTS.lastActivity.recently}
      </p>
    </div>
  </div>
);

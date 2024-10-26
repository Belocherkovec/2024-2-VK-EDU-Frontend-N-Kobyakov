import { TEXTS } from '@/shared/consts/texts.ts';

import styles from './userInfo.module.scss';

export const UserInfo: React.FC<{ avatar: string; userName: string }> = ({
  avatar,
  userName
}) => (
  <div className={styles.user}>
    <img
      alt={TEXTS.images.avatar}
      className={styles.user__avatar}
      src={avatar}
    />
    <div className={styles['user__name-container']}>
      <p className={styles.user__name}>{userName}</p>
      <p className={styles['user__last-online']}>
        {TEXTS.lastActivity.recently}
      </p>
    </div>
  </div>
);

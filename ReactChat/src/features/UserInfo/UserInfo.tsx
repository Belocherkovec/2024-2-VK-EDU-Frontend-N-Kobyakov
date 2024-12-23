import { Avatar, TEXTS } from 'ReactChat/src/shared';
import cn from 'classnames';

import styles from './userInfo.module.scss';

export const UserInfo: React.FC<{
  avatar: null | string;
  title: string;
  lastOnline?: string;
  isOnline?: boolean;
  bio?: string;
  className?: string;
}> = ({ avatar, title, lastOnline, isOnline, bio, className }) => (
  <div className={cn(styles.user, className)}>
    <Avatar
      alt={TEXTS.images.avatar}
      className={styles.user__avatar}
      firstName={title.split(' ')[0]}
      lastName={title.split(' ')[1]}
      src={avatar}
      isGroupChat={!lastOnline}
      isOnline={isOnline}
    />
    <div className={styles.user__userWrapper}>
      <h2 className={styles.user__name}>{title}</h2>
      <p className={styles.user__lastOnline}>
        {isOnline ? TEXTS.online : ''}
        {lastOnline && !isOnline && `был(а) в ${lastOnline}`}
        {bio && bio}
      </p>
    </div>
  </div>
);

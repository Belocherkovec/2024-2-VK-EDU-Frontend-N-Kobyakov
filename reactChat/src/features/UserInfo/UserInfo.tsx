import { Avatar, TEXTS } from '@/shared';
import cn from 'classnames';

import styles from './userInfo.module.scss';

export const UserInfo: React.FC<{
  avatar: null | string;
  file?: File;
  title: string;
  lastOnline?: string;
  isOnline?: boolean;
  bio?: string;
  className?: string;
}> = ({ avatar, title, lastOnline, isOnline, bio, file, className }) => (
  <div className={cn(styles.user, className)}>
    <Avatar
      alt={TEXTS.images.avatar}
      className={styles.user__avatar}
      firstName={title.split(' ')[0]}
      lastName={title.split(' ')[1]}
      src={avatar}
      isGroupChat={!lastOnline}
      isOnline={isOnline}
      file={file}
    />
    <div>
      <p className={styles.user__name}>{title}</p>
      <p className={styles.user__lastOnline}>
        {isOnline ? TEXTS.online : ''}
        {lastOnline && !isOnline && `был(а) в ${lastOnline}`}
        {bio && bio}
      </p>
    </div>
  </div>
);

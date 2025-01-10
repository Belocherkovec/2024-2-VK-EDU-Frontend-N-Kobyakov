import { Avatar } from '@/shared';
import React from 'react';

import styles from './user.module.scss';

interface IUserProps {
  avatar: null | string;
  firstName: string;
  lastName: string;
  onCLick: (id: string) => void;
  userId: string;
  isOnline: boolean;
  username: string;
}

export const User: React.FC<IUserProps> = ({
  avatar,
  firstName,
  lastName,
  onCLick,
  userId,
  isOnline,
  username
}) => (
  <div className={styles.user} onClick={() => onCLick(userId)}>
    {
      <Avatar
        className={styles.user__avatar}
        firstName={firstName}
        lastName={lastName}
        src={avatar}
        isOnline={isOnline}
      />
    }
    <div>
      <h2 className={styles.user__userInitials}>
        {firstName} {lastName}
      </h2>
      <p className={styles.user__username}>@{username}</p>
    </div>
  </div>
);

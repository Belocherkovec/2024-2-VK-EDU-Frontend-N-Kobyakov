import { Avatar } from 'ReactChat/src/shared';
import React from 'react';

import styles from './user.module.scss';

interface IUserProps {
  avatar: null | string;
  firstName: string;
  lastName: string;
  onCLick: (id: string) => void;
  userId: string;
  isOnline: boolean;
}

export const User: React.FC<IUserProps> = ({
  avatar,
  firstName,
  lastName,
  onCLick,
  userId,
  isOnline
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
    <h2 className={styles.user__username}>
      {firstName} {lastName}
    </h2>
  </div>
);

import { Avatar } from '@/shared/components';
import React from 'react';

import styles from './user.module.scss';

interface IUserProps {
  avatar: null | string;
  firstName: string;
  lastName: string;
  onCLick: (id: string) => void;
  userId: string;
}

export const User: React.FC<IUserProps> = ({
  avatar,
  firstName,
  lastName,
  onCLick,
  userId
}) => (
  <div className={styles.user} onClick={() => onCLick(userId)}>
    {
      <Avatar
        className={styles.user__avatar}
        firstName={firstName}
        lastName={lastName}
        src={avatar}
      />
    }
    <h2 className={styles.user__username}>
      {firstName} {lastName}
    </h2>
  </div>
);

import { Store } from '@/app/store';
import { CheckMark } from '@/shared/components/CheckMark';
import { TEXTS } from '@/shared/consts/texts.ts';
import { getFormattedDate } from '@/shared/utils/timeFormatter';
import cn from 'classnames';
import React from 'react';
import { useContext } from 'react';

import styles from './chat.module.scss';

export const Chat: React.FC<{ userId: number }> = ({ userId }) => {
  const {
    store: { chat }
  } = useContext(Store);

  const userData = chat[userId];
  const lastMessage = userData.messages.at(-1);

  const handleClick = () => {
    window.location.hash = `dialog?id=${userId}`;
  };

  return (
    <div className={styles.dialog} onClick={handleClick}>
      <img
        alt={TEXTS.images.avatar}
        className={cn(styles.dialog__avatar, styles.loading)}
        src={userData.avatar}
      />
      <div className={styles.dialog__user}>
        <h2 className={styles.dialog__username}>{userData.userName}</h2>
        <p className={styles['dialog__last-message']}>
          {lastMessage?.text || TEXTS.empty}
        </p>
      </div>
      <div className={styles.dialog__info}>
        <p className={styles['dialog__last-message-time']}>
          {lastMessage
            ? getFormattedDate(new Date(lastMessage?.sendDate))
            : TEXTS.empty}
        </p>
        <p className={styles['dialog__check-mark']}>
          {lastMessage ? (
            <CheckMark
              unreadClassName={styles.dialog__unread}
              userData={userData}
            />
          ) : (
            TEXTS.empty
          )}
        </p>
      </div>
    </div>
  );
};

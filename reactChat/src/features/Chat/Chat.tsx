import { Store } from '@/app/store';
import { USERNAME } from '@/shared/consts';
import { MessageStatuses } from '@/shared/consts/statuses';
import { IReactChatMessage } from '@/shared/types';
import { getFormattedDate } from '@/shared/utils/timeFormatter';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import cn from 'classnames';
import React, { ReactNode } from 'react';
import { useContext } from 'react';

import styles from './chat.module.scss';

export const Chat: React.FC<{ userId: number }> = ({ userId }) => {
  const {
    store: { chat }
  } = useContext(Store);

  const userData = chat[userId];
  const lastMessage = userData.messages.at(-1);

  const CheckMark = (): ReactNode => {
    const { author, status: messageStatus } = lastMessage as IReactChatMessage;

    const unreadMessage: number = userData.messages.filter(
      (msg: IReactChatMessage) =>
        msg.author !== USERNAME && msg.status === MessageStatuses.STATUS_SEND
    ).length;

    let StatusIcon;
    let Result;

    switch (messageStatus) {
      case MessageStatuses.STATUS_DRAFT:
        break;
      case MessageStatuses.STATUS_READ:
        StatusIcon = <DoneAllRoundedIcon />;
        break;
      case MessageStatuses.STATUS_SEND:
        StatusIcon = <CheckRoundedIcon />;
        break;
    }

    if (author === USERNAME) {
      Result = StatusIcon;
    } else {
      Result = <span className={styles.dialog__unread}>{unreadMessage}</span>;
    }

    return Result;
  };

  const handleClick = () => {
    window.location.hash = `dialog?id=${userId}`;
  };

  return (
    <div className={styles.dialog} onClick={handleClick}>
      <img
        alt="изображение пользователя"
        className={cn(styles.dialog__avatar, styles.loading)}
        src={userData.avatar}
      />
      <div className={styles.dialog__user}>
        <h2 className={styles.dialog__username}>{userData.userName}</h2>
        <p className={styles['dialog__last-message']}>
          {lastMessage?.text || ''}
        </p>
      </div>
      <div className={styles.dialog__info}>
        <p className={styles['dialog__last-message-time']}>
          {lastMessage ? getFormattedDate(new Date(lastMessage?.sendDate)) : ''}
        </p>
        <p className={styles['dialog__check-mark']}>
          {lastMessage ? <CheckMark /> : ''}
        </p>
      </div>
    </div>
  );
};

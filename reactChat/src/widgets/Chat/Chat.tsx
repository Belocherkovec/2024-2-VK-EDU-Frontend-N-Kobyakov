import { CheckMark } from '@/features';
import { Image } from '@/shared/components';
import { USERNAME } from '@/shared/consts';
import { TEXTS } from '@/shared/consts/texts';
import { getFormattedDate } from '@/shared/utils/timeFormatter';
import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './chat.module.scss';
import { useChat } from './hooks/useChat';

export const Chat: React.FC<{ userId: number }> = ({ userId }) => {
  const { avatar, draftMessage, fullName, lastMessage, unreadMessage } =
    useChat(userId);

  return (
    <Link className={styles.dialog} to={`/dialog/${userId}`}>
      <Image
        alt={TEXTS.images.avatar}
        className={cn(styles.dialog__avatar, styles.loading)}
        src={avatar}
      />
      <div className={styles.dialog__user}>
        <h2 className={styles.dialog__username}>{fullName}</h2>
        <p className={styles['dialog__last-message']}>
          {!unreadMessage && draftMessage && <span>Черновик: </span>}
          {(!unreadMessage && draftMessage) || lastMessage?.text || TEXTS.empty}
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
              isShowUnread={lastMessage.author !== USERNAME}
              messageStatus={lastMessage.status}
              undeadMessagesCount={unreadMessage}
              unreadClassName={styles.dialog__unread}
            />
          ) : (
            TEXTS.empty
          )}
        </p>
      </div>
    </Link>
  );
};

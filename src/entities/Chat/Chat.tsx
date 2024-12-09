import { Avatar, CheckMark, RoutePaths, TEXTS } from '@/shared';
import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './chat.module.scss';
import { useChat } from './hooks/useChat';

export const Chat: React.FC<{ chatId: string }> = ({ chatId }) => {
  const {
    avatar,
    title,
    isPrivate,
    lastMessageText,
    lastMessageTimestamp,
    isUserMessage,
    isOnline,
    lastMessageStatus
  } = useChat(chatId);

  return (
    <Link
      className={styles.dialog}
      to={RoutePaths.dialogPage.replace(':chatId', chatId)}
    >
      <Avatar
        alt={TEXTS.images.avatar}
        className={cn(styles.dialog__avatar, styles.loading)}
        firstName={title.split(' ')[0]}
        lastName={title.split(' ')[1]}
        src={avatar}
        isGroupChat={!isPrivate}
        isOnline={isOnline}
      />
      <div className={styles.dialog__user}>
        <h2 className={styles.dialog__username}>{title}</h2>
        {lastMessageText && (
          <p className={styles.dialog__lastMessage}>{lastMessageText}</p>
        )}
      </div>
      <div className={styles.dialog__info}>
        <p className={styles.dialog__lastMessageTime}>{lastMessageTimestamp}</p>
        {!isUserMessage && lastMessageText && (
          <p className={styles.dialog__checkMark}>
            <CheckMark messageStatus={lastMessageStatus} />
          </p>
        )}
      </div>
    </Link>
  );
};

import { Store } from '@/app/store';
import { Message } from '@/features/Message';
import { MessageInput } from '@/features/MessageInput';
import { USERNAME } from '@/shared/consts';
import { MessageStatuses } from '@/shared/consts/statuses';
import authorImg from '@/shared/img/Nikolai_avatar.jpg';
import { IReactChat } from '@/shared/types';
import { timeFormatter } from '@/shared/utils/timeFormatter';
import { DialogHeader } from '@/widgets/DialogHeader';
import cn from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';
import { useContext } from 'react';

import styles from './dialog.module.scss';

export const Dialog = () => {
  const {
    handleStoreUpdate,
    store: { chat, isInverted }
  } = useContext(Store);

  const { hash } = window.location;
  const params = new URLSearchParams(hash.slice(hash.indexOf('?')));
  const userId = params.get('id') as string;

  const userChatData: IReactChat = chat[userId];
  const { messages } = userChatData;

  const avatar = useMemo(
    () => (isInverted ? authorImg : userChatData.avatar),
    [isInverted, userChatData.avatar]
  );

  const userName = isInverted ? USERNAME : userChatData.userName;
  const author = isInverted ? userChatData.userName : USERNAME;

  useEffect(() => {
    document.body.style.backgroundColor = '#F0F1F5';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const getIsUserMessageValue = (author: string): boolean => {
    let result = false;

    if (author !== USERNAME) {
      result = true;
    }

    if (isInverted) {
      result = !result;
    }

    return result;
  };

  const handleAreaSend = useCallback((value: string) => {
    const newMessage = {
      author,
      sendDate: new Date(),
      status: MessageStatuses.STATUS_SEND,
      text: value.trim()
    };
    handleStoreUpdate(`chat.${userId}.messages`, [...messages, newMessage]);
  }, []);

  return (
    <section>
      <DialogHeader
        avatar={avatar}
        className={cn(styles.fixed, styles.header)}
        userName={userName}
      />
      <ul className={styles.messages}>
        {messages.map((message, idx) => (
          <Message
            isUserMessage={getIsUserMessageValue(message.author)}
            key={`${idx}_${message.author}`}
            message={message.text}
            timeStamp={timeFormatter.format(new Date(message.sendDate))}
          />
        ))}
      </ul>
      <MessageInput
        className={cn(styles.fixed, styles.form)}
        onSend={handleAreaSend}
      />
    </section>
  );
};

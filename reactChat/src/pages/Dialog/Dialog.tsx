import { Message } from '@/features/Message';
import { MessageInput } from '@/features/MessageInput';
import { timeFormatter } from '@/shared/utils/timeFormatter';
import { DialogHeader } from '@/widgets/DialogHeader';
import cn from 'classnames';

import styles from './dialog.module.scss';
import { useDialog } from './hooks/useDialog.ts';

export const Dialog = () => {
  const { avatar, getIsUserMessageValue, handleAreaSend, messages, userName } =
    useDialog();

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

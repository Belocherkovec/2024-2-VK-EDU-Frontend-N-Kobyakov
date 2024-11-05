import { Message } from '@/features';
import { MessageInput } from '@/features';
import { timeFormatter } from '@/shared/utils/timeFormatter';
import { DialogHeader } from '@/widgets';

import styles from './dialogPage.module.scss';
import { useDialogPage } from './hooks/useDialogPage.ts';

export const DialogPage = () => {
  const {
    avatar,
    chatId,
    fullName,
    getIsUserMessageValue,
    handleAreaSend,
    handleSetRef,
    messages
  } = useDialogPage();

  return (
    <section className={styles.dialog}>
      <DialogHeader avatar={avatar} chatId={chatId} fullName={fullName} />
      <ul className={styles.dialog__messages}>
        {messages.map((message, idx) => (
          <Message
            dataIndex={idx}
            isUserMessage={getIsUserMessageValue(message.author)}
            key={`${idx}_${message.author}`}
            message={message.text}
            ref={(element) => handleSetRef(element, idx)}
            status={message.status}
            timeStamp={timeFormatter.format(new Date(message.sendDate))}
          />
        ))}
      </ul>
      <MessageInput chatId={+chatId} onSend={handleAreaSend} />
    </section>
  );
};

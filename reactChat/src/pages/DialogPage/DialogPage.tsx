import { Message } from '@/entities/Message';
import { MessageStatuses, TEXTS, timeFormatter } from '@/shared';
import { MessageInput } from '@/widgets';

import styles from './dialogPage.module.scss';
import { DialogHeader } from './ui';
import { useDialogPage } from './hooks';

export const DialogPage = () => {
  const {
    avatar,
    chatId,
    handleAreaSend,
    handleSetRef,
    isUserMessage,
    messagesIdx,
    messagesMap,
    lastOnline,
    title,
    isOnline
  } = useDialogPage();

  return (
    <section className={styles.dialog}>
      <DialogHeader
        avatar={avatar}
        title={title}
        lastOnline={lastOnline}
        isOnline={isOnline}
        className={styles.dialog__header}
      />
      <ul className={styles.dialog__messages}>
        {messagesIdx.map((msgId, idx) => (
          <Message
            dataIndex={msgId}
            isUserMessage={isUserMessage(msgId)}
            key={msgId + idx}
            message={messagesMap[msgId].text || TEXTS.empty}
            ref={(element) => handleSetRef(element)}
            status={
              messagesMap[msgId].was_read_by?.length
                ? MessageStatuses.STATUS_READ
                : MessageStatuses.STATUS_SEND
            }
            timeStamp={timeFormatter.format(
              new Date(messagesMap[msgId].created_at)
            )}
          />
        ))}
      </ul>
      <MessageInput chatId={chatId} onSend={handleAreaSend} />
    </section>
  );
};

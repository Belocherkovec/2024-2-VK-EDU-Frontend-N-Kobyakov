import { Message } from '@/entities/Message';
import { MessageInput } from '@/features';
import { TEXTS } from '@/shared/consts';
import { MessageStatuses } from '@/shared/consts/statuses';
import { timeFormatter } from '@/shared/utils/timeFormatter';
import { DialogHeader } from '@/widgets';

import styles from './dialogPage.module.scss';
import { useDialogPage } from './hooks/useDialogPage';

export const DialogPage = () => {
  const {
    avatar,
    chatId,
    handleAreaSend,
    handleSetRef,
    isUserMessage,
    messagesIdx,
    messagesMap,
    title
  } = useDialogPage();

  return (
    <section className={styles.dialog}>
      <DialogHeader avatar={avatar} title={title} />
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

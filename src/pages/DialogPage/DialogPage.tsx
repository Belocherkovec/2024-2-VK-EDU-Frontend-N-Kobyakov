import { Message } from '@/entities/Message';
import { Loader, MessageStatuses, TEXTS, yearFormatter } from '@/shared';
import { MessageInput } from '@/widgets';

import styles from './dialogPage.module.scss';
import { DialogHeader } from './ui';
import { useDialogPage } from './hooks';

export const DialogPage = () => {
  const {
    title,
    chatId,
    avatar,
    isOnline,
    isPrivate,
    lastOnline,
    messagesIdx,
    messagesMap,
    handleSetRef,
    isUserMessage,
    handleAreaSend,
    handleAreaEditSend,
    handleMessageEdit,
    handleMessageRemove,
    isMessagesLoading,
    isDateDiff,
    getMessageTimeStamp
  } = useDialogPage();

  return (
    <section className={styles.dialog}>
      {isMessagesLoading && <Loader />}
      <DialogHeader
        avatar={avatar}
        title={title}
        lastOnline={lastOnline}
        isOnline={isOnline}
        className={styles.dialog__header}
      />
      <ul className={styles.dialog__messages}>
        {messagesIdx.map((msgId, idx) => (
          <>
            {isDateDiff(msgId) && (
              <p className={styles.dialog__date}>
                <span>
                  {yearFormatter.format(
                    new Date(messagesMap[msgId].created_at)
                  )}
                </span>
              </p>
            )}
            <Message
              dataIndex={msgId}
              files={messagesMap[msgId].files}
              isUserMessage={isUserMessage(msgId)}
              onDelete={handleMessageRemove}
              onEdit={handleMessageEdit}
              key={msgId + idx}
              message={messagesMap[msgId].text || TEXTS.empty}
              ref={(element) => handleSetRef(element)}
              author={
                !isPrivate
                  ? `${messagesMap[msgId].sender.first_name} ${messagesMap[msgId].sender.last_name}`
                  : undefined
              }
              voice={messagesMap[msgId].voice}
              status={
                messagesMap[msgId].was_read_by?.length
                  ? MessageStatuses.STATUS_READ
                  : MessageStatuses.STATUS_SEND
              }
              timeStamp={getMessageTimeStamp(msgId)}
            />
          </>
        ))}
      </ul>
      <MessageInput
        chatId={chatId}
        onSend={handleAreaSend}
        onEdit={handleAreaEditSend}
      />
    </section>
  );
};

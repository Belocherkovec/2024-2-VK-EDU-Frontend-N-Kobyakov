import { forwardRef } from 'react';
import cn from 'classnames';
import { Gallery, StatusMark, TMessageStatuses } from '@/shared';

import styles from './message.module.scss';
import { useMessage } from './hooks';

export interface IMessageProps {
  dataIndex?: string;
  isUserMessage?: boolean;
  message: string;
  status: TMessageStatuses;
  timeStamp: string;
  files?: { item: string }[];
  voice: string | null;
}

export const Message = forwardRef<HTMLLIElement, IMessageProps>(
  (props, ref) => {
    const {
      dataIndex,
      isUserMessage = false,
      message,
      status,
      timeStamp,
      files,
      voice
    } = props;
    const {
      imageClickId,
      isGalleryVisible,
      handleGalleryVisible,
      handleImageClick
    } = useMessage();

    return (
      <li
        className={cn(styles.message, isUserMessage && styles.message_user)}
        data-index={dataIndex}
        ref={ref}
      >
        {isGalleryVisible && (
          <Gallery
            isVisible={isGalleryVisible}
            images={files?.map((file) => file.item) || []}
            onClose={handleGalleryVisible}
            clickIndex={imageClickId.current}
          />
        )}
        <p className={styles.message__text}>{message}</p>
        <div className={styles.message__imageWrapper}>
          {files &&
            files.map(({ item }, id) => (
              <img
                src={item}
                key={item}
                alt="Пользовательская картинка"
                className={styles.message__image}
                onClick={() => handleImageClick(id)}
              />
            ))}
        </div>
        {voice && <audio src={voice} controls />}
        <div className={styles.message__info}>
          <span className={styles.message__timestamp}>{timeStamp}</span>
          {!isUserMessage && (
            <StatusMark className={styles.message__icon} status={status} />
          )}
        </div>
      </li>
    );
  }
);

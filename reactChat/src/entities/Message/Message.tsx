import { Gallery, LazyImage, StatusMark, TMessageStatuses } from '@/shared';
import cn from 'classnames';
import { forwardRef, useRef, useState } from 'react';

import styles from './message.module.scss';

export const Message = forwardRef<
  HTMLLIElement,
  {
    dataIndex?: string;
    isUserMessage?: boolean;
    message: string;
    status: TMessageStatuses;
    timeStamp: string;
    files?: { item: string }[];
  }
>(
  (
    { dataIndex, isUserMessage = false, message, status, timeStamp, files },
    ref
  ) => {
    const imageClickId = useRef(0);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);

    const handleGalleryVisible = () => setIsGalleryVisible(false);
    const handleImageClick = (event: React.MouseEvent<HTMLFieldSetElement>) => {
      const index = event.currentTarget.getAttribute('data-id');
      if (index) {
        imageClickId.current = +index;
        setIsGalleryVisible(true);
      }
    };

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
        <p className={styles.message__text}>{message.replace(/\n/g, '<br>')}</p>
        <div className={styles.message__imageWrapper}>
          {files &&
            files.map(({ item }, id) => (
              <LazyImage
                className={styles.message__image}
                src={item}
                alt="Пользовательское изображение"
                key={item}
                onClick={handleImageClick}
                data-id={id}
              />
            ))}
        </div>
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

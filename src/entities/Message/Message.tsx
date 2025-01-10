import { forwardRef } from 'react';
import cn from 'classnames';
import {
  ActionsMenu,
  Gallery,
  LazyImage,
  StatusMark,
  TEXTS,
  TMessageStatuses
} from '@/shared';

import styles from './message.module.scss';
import { useMessage } from './hooks';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

export interface IMessageProps {
  message: string;
  dataIndex: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  status: TMessageStatuses;
  timeStamp: string;
  voice: string | null;
  isUserMessage?: boolean;
  files?: { item: string }[];
  author?: string;
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
      voice,
      author
    } = props;
    const {
      isShowMenu,
      imageClickId,
      isGalleryVisible,
      closeMenu,
      handleEdit,
      handleDelete,
      toggleMenuShow,
      handleImageClick,
      handleGalleryVisible
    } = useMessage(props);

    return (
      <li
        className={cn(styles.message, isUserMessage && styles.message_user)}
        data-index={dataIndex}
        ref={ref}
        onPointerDown={toggleMenuShow}
        onContextMenu={toggleMenuShow}
      >
        <ActionsMenu
          isShow={isShowMenu}
          changeShow={closeMenu}
          className={styles.message__actions}
        >
          <button onClick={handleDelete}>
            <DeleteRounded />
            {TEXTS.message.delete}
          </button>
          <button onClick={handleEdit}>
            <EditRounded />
            {TEXTS.message.edit}
          </button>
        </ActionsMenu>
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
              <LazyImage
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
          {isUserMessage && author && (
            <span className={styles.message__timestamp}>{author}</span>
          )}
          <span className={styles.message__timestamp}>{timeStamp}</span>
          {!isUserMessage && (
            <StatusMark className={styles.message__icon} status={status} />
          )}
        </div>
      </li>
    );
  }
);

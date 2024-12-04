import cn from 'classnames';
import { ActionsMenu, Gallery, TEXTS, useFileInput } from '@/shared';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';

import { useMessageInput } from './hooks';
import { ImagePreview, LimitDialog } from './ui';
import styles from './messageInput.module.scss';

export interface IMessageInputProps {
  chatId: string;
  className?: string;
  onSend: (value: string, files?: File[], voice?: File) => void;
}

export const MessageInput: React.FC<IMessageInputProps> = (props) => {
  const { className } = props;
  const {
    files,
    value,
    FILES_LIMIT,
    imageClickId,
    isShowActions,
    isPopupVisible,
    isGalleryVisible,
    handleFilesChange,
    handleFileRemove,
    handleFileClick,
    handleKeyDown,
    handleSubmit,
    handleValueChange,
    handleActionGeo,
    handleShowActions,
    handlePopupOpen,
    handlePopupClose,
    handlePopupConfirm,
    handleGalleryClose
  } = useMessageInput(props);

  const { inputRef, handleChooseFile, handleFileChange } = useFileInput({
    accept: ['image/png', 'image/jpeg'],
    onChange: () => {},
    isMultiple: true,
    onMultipleFileChange: handleFilesChange
  });

  return (
    <>
      {!!files.length && (
        <div className={styles.attachments}>
          {files.map((file, id) => (
            <ImagePreview
              name={file.name}
              key={`${file.name}-${file.size}`}
              dataImageId={id.toString()}
              onClick={handleFileClick}
              onRemove={handleFileRemove}
            />
          ))}
        </div>
      )}
      <form
        action="/reactChat/public"
        autoComplete="off"
        className={cn(styles.form, className)}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
      >
        <LimitDialog
          imagesLimit={FILES_LIMIT}
          isVisible={isPopupVisible}
          onClose={handlePopupClose}
          onConfirm={handlePopupConfirm}
        />
        <Gallery
          isVisible={isGalleryVisible}
          images={files}
          onClose={handleGalleryClose}
          clickIndex={imageClickId}
        />
        <input
          type="file"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          className={styles.form__fileInput}
        />
        <ActionsMenu
          isShow={isShowActions}
          className={styles.form__actionsMenu}
        >
          <button
            type="button"
            className={styles.form__actionItem}
            onClick={handleActionGeo}
          >
            <LocationOnRoundedIcon className={styles.form__actionIcon} />
            <span>{TEXTS.pages.dialogPage.sendGeo}</span>
          </button>
          <button
            type="button"
            className={styles.form__actionItem}
            onClick={() =>
              files.length >= FILES_LIMIT
                ? handlePopupOpen(false, true)
                : handleChooseFile()
            }
          >
            <ImageRoundedIcon className={styles.form__actionIcon} />
            <span>{TEXTS.pages.dialogPage.image}</span>
          </button>
        </ActionsMenu>
        <button
          type="button"
          className={styles.form__file}
          onClick={handleShowActions}
        >
          <AttachFileRoundedIcon />
        </button>
        <textarea
          className={styles.form__input}
          name="message-text"
          onChange={handleValueChange}
          placeholder={TEXTS.placeholders.message}
          rows={1}
          value={value}
        ></textarea>
        <button
          className={cn(
            styles.form__button,
            value && styles.form__button_active
          )}
        >
          <SendRoundedIcon className={styles.form__icon} />
        </button>
      </form>
    </>
  );
};

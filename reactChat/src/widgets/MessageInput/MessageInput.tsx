import cn from 'classnames';
import { TEXTS, useFileInput } from '@/shared';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';

import { useMessageInput } from './hooks';
import styles from './messageInput.module.scss';
import { ActionsMenu, ImagePreview, LimitDialog } from './ui';

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
    isShowActions,
    isPopupVisible,
    FILES_LIMIT,
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
    handlePopupConfirm
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
        <input
          type="file"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          className={styles.form__fileInput}
        />
        <ActionsMenu
          className={styles.form__actionsMenu}
          isShow={isShowActions}
          onClickGeoAction={handleActionGeo}
          onClickPhotoAction={() =>
            files.length >= FILES_LIMIT
              ? handlePopupOpen(false, true)
              : handleChooseFile()
          }
        />
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

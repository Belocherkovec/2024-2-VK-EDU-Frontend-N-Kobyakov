import cn from 'classnames';
import { ActionsMenu, Gallery, TEXTS, useFileInput } from '@/shared';
import {
  AttachFileRounded,
  CloseRounded,
  ImageRounded,
  KeyboardVoiceRounded,
  LocationOnRounded,
  SendRounded,
  StopCircleRounded
} from '@mui/icons-material';

import { ConfirmDialog } from '@/features';
import { useMessageInput } from './hooks';
import { AudioPreview, ImagePreview } from './ui';
import styles from './messageInput.module.scss';

export interface IMessageInputProps {
  chatId: string;
  className?: string;
  onSend: (value?: string, files?: File[], voice?: Blob) => void;
  onEdit: (msgId: string, value: string) => void;
}

export const MessageInput: React.FC<IMessageInputProps> = (props) => {
  const { className } = props;
  const {
    voice,
    files,
    value,
    editMessageId,
    recorderRef,
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
    handleAudioRemove,
    handleGalleryClose,
    handleVoiceClick,
    handleEditClose
  } = useMessageInput(props);

  const { inputRef, handleChooseFile, handleFileChange } = useFileInput({
    accept: ['image/png', 'image/jpeg'],
    onChange: () => {},
    isMultiple: true,
    onMultipleFileChange: handleFilesChange
  });

  return (
    <>
      {!!files.length && !voice && (
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
      {!!voice && (
        <div className={styles.attachments}>
          <AudioPreview voice={voice} onRemove={handleAudioRemove} />
        </div>
      )}
      <form
        action="/public"
        autoComplete="off"
        className={cn(styles.form, className)}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
      >
        <ConfirmDialog
          confirmTitle={TEXTS.errors.defaultErrorTitle}
          confirmText={TEXTS.pages.dialogPage.imageLimit(FILES_LIMIT)}
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
          isShow={!voice && isShowActions}
          changeShow={handleShowActions}
          className={styles.form__actionsMenu}
        >
          <button
            type="button"
            onClick={handleActionGeo}
            aria-label={TEXTS.ariaLabels.sendGeo}
          >
            <LocationOnRounded />
            <span>{TEXTS.pages.dialogPage.sendGeo}</span>
          </button>
          <button
            type="button"
            aria-label={TEXTS.ariaLabels.addImages}
            onClick={() =>
              files.length >= FILES_LIMIT
                ? handlePopupOpen(false, true)
                : handleChooseFile()
            }
          >
            <ImageRounded />
            <span>{TEXTS.pages.dialogPage.image}</span>
          </button>
        </ActionsMenu>
        <button
          type="button"
          className={cn(
            styles.form__file,
            !voice && isShowActions && styles._isOpen
          )}
          onClick={handleShowActions}
          aria-label={TEXTS.ariaLabels.showActions}
        >
          <AttachFileRounded />
        </button>
        <button
          type="button"
          className={styles.form__voice}
          onClick={handleVoiceClick}
          aria-label={
            recorderRef.current
              ? TEXTS.ariaLabels.voiceMessageStop
              : TEXTS.ariaLabels.voiceMessageStart
          }
        >
          {recorderRef.current && <StopCircleRounded />}
          {!recorderRef.current && <KeyboardVoiceRounded />}
        </button>
        <div className={styles.form__editWrapper}>
          {editMessageId && (
            <span className={styles.form__edit}>{TEXTS.placeholders.edit}</span>
          )}
          <textarea
            className={cn(styles.form__input, editMessageId && styles._edit)}
            name="message-text"
            onChange={handleValueChange}
            placeholder={TEXTS.placeholders.message}
            rows={1}
            value={voice ? TEXTS.empty : value}
            disabled={!!voice}
          />
        </div>
        <button
          type="button"
          aria-label={TEXTS.ariaLabels.cancel}
          className={cn(
            styles.form__button,
            styles._edit,
            editMessageId && styles._active
          )}
          onClick={handleEditClose}
        >
          <CloseRounded className={styles.form__icon} />
        </button>
        <button
          aria-label={TEXTS.ariaLabels.sendMessage}
          className={cn(
            styles.form__button,
            (value || !!voice) && styles._active
          )}
        >
          <SendRounded className={styles.form__sendIcon} />
        </button>
      </form>
    </>
  );
};

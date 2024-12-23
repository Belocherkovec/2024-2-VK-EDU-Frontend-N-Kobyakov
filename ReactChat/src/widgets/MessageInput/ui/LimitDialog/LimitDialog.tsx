import { IPopupWindowProps, PopupWindow, TEXTS } from 'ReactChat/src/shared';

import styles from './limitDialog.module.scss';

export interface ILimitVisibleState {
  visible: boolean;
  cancelButton: boolean;
  confirmButton: boolean;
}

interface ILimitDialogProps
  extends Omit<IPopupWindowProps, 'children' | 'isVisible'> {
  imagesLimit: number;
  isVisible: ILimitVisibleState;
  onConfirm?: () => void;
}

export const LimitDialog: React.FC<ILimitDialogProps> = ({
  isVisible: { visible, cancelButton, confirmButton },
  onClose,
  onConfirm,
  imagesLimit
}) => (
  <PopupWindow
    isVisible={visible}
    onClose={onClose}
    className={styles.popup}
    contentClassName={styles.popup__content}
    title={TEXTS.errors.defaultErrorTitle}
  >
    <p>{TEXTS.pages.dialogPage.imageLimit(imagesLimit)}</p>
    <div className={styles.popup__buttonsWrapper}>
      {cancelButton && (
        <button
          className={styles.popup__cancel}
          type="button"
          onClick={onClose}
          aria-label={TEXTS.ariaLabels.cancel}
        >
          {TEXTS.pages.dialogPage.cancel}
        </button>
      )}
      {confirmButton && (
        <button
          aria-label={TEXTS.ariaLabels.confirm}
          className={styles.popup__confirm}
          type="button"
          onClick={onConfirm || onClose}
        >
          {TEXTS.pages.dialogPage.confirm}
        </button>
      )}
    </div>
  </PopupWindow>
);

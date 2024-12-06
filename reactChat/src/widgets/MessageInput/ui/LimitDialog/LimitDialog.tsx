import { IPopupWindowProps, PopupWindow, TEXTS } from '@/shared';

import styles from './LimitDialog.module.scss';

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
        >
          {TEXTS.pages.dialogPage.cancel}
        </button>
      )}
      {confirmButton && (
        <button
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

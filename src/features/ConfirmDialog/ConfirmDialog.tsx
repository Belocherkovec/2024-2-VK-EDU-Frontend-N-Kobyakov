import { IPopupWindowProps, PopupWindow, TEXTS } from '@/shared';

import styles from './confirmDialog.module.scss';

export interface ILimitVisibleState {
  visible: boolean;
  cancelButton: boolean;
  confirmButton: boolean;
}

interface ILimitDialogProps
  extends Omit<IPopupWindowProps, 'children' | 'isVisible'> {
  confirmTitle: string;
  confirmText: string;
  isVisible: ILimitVisibleState;
  actionText?: string;
  onConfirm?: () => void;
}

export const ConfirmDialog: React.FC<ILimitDialogProps> = ({
  isVisible: { visible, cancelButton, confirmButton },
  onClose,
  onConfirm,
  actionText,
  confirmTitle,
  confirmText
}) => (
  <PopupWindow
    isVisible={visible}
    onClose={onClose}
    className={styles.popup}
    contentClassName={styles.popup__content}
    title={confirmTitle}
  >
    <p>{confirmText}</p>
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
          {actionText || TEXTS.pages.dialogPage.confirm}
        </button>
      )}
    </div>
  </PopupWindow>
);

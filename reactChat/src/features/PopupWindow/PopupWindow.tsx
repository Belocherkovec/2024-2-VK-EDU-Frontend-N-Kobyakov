import { usePopupWindow } from '@/features/PopupWindow/hooks/usePopupWindow.ts';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './popupWindow.module.scss';

export const PopupWindow: React.FC<{
  children: ReactNode;
  className?: string;
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}> = ({ children, className, isVisible, onClose, title }) => {
  const { handleClose, stopPropagation } = usePopupWindow(onClose);

  return isVisible ? (
    <aside className={styles.overlay} onClick={handleClose}>
      <div className={cn(styles.popup, className)} onClick={stopPropagation}>
        <header className={styles.popup__header}>
          <h1>{title}</h1>
          <span className={styles.popup__close} onClick={onClose}>
            <CloseRoundedIcon />
          </span>
        </header>
        <main className={styles.popup__content}>{children}</main>
      </div>
    </aside>
  ) : (
    <></>
  );
};

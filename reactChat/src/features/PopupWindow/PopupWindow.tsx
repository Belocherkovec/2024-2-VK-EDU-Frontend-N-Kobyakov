import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import cn from 'classnames';
import { ReactNode } from 'react';

import { usePopupWindow } from './hooks';
import styles from './popupWindow.module.scss';

export interface IPopupWindowProps {
  children: ReactNode;
  className?: string;
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}

export const PopupWindow: React.FC<IPopupWindowProps> = (props) => {
  const { children, className, isVisible, onClose, title } = props;
  const { handleClose, stopPropagation } = usePopupWindow(props);

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

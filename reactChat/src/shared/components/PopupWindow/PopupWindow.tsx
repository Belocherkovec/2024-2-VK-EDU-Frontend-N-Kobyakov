import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import cn from 'classnames';
import { ReactNode } from 'react';

import { usePopupWindow } from './hooks';
import styles from './popupWindow.module.scss';

export interface IPopupWindowProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isTransparent?: boolean;
  isCloseFixed?: boolean;
}

export const PopupWindow: React.FC<IPopupWindowProps> = (props) => {
  const {
    children,
    className,
    contentClassName,
    isVisible,
    isCloseFixed,
    onClose,
    title,
    isTransparent,
    size = 'xs'
  } = props;
  const { handleClose, stopPropagation } = usePopupWindow(props);

  return isVisible ? (
    <aside className={styles.overlay} onClick={handleClose}>
      <div
        className={cn(
          styles.popup,
          !className && styles[`_${size}`],
          isTransparent && styles._isTransparent,
          className
        )}
        onClick={stopPropagation}
      >
        <header
          className={cn(
            styles.popup__header,
            isTransparent && styles._isTransparent
          )}
        >
          <h1>{title}</h1>
          <span
            className={cn(
              styles.popup__close,
              isTransparent && styles._isTransparent,
              isCloseFixed && styles._isFixed
            )}
            onClick={onClose}
          >
            <CloseRoundedIcon />
          </span>
        </header>
        <main className={cn(styles.popup__content, contentClassName)}>
          {children}
        </main>
      </div>
    </aside>
  ) : (
    <></>
  );
};

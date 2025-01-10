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
  background?: 'transparent';
  closeIconPosition?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
}

export const PopupWindow: React.FC<IPopupWindowProps> = (props) => {
  const {
    children,
    className,
    contentClassName,
    isVisible,
    onClose,
    title,
    background,
    closeIconPosition,
    size = 'xs'
  } = props;
  const { handleClose, stopPropagation } = usePopupWindow(props);

  if (!isVisible) return null;

  return (
    <aside className={styles.overlay} onClick={handleClose}>
      <div
        className={cn(
          styles.popup,
          !className && styles[`_${size}`],
          background && styles[`_${background}`],
          className
        )}
        onClick={stopPropagation}
      >
        <header
          className={cn(
            styles.popup__header,
            background && styles[`_${background}`]
          )}
        >
          <h1>{title}</h1>
          <span
            className={cn(
              styles.popup__close,
              background && styles[`_${background}`],
              closeIconPosition && styles[`_${closeIconPosition}`]
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
  );
};

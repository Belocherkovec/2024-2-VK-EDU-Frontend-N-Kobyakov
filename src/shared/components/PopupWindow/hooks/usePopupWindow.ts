import { useEffect } from 'react';
import { IPopupWindowProps } from '../PopupWindow';

export const usePopupWindow = (props: IPopupWindowProps) => {
  const { onClose, isVisible } = props;
  const handleClose = () => onClose();
  const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  return { handleClose, stopPropagation };
};

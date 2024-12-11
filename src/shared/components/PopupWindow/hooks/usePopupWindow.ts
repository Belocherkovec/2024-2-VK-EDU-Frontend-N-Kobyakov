import { useEffect } from 'react';
import { IPopupWindowProps } from '../PopupWindow';

export const usePopupWindow = (props: IPopupWindowProps) => {
  const { onClose } = props;
  const handleClose = () => onClose();
  const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, []);

  return { handleClose, stopPropagation };
};

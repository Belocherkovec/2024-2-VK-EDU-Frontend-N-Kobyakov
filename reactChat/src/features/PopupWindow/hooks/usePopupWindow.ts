import { useEffect } from 'react';

export const usePopupWindow = (onClose: () => void) => {
  const handleClose = () => onClose();
  const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { handleClose, stopPropagation };
};

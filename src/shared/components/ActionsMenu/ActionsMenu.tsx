import cn from 'classnames';
import styles from './actionsMenu.module.scss';
import { useEffect, useRef } from 'react';

interface IActionsMenuProps {
  className?: string;
  isShow: boolean;
  changeShow: () => void;
  children: React.ReactNode;
}

export const ActionsMenu: React.FC<IActionsMenuProps> = ({
  className,
  isShow,
  children,
  changeShow
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleShowChange = (event: PointerEvent) => {
    if (!containerRef.current?.contains(event.target as Node) && isShow) {
      changeShow();
    }
  };

  useEffect(() => {
    if (isShow) {
      document.addEventListener('pointerdown', handleShowChange);
    }

    return () => document.removeEventListener('pointerdown', handleShowChange);
  }, [isShow]);

  if (!isShow) {
    return null;
  }

  return (
    <div
      className={cn(className, styles.menu, isShow && styles._show)}
      ref={containerRef}
    >
      {children}
    </div>
  );
};

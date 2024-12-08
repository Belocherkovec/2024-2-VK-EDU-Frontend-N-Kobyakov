import cn from 'classnames';
import styles from './actionsMenu.module.scss';

interface IActionsMenuProps {
  className?: string;
  isShow: boolean;
  children: React.ReactNode;
}

export const ActionsMenu: React.FC<IActionsMenuProps> = ({
  className,
  isShow,
  children
}) => (
  <div className={cn(className, styles.menu, isShow && styles._show)}>
    {children}
  </div>
);

import cn from 'classnames';

import styles from './loader.module.scss';

export const Loader: React.FC<{ className?: string }> = ({ className }) => (
  <span className={cn(styles.loader, className)}></span>
);

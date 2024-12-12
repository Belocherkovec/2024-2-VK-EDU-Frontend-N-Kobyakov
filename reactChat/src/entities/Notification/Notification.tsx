import cn from 'classnames';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

import { useNotification } from './hooks';
import styles from './notification.module.scss';

export const Notification: React.FC = () => {
  const { notifications } = useNotification();

  return (
    <aside className={styles.notifications}>
      {notifications.map(({ title, type, message, key }) => (
        <div className={styles.notifications__notification} key={key}>
          <header className={styles.notifications__header}>
            {type === 'ERROR' && (
              <ErrorOutlineRoundedIcon className={styles._error} />
            )}
            <h2
              className={cn(
                styles.notifications__title,
                type === 'ERROR' && styles._error
              )}
            >
              {title}
            </h2>
          </header>
          <p className={styles.notifications__text}>{message}</p>
        </div>
      ))}
    </aside>
  );
};

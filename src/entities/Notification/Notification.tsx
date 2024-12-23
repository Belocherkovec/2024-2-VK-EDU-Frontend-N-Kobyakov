import cn from 'classnames';

import { useNotification } from './hooks';
import styles from './notification.module.scss';
import { NOTIFICATION_TYPES } from '@/entities/Notification/model';
import { CheckCircleRounded, ErrorRounded } from '@mui/icons-material';

export const Notification: React.FC = () => {
  const { notifications } = useNotification();

  return (
    <aside className={styles.notifications}>
      {notifications.map(({ title, type, message, key }) => (
        <div className={styles.notifications__notification} key={key}>
          <header className={styles.notifications__header}>
            {type === NOTIFICATION_TYPES.ERROR && (
              <ErrorRounded className={styles._error} />
            )}
            {type === NOTIFICATION_TYPES.SUCCESS && (
              <CheckCircleRounded className={styles._success} />
            )}
            <h2
              className={cn(
                styles.notifications__title,
                type === 'ERROR' && styles._error,
                type === 'SUCCESS' && styles._success
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

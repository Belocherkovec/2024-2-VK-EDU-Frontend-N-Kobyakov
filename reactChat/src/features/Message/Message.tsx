import { StatusMark } from '@/shared/components';
import { TMessageStatuses } from '@/shared/consts/statuses';
import cn from 'classnames';
import { forwardRef } from 'react';

import styles from './message.module.scss';

export const Message = forwardRef<
  HTMLLIElement,
  {
    dataIndex?: number;
    isUserMessage?: boolean;
    message: string;
    status: TMessageStatuses;
    timeStamp: string;
  }
>(({ dataIndex, isUserMessage = false, message, status, timeStamp }, ref) => (
  <li
    className={cn(styles.message, isUserMessage && styles.message_user)}
    data-index={dataIndex}
    ref={ref}
  >
    <p>{message.replace(/\n/g, '<br>')}</p>
    <div className={styles.message__info}>
      <span className={styles.message__timestamp}>{timeStamp}</span>
      <StatusMark className={styles.message__icon} status={status} />
    </div>
  </li>
));

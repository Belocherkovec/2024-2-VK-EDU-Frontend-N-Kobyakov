import cn from 'classnames';

import styles from './message.module.scss';

export const Message: React.FC<{
  isUserMessage?: boolean;
  message: string;
  timeStamp: string;
}> = ({ isUserMessage = false, message, timeStamp }) => (
  <li className={cn(styles.message, isUserMessage && styles.message_user)}>
    <p>{message.replace(/\n/g, '<br>')}</p>
    <span className={cn(styles.timestamp)}>{timeStamp}</span>
  </li>
);

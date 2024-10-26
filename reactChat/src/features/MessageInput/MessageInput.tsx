import SendRoundedIcon from '@mui/icons-material/SendRounded';
import cn from 'classnames';

import { UseMessageInput } from './hooks/useMessageInput.ts';
import styles from './messageInput.module.scss';

export const MessageInput: React.FC<{
  className?: string;
  onSend: (value: string) => void;
}> = ({ className, onSend }) => {
  const { handleKeyDown, handleSubmit, handleValueChange, value } =
    UseMessageInput(onSend);

  return (
    <form
      action="/"
      autoComplete="off"
      className={cn(styles.form, className)}
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.form__input}
        name="message-text"
        onChange={handleValueChange}
        rows={1}
        value={value}
      ></textarea>
      <button
        className={cn(styles.form__button, value && styles.form__button_active)}
      >
        <SendRoundedIcon className={styles.form__icon} />
      </button>
    </form>
  );
};

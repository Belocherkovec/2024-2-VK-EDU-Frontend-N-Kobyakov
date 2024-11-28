import { TEXTS } from '@/shared';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import cn from 'classnames';

import { useMessageInput } from './hooks';
import styles from './messageInput.module.scss';

export interface IMessageInputProps {
  chatId: string;
  className?: string;
  onSend: (value: string) => void;
}

export const MessageInput: React.FC<IMessageInputProps> = (props) => {
  const { className } = props;
  const { handleKeyDown, handleSubmit, handleValueChange, value } =
    useMessageInput(props);

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
        placeholder={TEXTS.placeholders.message}
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

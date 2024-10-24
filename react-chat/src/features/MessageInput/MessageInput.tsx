import SendRoundedIcon from '@mui/icons-material/SendRounded';
import cn from 'classnames';
import { useState } from 'react';

import styles from './messageInput.module.scss';

export const MessageInput: React.FC<{
  className?: string;
  onSend: (value: string) => void;
}> = ({ className, onSend }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSend(value);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    if (!e.shiftKey && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

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
        onChange={(e) => setValue(e.target.value)}
        placeholder="Сначала вы должны ввести имя"
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

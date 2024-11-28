import { TEXTS } from '@/shared';
import { useState } from 'react';
import { IMessageInputProps } from '@/features/MessageInput/MessageInput';

export const useMessageInput = (props: IMessageInputProps) => {
  const { chatId, onSend } = props;
  const [value, setValue] = useState(
    localStorage.getItem(chatId) || TEXTS.empty
  );

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    localStorage.setItem(chatId, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (value) {
      onSend(value);
      setValue(TEXTS.empty);
      localStorage.removeItem(chatId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    if (!e.shiftKey && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return {
    handleKeyDown,
    handleSubmit,
    handleValueChange,
    value
  };
};

import { TEXTS } from '@/shared/consts/texts';
import { useState } from 'react';

export const UseMessageInput = (
  onSend: (value: string) => void,
  chatId: string
) => {
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

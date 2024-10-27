import { TEXTS } from '@/shared/consts/texts.ts';
import { useState } from 'react';

export const UseMessageInput = (onSend: (value: string) => void) => {
  const [value, setValue] = useState(TEXTS.empty);

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSend(value);
    setValue(TEXTS.empty);
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

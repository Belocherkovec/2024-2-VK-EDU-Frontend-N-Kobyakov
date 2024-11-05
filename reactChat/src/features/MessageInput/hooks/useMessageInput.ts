import { Store } from '@/app/store';
import { TEXTS } from '@/shared/consts/texts';
import { useContext, useState } from 'react';

export const UseMessageInput = (
  onSend: (value: string) => void,
  chatId: number
) => {
  const {
    handleStoreUpdate,
    store: {
      chat: {
        [chatId]: { draftMessage }
      }
    }
  } = useContext(Store);

  const [value, setValue] = useState(draftMessage);

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    handleStoreUpdate(`chat.${chatId}.draftMessage`, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (value) {
      onSend(value);
      setValue(TEXTS.empty);
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

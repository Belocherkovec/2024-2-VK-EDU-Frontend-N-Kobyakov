import { TEXTS } from '@/shared/consts/texts.ts';
import { useEffect, useRef, useState } from 'react';

export const useSearchInput = (
  value?: string,
  onSearch?: (value: string) => void
) => {
  const [innerValue, setInnerValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInnerValue(e.target.value);
  };

  const handleKeyUp = () => {
    if (!onSearch) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(value || innerValue);
    }, 1000);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (onSearch) {
        onSearch(TEXTS.empty);
      }
    },
    []
  );

  return {
    handleChange,
    handleKeyUp,
    innerValue
  };
};

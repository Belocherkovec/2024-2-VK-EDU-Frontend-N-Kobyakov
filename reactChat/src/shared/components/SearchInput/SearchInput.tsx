import { useEffect, useRef, useState } from 'react';

import styles from './searchInput.module.scss';

export const SearchInput: React.FC<{
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  value?: string;
}> = ({ onChange, onSearch, placeholder = '', value, ...props }) => {
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
    },
    []
  );

  return (
    <input
      className={styles.search}
      name="search"
      onChange={onChange || handleChange}
      onKeyUp={handleKeyUp}
      placeholder={placeholder}
      type="text"
      value={value || innerValue}
      {...props}
    />
  );
};

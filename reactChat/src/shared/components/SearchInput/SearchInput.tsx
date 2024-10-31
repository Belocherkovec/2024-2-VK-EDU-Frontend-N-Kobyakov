import { TEXTS } from '@/shared/consts/texts.ts';

import { useSearchInput } from './hooks/useSearchInput.ts';
import styles from './searchInput.module.scss';

export const SearchInput: React.FC<{
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  value?: string;
}> = ({ onChange, onSearch, placeholder = TEXTS.empty, value, ...props }) => {
  const { handleChange, handleKeyUp, innerValue } = useSearchInput(
    value,
    onSearch
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
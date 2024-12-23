import { TEXTS } from '@/shared';

import { useSearchInput } from './hooks';
import styles from './searchInput.module.scss';

export const SearchInput: React.FC<{
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  value?: string;
  isAutocomplete?: boolean;
}> = ({
  onChange,
  onSearch,
  placeholder = TEXTS.empty,
  value,
  isAutocomplete,
  ...props
}) => {
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
      autoFocus
      value={value || innerValue}
      autoComplete={isAutocomplete ? 'on' : 'off'}
      {...props}
    />
  );
};

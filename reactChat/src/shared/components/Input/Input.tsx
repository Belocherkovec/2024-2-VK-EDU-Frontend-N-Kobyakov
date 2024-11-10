import { useInput } from '@/shared/components/Input/hooks/useInput';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import cn from 'classnames';

import styles from './input.module.scss';

interface IInputProps {
  className?: string;
  id?: string;
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onValidChange?: (value: boolean) => void;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  resize?: boolean;
  title?: string;
  type?: string;
  value?: string;
}

export const Input: React.FC<IInputProps> = ({
  className,
  id,
  isDisabled = false,
  isError = false,
  label,
  maxLength,
  minLength,
  name,
  onChange,
  onValidChange,
  pattern,
  placeholder,
  required = false,
  resize = false,
  title,
  type = 'text',
  value,
  ...props
}) => {
  const {
    errorMessages,
    handleBlur,
    handleChange,
    handleKeyUp,
    handleTypeChange,
    innerType,
    innerValue,
    inputRef,
    TagName
  } = useInput(type, onChange, onValidChange);

  return (
    <label className={styles.input}>
      <span className={cn(styles.input__label, required && styles._required)}>
        {label}
      </span>
      <TagName
        className={cn(
          styles.input__input,
          className,
          !resize && styles._resizeDisable,
          (errorMessages.length || isError) && styles._error,
          type === 'password' && styles._password
        )}
        id={id}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        type={innerType}
        value={value ?? innerValue}
        {...props}
        disabled={isDisabled}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        placeholder={placeholder}
        ref={inputRef}
        required={required}
        title={title}
      />
      {type === 'password' && (
        <button
          className={styles.input__changeShow}
          onClick={handleTypeChange}
          type="button"
        >
          {innerType === 'password' ? (
            <VisibilityRounded />
          ) : (
            <VisibilityOffRounded />
          )}
        </button>
      )}
      {errorMessages.map((message, idx) => (
        <span className={styles.input__errorMessage} key={idx}>
          {message}
        </span>
      ))}
    </label>
  );
};

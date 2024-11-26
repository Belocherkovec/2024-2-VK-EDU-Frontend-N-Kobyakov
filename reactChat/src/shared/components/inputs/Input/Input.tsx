import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import cn from 'classnames';
import React, { memo } from 'react';

import { useInput } from './hooks';
import styles from './input.module.scss';

interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onValidChange?: (name: string, value: boolean) => void;
  resize?: boolean;
}

const InputComponent: React.FC<IInputProps> = ({
  className,
  isDisabled = false,
  isError = false,
  label,
  onChange,
  onValidChange,
  required = false,
  resize = false,
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
  } = useInput({
    isError,
    onChange,
    onValidChange,
    type
  });

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
        disabled={isDisabled}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        ref={inputRef}
        required={required}
        type={innerType}
        value={value ?? innerValue}
        {...props}
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

export const Input = memo(InputComponent);

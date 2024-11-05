import { TEXTS } from '@/shared/consts/texts.ts';
import cn from 'classnames';
import { useState } from 'react';

import styles from './input.module.scss';

export const Input: React.FC<{
  className?: string;
  id?: string;
  isDisabled?: boolean;
  name?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  resize?: boolean;
  type?: string;
  value?: string;
}> = ({
  className,
  id,
  isDisabled = false,
  name,
  onChange,
  placeholder,
  resize = false,
  type = 'text',
  value,
  ...props
}) => {
  const [innerValue, setInnerValue] = useState(TEXTS.empty);

  const TagName = type === 'textarea' ? 'textarea' : 'input';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInnerValue(e.target.value);
  };

  return (
    <TagName
      className={cn(className, !resize && styles.resizeDisable)}
      id={id}
      name={name}
      onChange={onChange || handleChange}
      type={type}
      value={value || innerValue}
      {...props}
      disabled={isDisabled}
      placeholder={placeholder}
    />
  );
};

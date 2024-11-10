import { ErrorMessages, TEXTS } from '@/shared/consts';
import { IErrorMessages } from '@/shared/consts/errorMessages';
import { useRef, useState } from 'react';

interface IUseInputReturnProps {
  errorMessages: string[];
  handleBlur: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleKeyUp: () => void;
  handleTypeChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
  innerType: string;
  innerValue: string;
  inputRef: React.MutableRefObject<any>;
  TagName: 'input' | 'textarea';
}

export const useInput = (
  type: string = 'text',
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void,
  onValidChange?: (value: boolean) => void
): IUseInputReturnProps => {
  const [innerValue, setInnerValue] = useState(TEXTS.empty);
  const [innerType, setInnerType] = useState(type);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const inputRef = useRef<any>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const TagName = type === 'textarea' ? 'textarea' : 'input';

  const formValidate = () => {
    if (!inputRef.current) {
      return;
    }

    const errors = inputRef.current.validity;
    const errorMessages: string[] = [];

    Object.entries(ErrorMessages).forEach(([errorType, getErrorMessage]) => {
      if (errors[errorType as keyof IErrorMessages]) {
        errorMessages.push(getErrorMessage(inputRef.current));
      }
    });

    if (onValidChange) {
      onValidChange(!errorMessages.length);
    }

    setErrorMessages(errorMessages);
  };

  const handleBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    formValidate();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (onChange) {
      onChange(e);
    }

    setInnerValue(e.target.value);
  };

  const handleTypeChange = () => {
    if (innerType === 'text') {
      setInnerType('password');
    } else {
      setInnerType('text');
    }
  };

  const handleKeyUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      formValidate();
    }, 1000);
  };

  return {
    errorMessages,
    handleBlur,
    handleChange,
    handleKeyUp,
    handleTypeChange,
    innerType,
    innerValue,
    inputRef,
    TagName
  };
};

import { ErrorMessages, TEXTS } from '@/shared/consts';
import { IErrorMessages } from '@/shared/consts/errorMessages';
import { useRef, useState } from 'react';

interface IUseInputReturnProps {
  errorMessages: string[];
  handleBlur: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleTypeChange: () => void;
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
  const TagName = type === 'textarea' ? 'textarea' : 'input';

  const [innerValue, setInnerValue] = useState(TEXTS.empty);
  const [innerType, setInnerType] = useState(type);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const inputRef = useRef<any>(null);

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

  const handleBlur = () => formValidate();

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

  return {
    errorMessages,
    handleBlur,
    handleChange,
    handleTypeChange,
    innerType,
    innerValue,
    inputRef,
    TagName
  };
};

import { useRef, useState } from 'react';

import { ErrorMessages, IErrorMessages, TEXTS } from '../../../../consts';

interface IUseInputProps {
  isError: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onValidChange?: (name: string, value: boolean) => void;
  type?: string;
}

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

export const useInput = ({
  isError,
  onChange,
  onValidChange,
  type = 'text'
}: IUseInputProps): IUseInputReturnProps => {
  const TIMEOUT = 500;
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
    const innerErrorMessages: string[] = [];

    Object.entries(ErrorMessages).forEach(([errorType, getErrorMessage]) => {
      if (errors[errorType as keyof IErrorMessages]) {
        innerErrorMessages.push(getErrorMessage(inputRef.current));
      }
    });

    if (
      JSON.stringify(innerErrorMessages) !== JSON.stringify(errorMessages) ||
      !!innerErrorMessages.length !== isError
    ) {
      if (onValidChange) {
        onValidChange(inputRef.current.name, !innerErrorMessages.length);
      }

      setErrorMessages(innerErrorMessages);
    }
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
    }, TIMEOUT);
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

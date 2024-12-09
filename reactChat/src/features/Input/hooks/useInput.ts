import { useRef, useState } from 'react';

import { ErrorMessages, KErrorMessages, TEXTS } from '@/shared';

interface IUseInputProps {
  isError: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyUp?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onValidChange?: (name: string, value: boolean) => void;
  type?: string;
  patternMessage?: string;
}

interface IUseInputReturnProps {
  errorMessages: string[];
  handleBlur: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFocus: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleKeyUp: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
  type = 'text',
  patternMessage,
  onKeyUp,
  onBlur,
  onFocus
}: IUseInputProps): IUseInputReturnProps => {
  const TIMEOUT = 500;
  const [innerValue, setInnerValue] = useState(TEXTS.empty);
  const [innerType, setInnerType] = useState(type);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const isInputFocus = useRef<boolean>(false);
  const inputRef = useRef<any>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const TagName = type === 'textarea' ? 'textarea' : 'input';

  const formValidate = () => {
    if (!inputRef.current) {
      return;
    }

    let errors = inputRef.current.validity;
    const innerErrorMessages: string[] = [];

    Object.entries(ErrorMessages).forEach(([errorType, getErrorMessage]) => {
      const getPropWithKey = (key: KErrorMessages): string => {
        let result;
        if (key === 'patternMismatch' && patternMessage) {
          result = getErrorMessage({ title: patternMessage });
        } else if (key === 'valueMissing') {
          result = isInputFocus.current
            ? null
            : getErrorMessage(inputRef.current);
        } else {
          result = getErrorMessage(inputRef.current);
        }
        return result;
      };

      if (errors[errorType as KErrorMessages]) {
        const errorProp = getPropWithKey(errorType as KErrorMessages);
        errorProp && innerErrorMessages.push(errorProp);
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

    errors = null;
  };

  const handleBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (onBlur) {
      onBlur(event);
    }

    isInputFocus.current = false;
    formValidate();
  };

  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onFocus) {
      onFocus(event);
    }

    isInputFocus.current = true;
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

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (onKeyUp) {
      onKeyUp(event);
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
    handleFocus,
    innerType,
    innerValue,
    inputRef,
    TagName
  };
};

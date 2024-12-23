import { convertBytesToHuman, TEXTS, validateImageFile } from '@/shared';
import { useRef, useState } from 'react';

export interface IUseFileInputProps {
  accept?: string[];
  file?: File | null;
  onChange: (file: File | null) => void;
  onError?: () => void;
  onMultipleFileChange?: (file: File[]) => void;
  isValid?: (state: boolean) => void;
  isMultiple?: boolean;
  isResetOnEmpty?: boolean;
  isResetOnError?: boolean;
}

export const useFileInput = (props: IUseFileInputProps) => {
  const {
    file,
    accept,
    isValid,
    isMultiple,
    isResetOnEmpty,
    isResetOnError,
    onError,
    onChange,
    onMultipleFileChange
  } = props;
  const isOnlyImages = accept?.every((acceptRule) =>
    acceptRule.startsWith('image/')
  );
  const fileName = file?.name || TEXTS.noFile;
  const fileSize = convertBytesToHuman(file?.size || 0);
  const [isError, setError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const filesArr: FileList = event.target.files;

      if (!isMultiple) {
        handleSingleFileChange(filesArr[0]);
      } else if (onMultipleFileChange) {
        handleMultipleFileChange([...filesArr]).then((res) => {
          onMultipleFileChange(res);
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        });
      }
    } else if (isResetOnEmpty) {
      handleResetFile();
    }
  };

  const handleMultipleFileChange = async (files: File[]) => {
    const validationResults = await Promise.all(
      files.map(async (file) => {
        const isAllowedType = accept ? accept.includes(file.type) : true;
        if (!isAllowedType) return null;

        try {
          if (isOnlyImages) {
            const isValidImage = await validateImageFile(file);
            return isValidImage ? file : null;
          }
          return file;
        } catch {
          return null;
        }
      })
    );

    return validationResults.filter((file): file is File => file !== null);
  };

  const handleSingleFileChange = (innerFile: File) => {
    if (accept && !accept.includes(innerFile.type)) {
      handleError();
    } else if (props.isValid) {
      props.isValid(true);
      setError(false);
    }

    if (isOnlyImages) {
      validateImageFile(innerFile)
        .then(() => onChange(innerFile))
        .catch(() => handleError());
    }
  };

  const handleResetFile = () => {
    onChange(null);
    setError(false);
    if (isValid) {
      isValid(true);
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleError = () => {
    onChange(null);

    if (isResetOnError) {
      handleResetFile();
    } else {
      setError(true);
    }

    if (onError) {
      onError();
    }

    if (props.isValid) {
      props.isValid(false);
    }
  };

  return {
    fileName,
    fileSize,
    handleChooseFile,
    handleFileChange,
    handleResetFile,
    inputRef,
    isError
  };
};

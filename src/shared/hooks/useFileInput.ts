import { convertBytesToHuman, TEXTS, validateImageFile } from '@/shared';
import { useRef, useState } from 'react';

export interface IUseFileInputProps {
  accept?: string[];
  file?: File | null;
  onChange: (file: File | null) => void;
  onMultipleFileChange?: (file: File[]) => void;
  isValid?: (state: boolean) => void;
  isMultiple?: boolean;
}

export const useFileInput = (props: IUseFileInputProps) => {
  const { accept, file, onChange, isValid, isMultiple, onMultipleFileChange } =
    props;
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
      props.onChange(null);
      setError(true);
      props.isValid && props.isValid(false);
    } else if (props.isValid) {
      props.isValid(true);
      setError(false);
    }

    if (isOnlyImages) {
      validateImageFile(innerFile)
        .then(() => props.onChange(innerFile))
        .catch(() => {
          props.onChange(null);
          setError(true);
          props.isValid && props.isValid(false);
        });
    }
  };

  const handleResetFile = () => {
    onChange(null);
    setError(false);
    isValid && isValid(true);
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

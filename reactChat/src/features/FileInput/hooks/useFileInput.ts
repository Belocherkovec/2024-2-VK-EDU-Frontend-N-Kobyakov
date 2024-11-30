import { useRef, useState } from 'react';

import { ALLOWED_IMG_TYPES, convertBytesToHuman, TEXTS } from '@/shared';
import { IFileInputProps } from '../FileInput';

export const useFileInput = (props: IFileInputProps) => {
  const isOnlyImages = props.accept?.some((acceptRule) =>
    acceptRule.startsWith('image/')
  );
  const fileName = props.file?.name || TEXTS.noFile;
  const fileSize = convertBytesToHuman(props.file?.size || 0);

  const [isError, setError] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];

      if (!ALLOWED_IMG_TYPES.includes(file.type)) {
        setError(true);
        props.isValid && props.isValid(false);
      } else if (props.isValid) {
        props.isValid(true);
        setError(false);
      }
      props.onChange(event.target.files[0]);
    }
  };

  const handleResetFile = () => {
    props.onChange(null);
    setError(false);
    props.isValid && props.isValid(true);
  };

  return {
    fileName,
    fileSize,
    handleChooseFile,
    handleFileChange,
    handleResetFile,
    inputRef,
    isOnlyImages,
    isError
  };
};

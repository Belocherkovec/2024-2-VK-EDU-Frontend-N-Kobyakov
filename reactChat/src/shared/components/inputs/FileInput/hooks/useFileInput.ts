import { useRef } from 'react';

import { TEXTS } from '../../../../consts';
import { convertBytesToHuman } from '../../../../utils';
import { IFileInputProps } from '../FileInput';

export const useFileInput = (props: IFileInputProps) => {
  const fileName = props.file?.name || TEXTS.noFile;
  const fileSize = convertBytesToHuman(props.file?.size || 0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      props.onChange(event.target.files[0]);
    }
  };

  const handleResetFile = () => props.onChange(null);

  return {
    fileName,
    fileSize,
    handleChooseFile,
    handleFileChange,
    handleResetFile,
    inputRef
  };
};

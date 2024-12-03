import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app';
import {
  GEOLOCATION_ERRORS,
  GeolocationErrorType,
  getGeo,
  TEXTS
} from '@/shared';
import { pushNotification } from '@/entities/Notification';

import { IMessageInputProps } from '../MessageInput';
import { ILimitVisibleState } from '../ui';

export const useMessageInput = (props: IMessageInputProps) => {
  const { onSend } = props;
  const FILES_LIMIT = 5;

  const dispatch = useDispatch<AppDispatch>();
  const tempFiles = useRef<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(TEXTS.empty);
  const [files, setFiles] = useState<File[]>([]);
  const [isShowActions, setIsShowAction] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState<ILimitVisibleState>({
    visible: false,
    cancelButton: false,
    confirmButton: false
  });

  const handleShowActions = () => {
    setIsShowAction((prev) => !prev);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    if (!e.shiftKey && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handlePopupOpen = (cancelButton = false, confirmButton = false) =>
    setIsPopupVisible({ visible: true, cancelButton, confirmButton });

  const handlePopupClose = (event?: React.MouseEvent) => {
    setIsPopupVisible((prev) => ({ ...prev, visible: false }));

    if (event && isPopupVisible.cancelButton) {
      tempFiles.current = [];
    }
  };

  const handlePopupConfirm = () => {
    setFiles((prev) => {
      const newFiles: File[] = [...tempFiles.current];

      tempFiles.current = [];

      return [...prev, ...newFiles].slice(0, FILES_LIMIT);
    });

    handlePopupClose();
  };

  const handleLimitClose = () => {
    tempFiles.current = [];
    handlePopupClose();
  };

  const handleActionGeo = () => {
    const handleGetGeo = ({
      coords: { latitude, longitude }
    }: GeolocationPosition) => {
      onSend(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
      setIsShowAction(false);
    };
    const handleErrorGeo = (error: GeolocationPositionError) => {
      dispatch(
        pushNotification({
          title: TEXTS.utils.geo.errorTitle,
          message:
            TEXTS.utils.geo[
              GEOLOCATION_ERRORS[error.code as GeolocationErrorType]
            ],
          lifeTime: 3000,
          type: 'ERROR'
        })
      );
    };

    getGeo(handleGetGeo, handleErrorGeo);
    setIsShowAction(false);
  };

  const handleFilesChange = (file: File[]) => {
    let isUseTemp = false;
    if (file.length > FILES_LIMIT || file.length + files.length > FILES_LIMIT) {
      handlePopupOpen(true, true);
      isUseTemp = true;
    }

    let curFileIndex = 0;
    const newFilesState: File[] = [];
    while (newFilesState.length < FILES_LIMIT && curFileIndex < file.length) {
      newFilesState.push(file[curFileIndex++]);
    }

    if (isUseTemp) {
      tempFiles.current = newFilesState;
    } else {
      setFiles((prev) => [...prev, ...newFilesState]);
    }

    setIsShowAction(false);
  };

  const handleFileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('handleFilesChange', e.target);
  };

  const handleFileRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const button = e.target as HTMLButtonElement;
    const imageId = button.getAttribute('data-image-id');

    if (imageId) {
      setFiles((prev) => prev.filter((_, idx) => idx !== +imageId));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (value) {
      onSend(value, files.length ? files : undefined);
      setValue(TEXTS.empty);
    }
  };

  return {
    FILES_LIMIT,
    value,
    isShowActions,
    fileInputRef,
    isPopupVisible,
    handlePopupOpen,
    handlePopupClose,
    handlePopupConfirm,
    handleLimitClose,
    handleKeyDown,
    handleSubmit,
    handleValueChange,
    handleFilesChange,
    handleFileRemove,
    handleFileClick,
    handleShowActions,
    handleActionGeo,
    files
  };
};

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'ReactChat/src/app';
import {
  GEOLOCATION_ERRORS,
  GeolocationErrorType,
  getGeo,
  recordAudio,
  TEXTS
} from 'ReactChat/src/shared';
import { pushNotification } from 'ReactChat/src/entities/Notification';

import { IMessageInputProps } from '../MessageInput';
import { ILimitVisibleState } from '../ui';

export const useMessageInput = (props: IMessageInputProps) => {
  const { onSend } = props;
  const FILES_LIMIT = 5;

  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState(TEXTS.empty);

  const tempFiles = useRef<File[]>([]);
  const recorderRef = useRef<{
    mediaRecorder: MediaRecorder;
    stop: () => void;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [voice, setVoice] = useState<Blob>();
  const [isVoiceRecord, setIsVoiceRecord] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [imageClickId, setImageClickId] = useState<number>(0);

  const [isShowActions, setIsShowAction] = useState(false);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
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

  const handleGalleryClose = () => {
    setIsGalleryVisible(false);
    setImageClickId(0);
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
    const element = e.target as HTMLDivElement;
    const imageId = element.getAttribute('data-image-id');

    if (imageId) {
      setImageClickId(+imageId);
    }

    setIsGalleryVisible(true);
  };

  const handleFileRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const button = e.target as HTMLButtonElement;
    const imageId = button.getAttribute('data-image-id');

    if (imageId) {
      setFiles((prev) => prev.filter((_, idx) => idx !== +imageId));
    }
  };

  const handleVoiceClick = () => {
    if (!recorderRef.current) {
      recordAudio().then((res) => {
        if (!(res instanceof Error)) {
          recorderRef.current = res;
          recorderRef.current.mediaRecorder.ondataavailable =
            handleDataAvailable;
          recorderRef.current.mediaRecorder.start();
          setIsVoiceRecord(true);
        }
      });
    } else {
      recorderRef.current.stop();
      setIsVoiceRecord(false);
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (recorderRef.current) {
      setVoice(event.data);
      recorderRef.current.stop();
      recorderRef.current = null;
    }
  };

  const handleAudioRemove = () => setVoice(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (value) {
      onSend(value, files.length ? files : undefined);
      setValue(TEXTS.empty);
      setFiles([]);
    }
    if (voice) {
      onSend(undefined, undefined, voice);
      setVoice(undefined);
    }
  };

  return {
    voice,
    files,
    value,
    FILES_LIMIT,
    fileInputRef,
    imageClickId,
    isShowActions,
    isVoiceRecord,
    isPopupVisible,
    isGalleryVisible,
    recorderRef,
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
    handleGalleryClose,
    handleAudioRemove,
    handleShowActions,
    handleActionGeo,
    handleVoiceClick
  };
};

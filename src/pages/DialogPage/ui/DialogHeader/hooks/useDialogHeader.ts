import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ILimitVisibleState } from '@/features';
import { deleteChat, RoutePaths, TEXTS } from '@/shared';
import { AppDispatch } from '@/app';
import { NOTIFICATION_TYPES, pushNotification } from '@/entities/Notification';
import { removeChat } from '@/entities/Chat';

export const useDialogHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const params = useParams<{ chatId: string }>();
  const { chatId = TEXTS.empty } = params;
  const [isShowActions, setIsShowActions] = useState<boolean>(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState<ILimitVisibleState>({
    visible: false,
    cancelButton: true,
    confirmButton: true
  });

  const toggleShowActions = () => setIsShowActions(!isShowActions);

  const handleConfirmDeleteChat = () => {
    deleteChat(chatId)
      .then(() => {
        handleIsConfirmVisibleChange();
        dispatch(removeChat(chatId));
        dispatch(
          pushNotification({
            title: TEXTS.pages.dialogPage.successTitle,
            message: TEXTS.empty,
            type: NOTIFICATION_TYPES.SUCCESS,
            lifeTime: 5000
          })
        );
        navigate(RoutePaths.chatsPage);
      })
      .catch(() => {
        dispatch(
          pushNotification({
            title: TEXTS.pages.dialogPage.errorTitle,
            message: TEXTS.empty,
            type: NOTIFICATION_TYPES.ERROR,
            lifeTime: 5000
          })
        );
      });
  };

  const handleIsConfirmVisibleChange = () =>
    setIsConfirmVisible({
      ...isConfirmVisible,
      visible: !isConfirmVisible.visible
    });

  return {
    isShowActions,
    isConfirmVisible,
    toggleShowActions,
    handleConfirmDeleteChat,
    handleIsConfirmVisibleChange
  };
};

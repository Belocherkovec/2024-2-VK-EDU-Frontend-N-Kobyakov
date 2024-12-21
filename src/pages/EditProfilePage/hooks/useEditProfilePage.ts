import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '@/app';
import { pushNotification } from '@/entities/Notification';
import {
  fetchCurrentUser,
  selectUserInfo,
  setUserUnauthorized
} from '@/entities/User';
import { ILimitVisibleState } from '@/features';
import {
  IUserReadInfo,
  RoutePaths,
  TEXTS,
  updateUser,
  deleteUser
} from '@/shared';

export const useEditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUserInfo = useSelector(selectUserInfo);

  const [avatar, setAvatar] = useState<string | null>(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState<ILimitVisibleState>({
    visible: false,
    cancelButton: true,
    confirmButton: true
  });
  const [userReadInfo, setUserReadInfo] = useState<IUserReadInfo>(
    {} as IUserReadInfo
  );
  const [isFormValid, setIsFormValid] = useState({
    username: true,
    first_name: true,
    last_name: true,
    bio: true
  });

  useEffect(() => {
    if (userReadInfo.avatar) {
      const url = URL.createObjectURL(userReadInfo.avatar);
      setAvatar(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (currentUserInfo.avatar) {
      setAvatar(currentUserInfo.avatar);
    } else {
      setAvatar(null);
    }
  }, [userReadInfo.avatar]);

  useEffect(() => {
    setUserReadInfo({
      username: currentUserInfo.username,
      first_name: currentUserInfo.first_name,
      last_name: currentUserInfo.last_name,
      avatar: null,
      bio: currentUserInfo.bio
    });
  }, [currentUserInfo]);

  const isDisabled = useMemo(() => {
    return !(
      Object.values(isFormValid).every((field) => field) &&
      userReadInfo.first_name &&
      userReadInfo.last_name &&
      userReadInfo.username
    );
  }, [isFormValid, userReadInfo]);

  const handleIsConfirmVisibleChange = () =>
    setIsConfirmVisible({
      ...isConfirmVisible,
      visible: !isConfirmVisible.visible
    });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    dispatch(setUserUnauthorized());
    navigate(RoutePaths.authPage);
  };
  const handleConfirmDeleteAccount = () => {
    deleteUser(currentUserInfo.id)
      .then(() => {
        handleLogout();
      })
      .catch(() => {
        pushNotification({
          title: TEXTS.pages.editProfilePage.errorTitle,
          message: TEXTS.pages.editProfilePage.errorRemoveAccount,
          type: 'ERROR',
          lifeTime: 3000
        });
      });
  };

  const handleAvatarChange = (file: File | null) => {
    setUserReadInfo({ ...userReadInfo, avatar: file });
  };
  const handleAvatarReset = () => {
    setUserReadInfo({ ...userReadInfo, avatar: null });
    setAvatar(null);
  };

  const handleFormValidChange = useCallback((name: string, value: boolean) => {
    setIsFormValid((prev) => ({ ...prev, [name]: value }));
  }, []);
  const handleUserReadInfoChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      setUserReadInfo((prev) => ({ ...prev, [name]: value }));
    },
    []
  );
  const handleReset = () => {
    setUserReadInfo({
      username: currentUserInfo.username,
      first_name: currentUserInfo.first_name,
      last_name: currentUserInfo.last_name,
      avatar: null,
      bio: currentUserInfo.bio
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append('username', userReadInfo.username);
    sendData.append('first_name', userReadInfo.first_name);
    sendData.append('last_name', userReadInfo.last_name);

    if (userReadInfo.avatar) {
      sendData.append('avatar', userReadInfo.avatar);
    } else if (!avatar) {
      sendData.append('avatar', TEXTS.empty);
    }
    if (userReadInfo.bio) {
      sendData.append('bio', userReadInfo.bio);
    }

    updateUser(currentUserInfo.id, sendData)
      .then(() => {
        dispatch(
          pushNotification({
            title: TEXTS.pages.editProfilePage.successTitle,
            message: TEXTS.pages.editProfilePage.successMessage,
            type: 'ERROR',
            lifeTime: 3000
          })
        );
        dispatch(fetchCurrentUser());
      })
      .catch(() => {
        dispatch(
          pushNotification({
            title: TEXTS.pages.editProfilePage.errorTitle,
            message: TEXTS.pages.editProfilePage.errorMessage,
            type: 'ERROR',
            lifeTime: 3000
          })
        );
      });
  };

  const handleLoadAvatarError = () => {
    dispatch(
      pushNotification({
        title: TEXTS.pages.editProfilePage.avatarUpdateErrorTitle,
        message: TEXTS.pages.editProfilePage.avatarUpdateErrorMessage,
        type: 'ERROR',
        lifeTime: 5000
      })
    );
  };

  return {
    avatar,
    isDisabled,
    isFormValid,
    userReadInfo,
    isConfirmVisible,
    handleLogout,
    handleSubmit,
    handleReset,
    handleAvatarReset,
    handleAvatarChange,
    handleFormValidChange,
    handleLoadAvatarError,
    handleUserReadInfoChange,
    handleConfirmDeleteAccount,
    handleIsConfirmVisibleChange
  };
};

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '@/entities/User';
import { IUser } from '@/shared';
import { AppDispatch } from '@/app';
import { pushNotification } from '@/entities/Notification';

type IUserReadInfo = Omit<
  IUser,
  'id' | 'is_online' | 'last_online_at' | 'avatar'
> & {
  avatar: File | null;
};

export const useEditProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserInfo = useSelector(selectUserInfo);

  const [avatar, setAvatarUrl] = useState<string | null>(null);
  const [userReadInfo, setUserReadInfo] = useState<IUserReadInfo>(
    {} as IUserReadInfo
  );

  useEffect(() => {
    if (userReadInfo.avatar) {
      const url = URL.createObjectURL(userReadInfo.avatar);
      setAvatarUrl(url);

      return () => {
        URL.revokeObjectURL(url); // Очистка при размонтировании
      };
    } else if (currentUserInfo.avatar) {
      setAvatarUrl(currentUserInfo.avatar);
    } else {
      setAvatarUrl(null);
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

  const handleAvatarChange = (file: File | null) => {
    setUserReadInfo({ ...userReadInfo, avatar: file });
  };

  const handleLoadAvatarError = () => {
    dispatch(
      pushNotification({
        title: 'Ошибка при попытке загрузить изображение.',
        message: 'Пожалуйста загрузите корректное изображение!',
        type: 'ERROR',
        lifeTime: 5000
      })
    );
  };

  return {
    avatar,
    userReadInfo,
    handleAvatarChange,
    handleLoadAvatarError
  };
};

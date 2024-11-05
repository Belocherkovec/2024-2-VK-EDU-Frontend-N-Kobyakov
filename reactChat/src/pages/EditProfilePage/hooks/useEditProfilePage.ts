import { Store } from '@/app/store';
import { generator } from '@/shared/consts';
import { TEXTS } from '@/shared/consts/texts';
import { IReactChat } from '@/shared/types';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useEditProfilePage = () => {
  const navigate = useNavigate();
  const params = useParams<{ profileId: string }>();
  const { profileId = TEXTS.empty } = params;

  const {
    handleStoreUpdate,
    store: { chat }
  } = useContext(Store);

  const profile = chat[profileId] || {};
  const [avatar, setAvatar] = useState(profile.avatar);
  const [fullName, setFullName] = useState(profile.fullName);
  const [userName, setUserName] = useState(profile.userName);
  const [bio, setBio] = useState(profile.bio || TEXTS.empty);

  const updateStateMap = {
    bio: setBio,
    fullName: setFullName,
    userName: setUserName
  };

  const handleFormChange = (
    key: keyof typeof updateStateMap,
    value: string
  ) => {
    if (updateStateMap[key]) {
      updateStateMap[key](value);
    }
  };

  const handleClickAvatar = () => {
    const avatar = generator.generateRandomAvatar();

    setAvatar(avatar);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSave = () => {
    if (profileId !== 'create') {
      handleStoreUpdate(`chat.${profileId}`, {
        ...profile,
        avatar,
        bio,
        fullName,
        userName
      });
    } else {
      const userId = Object.keys(chat).length + 1;

      const newProfile: IReactChat = {
        avatar,
        bio,
        draftMessage: TEXTS.empty,
        fullName,
        messages: [],
        userId,
        userName
      };
      handleStoreUpdate(`chat.${userId}`, newProfile);

      navigate(`/profile/edit/${userId}`, { replace: true });
    }
  };

  return {
    avatar,
    bio,
    fullName,
    handleClickAvatar,
    handleFormChange,
    handleSave,
    handleSubmit,
    userName
  };
};

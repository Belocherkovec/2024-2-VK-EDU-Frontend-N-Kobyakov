import { EditRounded } from '@mui/icons-material';
import { Header } from '@/features';
import {
  ALLOWED_IMG_TYPES,
  Avatar,
  BackButton,
  TEXTS,
  useFileInput
} from '@/shared';

import { useEditProfilePage } from './hooks';
import styles from './EditProfilePage.module.scss';

export const EditProfilePage = () => {
  const { avatar, userReadInfo, handleAvatarChange, handleLoadAvatarError } =
    useEditProfilePage();
  const { handleChooseFile, handleFileChange, inputRef } = useFileInput({
    onChange: handleAvatarChange,
    onError: handleLoadAvatarError,
    accept: ALLOWED_IMG_TYPES,
    isResetOnEmpty: true,
    isResetOnError: true
  });
  return (
    <>
      <Header
        leftNode={<BackButton />}
        theme="colored"
        centerNode={TEXTS.pages.editProfilePage.title}
      />
      <section className={styles.profile}>
        <button className={styles.userAvatar} onClick={handleChooseFile}>
          <div className={styles.userAvatar__hoverWrapper}>
            <EditRounded className={styles.userAvatar__icon} />
          </div>
          <input
            accept={ALLOWED_IMG_TYPES.join(',')}
            className={styles.userAvatar__input}
            onChange={handleFileChange}
            ref={inputRef}
            type="file"
          />
          <Avatar
            src={avatar}
            firstName={userReadInfo.first_name}
            lastName={userReadInfo.last_name}
            isHideOnline
            className={styles.userAvatar__avatar}
          />
        </button>
      </section>
    </>
  );
};

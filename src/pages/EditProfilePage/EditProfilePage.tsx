import {
  EditRounded,
  DeleteForeverRounded,
  LogoutRounded
} from '@mui/icons-material';
import { ConfirmDialog, Header, Input } from '@/features';
import {
  ALLOWED_IMG_TYPES,
  Avatar,
  BackButton,
  TEXTS,
  useFileInput
} from '@/shared';

import { useEditProfilePage } from './hooks';
import styles from './editProfilePage.module.scss';
import cn from 'classnames';

export const EditProfilePage = () => {
  const {
    avatar,
    isDisabled,
    isFormValid,
    userReadInfo,
    isConfirmVisible,
    handleReset,
    handleLogout,
    handleSubmit,
    handleAvatarReset,
    handleAvatarChange,
    handleFormValidChange,
    handleLoadAvatarError,
    handleUserReadInfoChange,
    handleConfirmDeleteAccount,
    handleIsConfirmVisibleChange
  } = useEditProfilePage();
  const { handleChooseFile, handleFileChange, inputRef } = useFileInput({
    onChange: handleAvatarChange,
    onError: handleLoadAvatarError,
    accept: ALLOWED_IMG_TYPES,
    isResetOnEmpty: true,
    isResetOnError: true
  });
  return (
    <>
      <ConfirmDialog
        confirmTitle={TEXTS.pages.editProfilePage.confirmTitle}
        confirmText={TEXTS.pages.editProfilePage.confirmMessage}
        isVisible={isConfirmVisible}
        onClose={handleIsConfirmVisibleChange}
        onConfirm={handleConfirmDeleteAccount}
      />
      <Header
        leftNode={<BackButton />}
        theme="colored"
        centerNode={TEXTS.pages.editProfilePage.title}
      />
      <section className={styles.profile}>
        <div className={styles.profile__avatarWrapper}>
          <button className={styles.userAvatar} onClick={handleChooseFile}>
            <div className={styles.userAvatar__hoverWrapper}>
              <EditRounded className={styles.userAvatar__icon} />
            </div>
            <Avatar
              src={avatar}
              firstName={userReadInfo.first_name}
              lastName={userReadInfo.last_name}
              isHideOnline
              className={styles.userAvatar__avatar}
            />
          </button>
          <button
            className={styles.profile__removeButton}
            onClick={handleAvatarReset}
          >
            {TEXTS.pages.editProfilePage.remove}
          </button>
        </div>
        <form
          autoComplete="off"
          className={styles.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            accept={ALLOWED_IMG_TYPES.join(',')}
            className={styles.userAvatar__input}
            onChange={handleFileChange}
            ref={inputRef}
            type="file"
          />
          <Input
            required
            name="username"
            pattern="^[\w.@+\-]+$"
            minLength={3}
            value={userReadInfo.username}
            isError={!isFormValid.username}
            onChange={handleUserReadInfoChange}
            onValidChange={handleFormValidChange}
            label={TEXTS.pages.registration.login}
            placeholder={TEXTS.pages.registration.loginPlaceholder}
            patternMessage={TEXTS.pages.registration.UsernameMismatchError}
          />
          <Input
            required
            name="first_name"
            value={userReadInfo.first_name}
            isError={!isFormValid.first_name}
            onChange={handleUserReadInfoChange}
            onValidChange={handleFormValidChange}
            label={TEXTS.pages.registration.firstName}
            placeholder={TEXTS.pages.registration.firstNamePlaceholder}
          />
          <Input
            required
            name="last_name"
            value={userReadInfo.last_name}
            isError={!isFormValid.last_name}
            onChange={handleUserReadInfoChange}
            onValidChange={handleFormValidChange}
            label={TEXTS.pages.registration.lastName}
            placeholder={TEXTS.pages.registration.lastNamePlaceholder}
          />
          <Input
            name="bio"
            type="textarea"
            className={styles.form__area}
            value={userReadInfo.bio || ''}
            isError={!isFormValid.bio}
            label={TEXTS.pages.registration.bio}
            onChange={handleUserReadInfoChange}
            onValidChange={handleFormValidChange}
            placeholder={TEXTS.pages.registration.bioPlaceholder}
          />
          <div className={styles.form__buttonsWrapper}>
            <div className={styles.form__buttonsGroup}>
              <button
                className={cn(
                  styles.form__button,
                  isDisabled && styles._disabled
                )}
                disabled={isDisabled}
              >
                {TEXTS.pages.editProfilePage.save}
              </button>
              <button
                className={styles.form__transparentButton}
                type="button"
                onClick={handleReset}
              >
                {TEXTS.pages.editProfilePage.reset}
              </button>
            </div>
            <div className={styles.form__buttonsGroup}>
              <button
                type="button"
                className={styles.form__removeButton}
                onClick={handleIsConfirmVisibleChange}
              >
                <DeleteForeverRounded />
                {TEXTS.pages.editProfilePage.deleteAccount}
              </button>
              <button
                type="button"
                className={styles.form__transparentButton}
                onClick={handleLogout}
              >
                <LogoutRounded />
                {TEXTS.pages.editProfilePage.logout}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

import { ALLOWED_IMG_TYPES, TEXTS } from 'ReactChat/src/shared';
import { FileInput, Input, UserInfo } from 'ReactChat/src/features';
import cn from 'classnames';

import { useRegistrationForm } from './hooks';
import styles from './registrationForm.module.scss';

export const RegistrationForm = () => {
  const {
    avatar,
    formValues: { bio, firstName, lastName, password, username },
    handleAvatarChange,
    handleFormChange,
    handleFormValidChange,
    handleSubmit,
    isDisabled,
    isFormValid,
    registrationErrors,
    handleAvatarErrorChange
  } = useRegistrationForm();

  return (
    <form
      autoComplete="off"
      className={styles.form}
      noValidate
      onSubmit={handleSubmit}
    >
      {!!registrationErrors.length && (
        <div className={cn(styles.form__errorBlock)}>
          {registrationErrors.map((error) => (
            <p className={styles.form__error} key={error}>
              {error}
            </p>
          ))}
        </div>
      )}
      <div className={styles.form__userPreview}>
        <p>{TEXTS.pages.registration.preview}</p>
        <UserInfo
          avatar={avatar ? URL.createObjectURL(avatar) : null}
          title={`${firstName} ${lastName}`}
          bio={bio}
          className={styles.form__userInfo}
        />
      </div>
      <fieldset className={styles.form__group}>
        <Input
          isError={!!registrationErrors.length || !isFormValid.username}
          label={TEXTS.pages.registration.login}
          minLength={3}
          name={'username'}
          onChange={handleFormChange}
          onValidChange={handleFormValidChange}
          pattern="^[\w.@+\-]+$"
          required
          patternMessage={TEXTS.pages.registration.UsernameMismatchError}
          value={username}
          placeholder={TEXTS.pages.registration.loginPlaceholder}
        />
        <Input
          isError={!!registrationErrors.length || !isFormValid.firstName}
          label={TEXTS.pages.registration.firstName}
          name={'firstName'}
          onChange={handleFormChange}
          onValidChange={handleFormValidChange}
          required
          value={firstName}
          placeholder={TEXTS.pages.registration.firstNamePlaceholder}
        />
        <Input
          isError={!!registrationErrors.length || !isFormValid.lastName}
          label={TEXTS.pages.registration.lastName}
          name={'lastName'}
          onChange={handleFormChange}
          onValidChange={handleFormValidChange}
          required
          value={lastName}
          placeholder={TEXTS.pages.registration.lastNamePlaceholder}
        />
        <Input
          className={styles.form__area}
          isError={!isFormValid.bio}
          label={TEXTS.pages.registration.bio}
          name={'bio'}
          onChange={handleFormChange}
          onValidChange={handleFormValidChange}
          type="textarea"
          value={bio}
          placeholder={TEXTS.pages.registration.bioPlaceholder}
        />
        <FileInput
          accept={ALLOWED_IMG_TYPES}
          file={avatar}
          label={TEXTS.pages.registration.avatar}
          onChange={handleAvatarChange}
          isValid={handleAvatarErrorChange}
        />
      </fieldset>
      <fieldset className={styles.form__group}>
        <Input
          isError={!!registrationErrors.length || !isFormValid.password}
          label={TEXTS.pages.registration.password}
          minLength={8}
          name="password"
          onChange={handleFormChange}
          onValidChange={handleFormValidChange}
          required
          type="password"
          pattern="^(?!\d+$).+"
          patternMessage={TEXTS.pages.registration.PasswordMismatchError}
          value={password}
          placeholder={TEXTS.pages.registration.passwordPlaceholder}
        />
      </fieldset>
      <button
        className={cn(styles.form__button, isDisabled() && styles._disabled)}
        disabled={isDisabled()}
      >
        {TEXTS.pages.registration.action}
      </button>
    </form>
  );
};

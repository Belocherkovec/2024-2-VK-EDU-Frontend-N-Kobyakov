import { FileInput, Input, TEXTS } from '@/shared';
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
    isRegistrationError
  } = useRegistrationForm();

  return (
    <form
      autoComplete="off"
      className={styles.form}
      noValidate
      onSubmit={handleSubmit}
    >
      {isRegistrationError && (
        <span className={styles.form__error}>{TEXTS.errors.loginError}</span>
      )}
      <fieldset className={styles.form__group}>
        <Input
          isError={isRegistrationError || !isFormValid.username}
          label={TEXTS.pages.registration.login}
          minLength={3}
          name={'username'}
          onChange={handleFormChange}
          onValidChange={handleFormValidChange}
          pattern="^[a-zA-Z0-9]+$"
          required
          value={username}
        />
        <Input
          isError={isRegistrationError || !isFormValid.firstName}
          label={TEXTS.pages.registration.firstName}
          name={'firstName'}
          onChange={handleFormChange}
          onValidChange={handleFormValidChange}
          required
          value={firstName}
        />
        <Input
          isError={isRegistrationError || !isFormValid.lastName}
          label={TEXTS.pages.registration.lastName}
          name={'lastName'}
          onChange={handleFormChange}
          onValidChange={handleFormValidChange}
          required
          value={lastName}
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
        />
        <FileInput
          accept="image/*"
          file={avatar}
          label={TEXTS.pages.registration.avatar}
          onChange={handleAvatarChange}
        />
      </fieldset>
      <fieldset className={styles.form__group}>
        <Input
          isError={isRegistrationError || !isFormValid.password}
          label={TEXTS.pages.registration.password}
          minLength={3}
          name="password"
          onChange={handleFormChange}
          onValidChange={handleFormValidChange}
          required
          type="password"
          value={password}
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

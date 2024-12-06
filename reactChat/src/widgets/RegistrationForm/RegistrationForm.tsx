import { FileInput, Input, TEXTS } from '@/shared';
import cn from 'classnames';

import { useRegistrationForm } from './hooks';
import styles from './registrationForm.module.scss';
import { UserInfo } from '@/widgets/DialogHeader/ui';

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
        />
        <Input
          isError={!!registrationErrors.length || !isFormValid.firstName}
          label={TEXTS.pages.registration.firstName}
          name={'firstName'}
          onChange={handleFormChange}
          onValidChange={handleFormValidChange}
          required
          value={firstName}
        />
        <Input
          isError={!!registrationErrors.length || !isFormValid.lastName}
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
          accept={['image/png', 'image/jpeg']}
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
        />
      </fieldset>
      <div className={styles.form__userPreview}>
        <p>{TEXTS.pages.registration.preview}</p>
        <UserInfo
          avatar={null}
          file={avatar || undefined}
          title={`${firstName} ${lastName}`}
          bio={bio}
          className={styles.form__userInfo}
        />
      </div>
      <button
        className={cn(styles.form__button, isDisabled() && styles._disabled)}
        disabled={isDisabled()}
      >
        {TEXTS.pages.registration.action}
      </button>
    </form>
  );
};

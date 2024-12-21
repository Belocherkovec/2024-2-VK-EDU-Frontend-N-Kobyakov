import { TEXTS } from '@/shared';
import { Input } from '@/features';
import cn from 'classnames';

import styles from './authForm.module.scss';
import { useAuthForm } from './hooks';

export const AuthForm: React.FC = () => {
  const {
    formValues: { login, password },
    handleFormChange,
    handleFormValidChange,
    handleSubmit,
    isDisabled,
    isFormValid,
    isLoginError
  } = useAuthForm();

  return (
    <form
      autoComplete="off"
      className={styles.form}
      noValidate
      onSubmit={handleSubmit}
    >
      {isLoginError && (
        <span className={styles.form__error}>{TEXTS.errors.loginError}</span>
      )}
      <Input
        isError={isLoginError || !isFormValid.login}
        label={TEXTS.pages.auth.login}
        minLength={3}
        name="login"
        onChange={handleFormChange}
        onValidChange={handleFormValidChange}
        required
        value={login}
        placeholder={TEXTS.pages.auth.loginPlaceholder}
      />
      <Input
        isError={isLoginError || !isFormValid.password}
        label={TEXTS.pages.auth.password}
        minLength={8}
        name="password"
        onChange={handleFormChange}
        onValidChange={handleFormValidChange}
        required
        type="password"
        value={password}
        placeholder={TEXTS.pages.auth.passwordPlaceholder}
      />
      <button
        aria-label={TEXTS.ariaLabels.auth}
        className={cn(styles.form__button, isDisabled && styles._disabled)}
        disabled={isDisabled}
      >
        {TEXTS.pages.auth.action}
      </button>
    </form>
  );
};

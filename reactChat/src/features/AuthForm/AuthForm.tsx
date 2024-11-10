import { Input } from '@/shared/components';
import { TEXTS } from '@/shared/consts';
import cn from 'classnames';

import styles from './authForm.module.scss';
import { useAuthForm } from './hooks/useAuthForm';

export const AuthForm: React.FC = () => {
  const {
    formValues,
    handleFormChange,
    handleFormValidChange,
    handleSubmit,
    isDisabled,
    isLoginError
  } = useAuthForm();

  return (
    <form action="/" className={styles.form} noValidate onSubmit={handleSubmit}>
      {isLoginError && (
        <span className={styles.form__error}>{TEXTS.errors.loginError}</span>
      )}
      <Input
        isError={isLoginError}
        label={TEXTS.pages.auth.login}
        minLength={3}
        onChange={(e) => handleFormChange('login', e.target.value)}
        onValidChange={(value) => handleFormValidChange('login', value)}
        required
        value={formValues.login}
      />
      <Input
        isError={isLoginError}
        label={TEXTS.pages.auth.password}
        minLength={3}
        onChange={(e) => handleFormChange('password', e.target.value)}
        onValidChange={(value) => handleFormValidChange('password', value)}
        required
        type="password"
        value={formValues.password}
      />
      <button
        className={cn(styles.form__button, isDisabled() && styles._disabled)}
        disabled={isDisabled()}
      >
        {TEXTS.pages.auth.action}
      </button>
    </form>
  );
};

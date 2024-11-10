import { Input } from '@/shared/components';
import { TEXTS } from '@/shared/consts';
import cn from 'classnames';
import { useState } from 'react';

import styles from './authForm.module.scss';

export const AuthForm: React.FC = () => {
  const [isLoginValid, setIsLoginValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form action="/" className={styles.form} noValidate onSubmit={handleSubmit}>
      <Input
        label={TEXTS.pages.auth.login}
        minLength={3}
        onValidChange={setIsLoginValid}
        required
      />
      <Input
        label={TEXTS.pages.auth.password}
        minLength={3}
        onValidChange={setIsPasswordValid}
        required
        type={'password'}
      />
      <button
        className={cn(
          styles.form__button,
          !(isLoginValid && isPasswordValid) && styles._disabled
        )}
        disabled={!(isLoginValid && isPasswordValid)}
      >
        {TEXTS.pages.auth.action}
      </button>
    </form>
  );
};

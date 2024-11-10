import { AuthForm } from '@/features';
import Logo from '@/shared/icons/Logo.svg?react';

import styles from './ authPage.module.scss';

export const AuthPage: React.FC = () => (
  <section className={styles.auth}>
    <Logo className={styles.auth__logo} />
    <h1 className={styles.auth__title}>Авторизация в Simple Chat</h1>
    <AuthForm />
  </section>
);

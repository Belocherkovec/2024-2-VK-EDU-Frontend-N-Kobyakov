import { Logo, RoutePaths, TextLink, TEXTS } from 'ReactChat/src/shared';
import { AuthForm } from 'ReactChat/src/widgets';

import styles from './authPage.module.scss';

export const AuthPage: React.FC = () => (
  <section className={styles.auth}>
    <Logo className={styles.auth__logo} />
    <h1 className={styles.auth__title}>{TEXTS.pages.auth.title}</h1>
    <AuthForm />
    <TextLink
      label={TEXTS.pages.auth.noAccount}
      linkText={TEXTS.pages.auth.toRegistration}
      src={RoutePaths.registrationPage}
    />
  </section>
);

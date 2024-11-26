import { TextLink } from '@/shared/components';
import { RoutePaths, TEXTS } from '@/shared/consts';
import { Logo } from '@/shared/icons';
import { AuthForm } from '@/widgets';

import styles from './authPage.module.scss';

export const AuthPage: React.FC = () => (
  <section className={styles.auth}>
    <Logo className={styles.auth__logo} />
    <h1 className={styles.auth__title}>{TEXTS.pages.auth.title}</h1>
    <AuthForm />
    <TextLink
      isReplace
      label={TEXTS.pages.auth.noAccount}
      linkText={TEXTS.pages.auth.toRegistration}
      src={RoutePaths.registrationPage}
    />
  </section>
);

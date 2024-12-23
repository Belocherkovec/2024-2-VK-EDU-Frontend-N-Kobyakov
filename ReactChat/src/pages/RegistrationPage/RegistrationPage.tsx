import { Logo, RoutePaths, TextLink, TEXTS } from 'ReactChat/src/shared';
import { RegistrationForm } from 'ReactChat/src/widgets';

import styles from './registrationPage.module.scss';

export const RegistrationPage: React.FC = () => (
  <section className={styles.registration}>
    <Logo className={styles.registration__logo} />
    <h1 className={styles.registration__title}>
      {TEXTS.pages.registration.title}
    </h1>
    <RegistrationForm />
    <TextLink
      label={TEXTS.pages.registration.hasAccount}
      linkText={TEXTS.pages.registration.toAuth}
      src={RoutePaths.authPage}
    />
  </section>
);

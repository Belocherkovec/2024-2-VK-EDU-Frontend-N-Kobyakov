import { TextLink } from '@/shared/components';
import { RoutePaths, TEXTS } from '@/shared/consts';
import { Logo } from '@/shared/icons';
import { RegistrationForm } from '@/widgets';

import styles from './registrationPage.module.scss';

export const RegistrationPage: React.FC = () => (
  <section className={styles.registration}>
    <Logo className={styles.registration__logo} />
    <h1 className={styles.registration__title}>
      {TEXTS.pages.registration.title}
    </h1>
    <RegistrationForm />
    <TextLink
      isReplace
      label={TEXTS.pages.registration.hasAccount}
      linkText={TEXTS.pages.registration.toAuth}
      src={RoutePaths.authPage}
    />
  </section>
);

import { selectIsAuthenticated } from '@/entities/User';
import { AuthForm } from '@/features';
import { RoutePaths } from '@/shared/consts';
import Logo from '@/shared/icons/Logo.svg?react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './authPage.module.scss';

export const AuthPage: React.FC = () => {
  const isAuthorized = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate(RoutePaths.chatsPage);
    }
  }, []);

  return (
    <section className={styles.auth}>
      <Logo className={styles.auth__logo} />
      <h1 className={styles.auth__title}>Авторизация в Simple Chat</h1>
      <AuthForm />
    </section>
  );
};

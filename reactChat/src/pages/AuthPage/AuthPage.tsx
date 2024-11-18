import { selectUserIsAuthenticated } from '@/entities/User/model';
import { AuthForm } from '@/features';
import { RoutePaths } from '@/shared/consts';
import Logo from '@/shared/icons/Logo.svg?react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './authPage.module.scss';

export const AuthPage: React.FC = () => {
  const isAuthorized = useSelector(selectUserIsAuthenticated);
  const navigate = useNavigate();

  const lastVisitedUrl: null | string =
    sessionStorage.getItem('lastVisitedUrl');

  useEffect(() => {
    const from =
      lastVisitedUrl &&
      lastVisitedUrl !== '/' &&
      lastVisitedUrl !== '/2024-2-VK-EDU-Frontend-N-Kobyakov/'
        ? lastVisitedUrl
        : RoutePaths.chatsPage;

    if (isAuthorized) {
      navigate(from, { replace: true });
    }
  }, [isAuthorized]);

  return (
    <section className={styles.auth}>
      <Logo className={styles.auth__logo} />
      <h1 className={styles.auth__title}>Авторизация в Simple Chat</h1>
      <AuthForm />
    </section>
  );
};

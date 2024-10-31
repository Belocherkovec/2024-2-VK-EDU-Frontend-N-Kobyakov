import { TEXTS } from '@/shared/consts/texts';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

import styles from './errorPage.module.scss';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = `Error ${error.status}: ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'Unknown error occurred';
  }

  return (
    <section className={styles.error}>
      <ErrorOutlineRoundedIcon className={styles.icon} />
      <h1>{TEXTS.pages.errorPage.title}</h1>
      <p className={styles.error__details}>
        <i>{errorMessage}</i>
      </p>
      <Link className={styles.error__button} to={'/'}>
        Вернуться на главную
      </Link>
    </section>
  );
};

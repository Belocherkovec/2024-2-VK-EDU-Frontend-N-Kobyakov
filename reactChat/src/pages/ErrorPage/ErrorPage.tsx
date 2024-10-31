import { TEXTS } from '@/shared/consts/texts';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import cn from 'classnames';
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
      <p>{TEXTS.pages.errorPage.callToAction}</p>
      <button
        className={styles.error__button}
        onClick={() => {
          localStorage.clear();
        }}
      >
        {TEXTS.buttons.clearStorage}
      </button>
      <Link className={cn(styles.error__button, styles._noAccent)} to={'/'}>
        {TEXTS.buttons.toMain}
      </Link>
    </section>
  );
};

import { ErrorOutlineRounded } from '@mui/icons-material';
import { RoutePaths, TEXTS } from '@/shared';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './errorPage.module.scss';
import { useErrorPage } from './hooks';

export const ErrorPage: React.FC = () => {
  const { errorMessage, handleClearButtonClick } = useErrorPage();

  return (
    <section className={styles.error}>
      <ErrorOutlineRounded className={styles.icon} />
      <h1>{TEXTS.pages.errorPage.title}</h1>
      <p className={styles.error__details}>
        <i>{errorMessage}</i>
      </p>
      <p>{TEXTS.pages.errorPage.callToAction}</p>
      <button
        aria-label={TEXTS.ariaLabels.clearStorage}
        className={styles.error__button}
        onClick={handleClearButtonClick}
      >
        {TEXTS.buttons.clearStorage}
      </button>
      <Link
        className={cn(styles.error__button, styles._noAccent)}
        to={RoutePaths.chatsPage}
      >
        {TEXTS.buttons.toMain}
      </Link>
    </section>
  );
};

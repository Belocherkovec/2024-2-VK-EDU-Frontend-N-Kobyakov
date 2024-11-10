import { useErrorPage } from '@/pages/ErrorPage/hooks/useErrorPage';
import { RoutePaths } from '@/shared/consts';
import { TEXTS } from '@/shared/consts/texts';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './errorPage.module.scss';

export const ErrorPage: React.FC = () => {
  const { errorMessage, handleClearButtonClick } = useErrorPage();

  return (
    <section className={styles.error}>
      <ErrorOutlineRoundedIcon className={styles.icon} />
      <h1>{TEXTS.pages.errorPage.title}</h1>
      <p className={styles.error__details}>
        <i>{errorMessage}</i>
      </p>
      <p>{TEXTS.pages.errorPage.callToAction}</p>
      <button className={styles.error__button} onClick={handleClearButtonClick}>
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

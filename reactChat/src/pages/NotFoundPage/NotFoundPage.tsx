import { TEXTS } from '@/shared/consts/texts';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { Link } from 'react-router-dom';

import styles from './notFoundPage.module.scss';

export const NotFoundPage = () => (
  <section className={styles.page}>
    <SearchOffRoundedIcon className={styles.icon} />
    <h1>{TEXTS.pages.notFound.title}</h1>
    <p className={styles.page__subtitle}>{TEXTS.pages.notFound.subtitle}</p>
    <Link className={styles.page__button} to={'/'}>
      Вернуться на главную
    </Link>
  </section>
);

import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.overflow}>
    <span className={styles.loader}></span>
  </div>
);

import { Link } from 'react-router-dom';

import styles from './textLink.module.scss';

interface ITextLinkProps {
  isReplace?: boolean;
  label?: string;
  linkText: string;
  src: string;
}

export const TextLink: React.FC<ITextLinkProps> = ({
  isReplace,
  label,
  linkText,
  src
}) => (
  <p className={styles.link}>
    {label}&nbsp;
    <Link className={styles.link__text} replace={isReplace} to={src}>
      {linkText}
    </Link>
  </p>
);

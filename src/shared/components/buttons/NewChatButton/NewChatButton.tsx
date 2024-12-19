import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AddRounded } from '@mui/icons-material';

import { RoutePaths, TEXTS } from '../../../consts';
import styles from './newChatButton.module.scss';

export const NewChatButton: React.FC<{
  className?: string;
}> = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RoutePaths.createChatPage);
  };

  return (
    <button
      className={cn(styles.button, className)}
      onClick={handleClick}
      aria-label={TEXTS.ariaLabels.createNewChat}
    >
      <AddRounded className={styles.icon} />
    </button>
  );
};

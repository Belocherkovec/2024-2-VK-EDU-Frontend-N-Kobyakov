import { RoutePaths } from '@/shared/consts';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './newChatButton.module.scss';

export const NewChatButton: React.FC<{
  className?: string;
}> = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RoutePaths.createChatPage);
  };

  return (
    <button className={cn(styles.button, className)} onClick={handleClick}>
      <AddRoundedIcon className={styles.icon} />
    </button>
  );
};

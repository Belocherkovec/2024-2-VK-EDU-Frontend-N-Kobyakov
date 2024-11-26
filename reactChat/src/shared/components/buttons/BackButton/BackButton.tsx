import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { TEXTS } from '../../../consts';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC<{
  className?: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
  isReplace?: boolean;
}> = ({ className = TEXTS.empty, onClick, to, isReplace }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else if (to) {
      navigate(to, { replace: isReplace });
    } else {
      history.back();
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      <ArrowBackIosRoundedIcon />
    </button>
  );
};

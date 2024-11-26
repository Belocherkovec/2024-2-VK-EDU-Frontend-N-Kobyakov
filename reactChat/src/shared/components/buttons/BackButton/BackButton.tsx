import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { TEXTS } from '../../../consts';

export const BackButton: React.FC<{
  className?: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ className = TEXTS.empty, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
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

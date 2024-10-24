import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export const BackButton: React.FC<{
  className?: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ className = '', onClick }) => (
  <button className={className} onClick={onClick || history.back}>
    <ArrowBackIosRoundedIcon />
  </button>
);

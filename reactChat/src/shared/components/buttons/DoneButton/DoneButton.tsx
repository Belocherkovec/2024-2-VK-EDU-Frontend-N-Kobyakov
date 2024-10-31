import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

export const DoneButton: React.FC<{
  className?: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ className, onClick }) => (
  <button className={className} onClick={onClick}>
    <DoneRoundedIcon />
  </button>
);

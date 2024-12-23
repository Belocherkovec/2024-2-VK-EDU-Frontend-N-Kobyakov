import { DoneRounded } from '@mui/icons-material';
import { TEXTS } from '@/shared/index';

export const DoneButton: React.FC<{
  className?: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ className, onClick }) => (
  <button
    className={className}
    onClick={onClick}
    aria-label={TEXTS.ariaLabels.saveChanges}
  >
    <DoneRounded />
  </button>
);

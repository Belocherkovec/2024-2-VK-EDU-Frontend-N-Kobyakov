import { SearchRounded } from '@mui/icons-material';
import { TEXTS } from '@/shared/index';

export const SearchButton: React.FC<{
  className?: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ className = '', onClick }) => (
  <button
    className={className}
    onClick={onClick}
    aria-label={TEXTS.ariaLabels.search}
  >
    <SearchRounded />
  </button>
);

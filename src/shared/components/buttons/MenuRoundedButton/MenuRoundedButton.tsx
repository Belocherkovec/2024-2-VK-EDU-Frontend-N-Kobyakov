import { MenuRounded } from '@mui/icons-material';
import { TEXTS } from '@/shared';

interface IMenuRoundedButtonProps {
  onClick?: () => void;
  className?: string;
}

export const MenuRoundedButton: React.FC<IMenuRoundedButtonProps> = ({
  onClick,
  className
}) => (
  <button
    aria-label={TEXTS.ariaLabels.openMenu}
    className={className}
    onClick={onClick}
  >
    <MenuRounded />
  </button>
);

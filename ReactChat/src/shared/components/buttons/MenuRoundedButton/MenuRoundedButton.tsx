import { MenuRounded } from '@mui/icons-material';
import { TEXTS } from 'ReactChat/src/shared/index';

export const MenuRoundedButton: React.FC = () => (
  <button aria-label={TEXTS.ariaLabels.openMenu}>
    <MenuRounded />
  </button>
);

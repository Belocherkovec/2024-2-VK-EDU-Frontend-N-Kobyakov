import { Store } from '@/app/store';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import { useContext } from 'react';

import styles from './swapButton.module.scss';

export const SwapButton: React.FC = () => {
  const {
    handleStoreUpdate,
    store: { isInverted }
  } = useContext(Store);

  const handleClick = () => {
    handleStoreUpdate('isInverted', !isInverted);
  };

  return (
    <button className={isInverted ? styles.active : ''} onClick={handleClick}>
      <SwapHorizRoundedIcon />
    </button>
  );
};

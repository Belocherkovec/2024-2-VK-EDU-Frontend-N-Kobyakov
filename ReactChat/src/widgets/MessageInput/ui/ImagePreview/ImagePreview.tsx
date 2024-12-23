import { CloseRounded } from '@mui/icons-material';

import styles from './imagePreview.module.scss';
import { TEXTS } from 'ReactChat/src/shared';

interface IImagePreviewProps {
  name: string;
  dataImageId: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ImagePreview: React.FC<IImagePreviewProps> = ({
  name,
  dataImageId,
  onClick,
  onRemove
}) => (
  <div
    onClick={onClick}
    className={styles.imagePreview}
    data-image-id={dataImageId}
  >
    <p className={styles.imagePreview__text}>{name}</p>
    <button
      onClick={onRemove}
      className={styles.imagePreview__button}
      data-image-id={dataImageId}
      aria-label={TEXTS.ariaLabels.removeFile}
    >
      <CloseRounded className={styles.imagePreview__icon} />
    </button>
  </div>
);

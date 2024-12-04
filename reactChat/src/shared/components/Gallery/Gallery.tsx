import { PopupWindow } from '@/shared';

import { useGallery } from './hooks';
import styles from './Gallery.module.scss';

export interface IGalleryProps {
  images: string[] | File[];
  isVisible: boolean;
  onClose: () => void;
  clickIndex?: number;
}

export const Gallery: React.FC<IGalleryProps> = (props) => {
  const { onClose, isVisible } = props;
  const { currentImage } = useGallery(props);

  return (
    <PopupWindow
      isVisible={isVisible}
      onClose={onClose}
      size="lg"
      isTransparent
      className={styles.gallery__popup}
      contentClassName={styles.gallery__popupContent}
    >
      <fieldset className={styles.gallery__imgWrapper}>
        <img src={currentImage} className={styles.gallery__img} />
      </fieldset>
    </PopupWindow>
  );
};

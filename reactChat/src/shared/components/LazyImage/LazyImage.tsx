import cn from 'classnames';

import { useLazyImage } from './hooks';
import styles from './lazyImage.module.scss';

export interface ILazyImageProps {
  src: string;
  alt?: string;
  onLoad?(): void;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLFieldSetElement>) => void;
}

export const LazyImage: React.FC<ILazyImageProps> = (props) => {
  const { src, alt, onClick, className, ...otherProps } = props;
  const { isLoaded, isVisible, imageRef, containerRef, handleLoad } =
    useLazyImage(props);

  return (
    <fieldset
      ref={containerRef}
      className={cn(styles.container, isLoaded && styles._loaded, className)}
      onClick={onClick}
      {...otherProps}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className={cn(styles.container__image, isLoaded && styles._loaded)}
        />
      )}
    </fieldset>
  );
};

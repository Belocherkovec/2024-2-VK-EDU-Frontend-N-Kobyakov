import cn from 'classnames';

import { useLazyImage } from './hooks';
import fallBackImage from './assets/fallBackImage.svg';
import styles from './lazyImage.module.scss';

export interface ILazyImageProps {
  src: string;
  alt?: string;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLFieldSetElement>) => void;
}

export const LazyImage: React.FC<ILazyImageProps> = (props) => {
  const { src, alt, onClick, className, ...otherProps } = props;
  const {
    isLoaded,
    isError,
    isVisible,
    imageRef,
    containerRef,
    handleLoad,
    handleClick
  } = useLazyImage(props);

  return (
    <fieldset
      ref={containerRef}
      className={cn(
        styles.container,
        (isLoaded || isError) && styles._loaded,
        className
      )}
      onClick={handleClick}
      {...otherProps}
    >
      {(isVisible || isLoaded) && !isError && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className={cn(styles.container__image, isLoaded && styles._loaded)}
        />
      )}
      {isError && (
        <img
          src={fallBackImage}
          alt="Битая картинка"
          className={cn(styles.container__image, isError && styles._loaded)}
        />
      )}
    </fieldset>
  );
};

import { Loader } from '@/shared/components/Loader';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './image.module.scss';

export const Image: React.FC<{
  alt?: string;
  className?: string;
  src: string;
}> = ({ alt, className, src }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <fieldset
      className={cn(styles.fieldset, isLoaded && styles._loaded, className)}
    >
      {!isLoaded && <Loader />}
      {
        <img
          alt={alt}
          className={cn(styles.fieldset__img, isLoaded && styles._loaded)}
          onLoad={() => setIsLoaded(true)}
          src={src}
        />
      }
    </fieldset>
  );
};

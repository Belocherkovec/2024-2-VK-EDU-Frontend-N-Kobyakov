import { useAvatar } from '@/shared/components/Avatar/hooks/useAvatar';
import { Loader } from '@/shared/components/Loader';
import cn from 'classnames';
import React from 'react';

import styles from './avatar.module.scss';

export const Avatar: React.FC<{
  alt?: string;
  className?: string;
  firstName: string;
  lastName: string;
  src: null | string;
}> = ({ alt, className, firstName = '', lastName = '', src }) => {
  const { getRandomColor, handleLoaded, isLoaded } = useAvatar(src);

  return (
    <fieldset
      className={cn(styles.fieldset, isLoaded && styles._loaded, className)}
    >
      {!isLoaded && <Loader />}
      {src ? (
        <img
          alt={alt}
          className={cn(styles.fieldset__img, isLoaded && styles._loaded)}
          onLoad={handleLoaded}
          src={src}
        />
      ) : (
        <div
          className={styles.fieldset__userInitials}
          style={{ backgroundColor: `#${getRandomColor()}` }}
        >
          {firstName[0]}
          {lastName[0]}
        </div>
      )}
    </fieldset>
  );
};

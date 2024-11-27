import cn from 'classnames';
import React from 'react';

import { Loader } from '../Loader';
import styles from './avatar.module.scss';
import { useAvatar } from './hooks';

export interface IAvatarProps {
  alt?: string;
  className?: string;
  firstName: string;
  lastName: string;
  src: null | string;
  isOnline?: boolean;
  isGroupChat?: boolean;
}

export const Avatar: React.FC<IAvatarProps> = (props) => {
  const {
    alt,
    className,
    firstName = '',
    lastName = '',
    src,
    isOnline,
    isGroupChat
  } = props;
  const { handleLoaded, isLoaded } = useAvatar(props);

  return (
    <fieldset
      className={cn(
        styles.fieldset,
        isLoaded && styles._loaded,
        isOnline && styles._isOnline,
        isGroupChat && styles._isGroupChat,
        className
      )}
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
        <div className={styles.fieldset__userInitials}>
          {firstName[0]}
          {lastName[0]}
        </div>
      )}
    </fieldset>
  );
};

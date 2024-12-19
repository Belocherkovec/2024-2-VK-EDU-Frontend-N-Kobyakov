import cn from 'classnames';
import React from 'react';

import { LazyImage } from '../LazyImage';
import styles from './avatar.module.scss';

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
  return (
    <div
      className={cn(
        styles.fieldset,
        isOnline && styles._isOnline,
        isGroupChat && styles._isGroupChat,
        className
      )}
    >
      {src && (
        <LazyImage alt={alt} className={styles.fieldset__img} src={src} />
      )}
      {!src && (
        <div className={styles.fieldset__userInitials}>
          {firstName[0]}
          {lastName[0]}
        </div>
      )}
    </div>
  );
};

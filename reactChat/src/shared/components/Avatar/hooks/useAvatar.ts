import { useEffect, useRef, useState } from 'react';
import { IAvatarProps } from '../Avatar';

export const useAvatar = (props: IAvatarProps) => {
  const { src, firstName, lastName } = props;
  const [isLoaded, setIsLoaded] = useState(!!(!src && (firstName || lastName)));
  const prevSrc = useRef(src);

  const handleLoaded = () => setIsLoaded(true);

  useEffect(() => {
    if (!src) {
      setIsLoaded(true);
    }

    if (prevSrc.current !== src && src) {
      setIsLoaded(false);
      prevSrc.current = src;
    }
  }, [src]);

  return {
    handleLoaded,
    isLoaded
  };
};

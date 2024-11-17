import { useEffect, useRef, useState } from 'react';

export const useAvatar = (src: null | string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const prevSrc = useRef(src);

  const handleLoaded = () => setIsLoaded(true);

  const getRandomColor = () =>
    Math.floor(Math.random() * 16777215).toString(16);

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
    getRandomColor,
    handleLoaded,
    isLoaded
  };
};

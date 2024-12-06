import { ILazyImageProps } from '../LazyImage';
import { useEffect, useRef, useState } from 'react';
import { useOnScreen } from '../../../';

export const useLazyImage = (props: ILazyImageProps) => {
  const { onLoad } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLFieldSetElement | null>(null);
  const isVisible = useOnScreen(containerRef, {
    rootMargin: '0px'
  });

  const handleLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true);
        onLoad && onLoad();
      };
    }
  }, [isVisible, onLoad, isLoaded]);

  return {
    isLoaded,
    isVisible,
    imageRef,
    containerRef,
    handleLoad
  };
};

import { ILazyImageProps } from '../LazyImage';
import { useEffect, useRef, useState } from 'react';
import { useOnScreen } from '../../../index';

export const useLazyImage = (props: ILazyImageProps) => {
  const { onLoad, onError, onClick } = props;
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLFieldSetElement | null>(null);
  const isVisible = useOnScreen(containerRef, {
    rootMargin: '0px'
  });

  const handleClick = (event: React.MouseEvent<HTMLFieldSetElement>) => {
    if (!isError && onClick) {
      onClick(event);
    }
  };

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
        if (onLoad) {
          onLoad();
        }
      };
      imageRef.current.onerror = () => {
        setIsError(true);
        if (onError) {
          onError();
        }
      };
    }
  }, [isVisible, onLoad, isLoaded]);

  return {
    isError,
    isLoaded,
    isVisible,
    imageRef,
    containerRef,
    handleLoad,
    handleClick
  };
};

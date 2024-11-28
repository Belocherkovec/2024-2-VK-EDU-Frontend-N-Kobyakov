import { useEffect, useRef, useState } from 'react';
import { IAvatarProps } from '../Avatar';
import { ALLOWED_IMG_TYPES, TEXTS } from '../../../consts';

export const useAvatar = (props: IAvatarProps) => {
  const { src, firstName, lastName, file } = props;
  const [fileImage, setFileImage] = useState<string>(TEXTS.empty);
  const [isLoaded, setIsLoaded] = useState(!!(!src && (firstName || lastName)));
  const prevSrc = useRef(src);

  const handleLoaded = () => setIsLoaded(true);

  useEffect(() => {
    if (!src) {
      setIsLoaded(true);
    }

    if (file && file instanceof File && ALLOWED_IMG_TYPES.includes(file.type)) {
      const reader = new FileReader();

      reader.onload = () => {
        setFileImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else if (fileImage) {
      setFileImage(TEXTS.empty);
    }

    if (prevSrc.current !== src && src) {
      setIsLoaded(false);
      prevSrc.current = src;
    }
  }, [src, file]);

  return {
    handleLoaded,
    isLoaded,
    fileImage
  };
};

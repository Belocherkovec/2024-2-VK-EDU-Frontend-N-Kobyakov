import { useRef, useState } from 'react';

export const useMessage = () => {
  const imageClickId = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isGalleryVisible, setIsGalleryVisible] = useState(false);

  const handleGalleryVisible = () => setIsGalleryVisible(false);
  const handleImageClick = (id: number) => {
    imageClickId.current = id;
    setIsGalleryVisible(true);
  };

  return {
    audioRef,
    imageClickId,
    isGalleryVisible,
    handleGalleryVisible,
    handleImageClick
  };
};

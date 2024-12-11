import { IGalleryProps } from '../Gallery';
import { useLayoutEffect, useState } from 'react';

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const useGallery = (props: IGalleryProps) => {
  const { clickIndex, images } = props;
  const [innerImages, setInnerImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState('');

  useLayoutEffect(() => {
    if (typeof clickIndex === 'number' && innerImages.length) {
      setCurrentImage(innerImages[clickIndex]);
    }
  }, [clickIndex]);

  useLayoutEffect(() => {
    const newInnerImagesState: string[] = [];

    const processImg = async () => {
      for (const image of images) {
        if (typeof image !== 'string') {
          const base64Image = await convertToBase64(image);
          newInnerImagesState.push(base64Image);
        } else {
          newInnerImagesState.push(image);
        }
      }
    };

    processImg().finally(() => {
      setInnerImages(newInnerImagesState);

      if (typeof clickIndex === 'number') {
        setCurrentImage(newInnerImagesState[clickIndex]);
      }
    });
  }, [images]);

  const handleCurrentImageChange = (index: number) =>
    setCurrentImage(innerImages[index]);

  return {
    innerImages,
    currentImage,
    handleCurrentImageChange
  };
};

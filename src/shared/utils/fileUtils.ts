export const blobToFile = (blob: Blob, fileName: string) => {
  return new File([blob], fileName, {
    type: blob.type,
    lastModified: Date.now()
  });
};

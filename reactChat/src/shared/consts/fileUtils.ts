export const validateImageFile = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => reject(false);
    img.src = URL.createObjectURL(file);
  });
};

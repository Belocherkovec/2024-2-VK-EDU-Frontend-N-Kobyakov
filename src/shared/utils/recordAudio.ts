export const recordAudio = (): Promise<
  { mediaRecorder: MediaRecorder; stop: () => void } | Error
> => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        try {
          const mediaRecorder = new MediaRecorder(stream);

          const stop = () => {
            if (mediaRecorder.state !== 'inactive') {
              mediaRecorder.stop(); // Останавливаем запись
            }
            stream.getTracks().forEach((track) => track.stop()); // Освобождаем микрофон
          };

          resolve({ mediaRecorder, stop });
        } catch (error) {
          stream.getTracks().forEach((track) => track.stop());
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

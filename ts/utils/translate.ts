export interface ITranslateResponse {
  responseData: ITranslateResponseData;
  responseStatus: string;
}
export interface ITranslateResponseData {
  translatedText: string;
  match: number;
}

export const translate = async (
  query: string,
  fromLanguage: string,
  toLanguage: string,
  onErrorCallback?: (error: Error) => void
): Promise<ITranslateResponse | Error> => {
  const api = `https://api.mymemory.translated.net/get?q=${query}&langpair=${fromLanguage}|${toLanguage}`;

  try {
    const response = await fetch(api);
    const data = await response.json();

    if (data.responseStatus === '403') {
      throw new Error(data.responseData.translatedText);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (onErrorCallback) {
        onErrorCallback(error);
      }

      return error;
    } else {
      const unknownError = new Error('An unknown error occurred.');
      if (onErrorCallback) {
        onErrorCallback(unknownError);
      }

      return unknownError;
    }
  }
};

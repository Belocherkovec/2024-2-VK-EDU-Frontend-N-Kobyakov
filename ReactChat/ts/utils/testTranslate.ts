import TranslateUtils from './index';
import { memoize } from './memoize';
import { ITranslateResponse, ITranslateResponseData } from './translate';

async function test() {
  const logMemoizedResult = (res: unknown) => {
    if (res && typeof res === 'object') {
      if ('responseData' in res && !(res instanceof Error)) {
        const responseData = res.responseData as ITranslateResponseData;
        console.log(`Translated text: ${responseData.translatedText}`);
      }
      if ('value' in res && 'cached' in res && !(res.value instanceof Error)) {
        const response = res.value as ITranslateResponse;
        const isCached = res.cached as boolean;

        console.log(
          `Translated text: ${response.responseData.translatedText}. Cached: ${isCached}`
        );
      }
    }
  };

  const handleError = (error: Error) => {
    console.error('Ошибка при попытке перевода:', error.message);
  };

  const memoizedTranslate = memoize(TranslateUtils.translate, true);
  const resultsArr = [
    await memoizedTranslate('Hello World!', 'en', 'ru', handleError),
    await memoizedTranslate('Hello World!', 'en', 'ru', handleError),
    await memoizedTranslate('Hello World!', 'en', 'ru', handleError),
    await memoizedTranslate('Hello World!', 'en', 'ru', handleError),
    await memoizedTranslate('Другой текст!', 'ru', 'en', handleError),
    await memoizedTranslate('Другой текст!', 'ru', 'en', handleError),
    await memoizedTranslate(
      'Frontend is cool!',
      'unknownLanguage',
      'en',
      handleError
    )
  ];

  for (const result of resultsArr) {
    logMemoizedResult(result);
  }
}

test();

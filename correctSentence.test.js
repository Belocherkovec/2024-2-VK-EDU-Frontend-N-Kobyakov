import { ERROR_MESSAGE } from './consts';
import { correctSentence } from './correctSentence';

test('returns correct sentence', () => {
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.");
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.");
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.");
  expect(correctSentence([1, 2, 3])).toBe(ERROR_MESSAGE);
})

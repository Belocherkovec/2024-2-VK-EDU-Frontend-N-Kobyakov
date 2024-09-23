import { ERROR_MESSAGE } from './consts';
import { correctSentence } from './correctSentence';

test('returns correct sentence', () => {
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.");
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.");
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.");
})

test('throws error for non-string input', () => {
  expect(() => correctSentence([1, 2, 3])).toThrow(ERROR_MESSAGE);
  expect(() => correctSentence(999)).toThrow(ERROR_MESSAGE);
});

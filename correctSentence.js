import { ERROR_MESSAGE } from "./consts";
/*
For the input of your function, you will be given one sentence.
You have to return a corrected version,
that starts with a capital letter and ends with a period (dot).

Example:

input (string): "hey, friend"
output (string): "Hey, friend."

Updated first 'h' to 'H', added '.'.

More examples:

correctSentence("greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends.") == "Greetings, friends."
 */

export function correctSentence(text) {
  if (typeof text !== 'string') return ERROR_MESSAGE;

  return `${text.charAt(0).toUpperCase()}${text.slice(1)}${text.endsWith('.') ? '' : '.'}`;
}

import { convertBytesToHuman } from './convertBytesToHuman';
/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(null)).toBe(false);
  expect(convertBytesToHuman({bytes: 1024})).toBe(false);
  expect(convertBytesToHuman(-1)).toBe(false);
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(1024)).toBe('1 kB');
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB');
  expect(convertBytesToHuman(1610612736)).toBe('1.5 GB');
  expect(convertBytesToHuman(5)).toBe('5 B');
  expect(convertBytesToHuman(1023)).toBe('1023 B');
});

export type KErrorMessages = keyof IErrorMessages;

export interface IErrorMessages {
  patternMismatch: ({ title }: { title: string }) => string;
  tooLong: ({ maxLength }: { maxLength: string }) => string;
  tooShort: ({ minLength }: { minLength: string }) => string;
  valueMissing: () => string;
}

export const ErrorMessages: IErrorMessages = {
  patternMismatch: ({ title }: { title: string }) =>
    title || 'Данные не соответствуют формату',
  tooLong: ({ maxLength }: { maxLength: string }) =>
    `Слишком длинное значение, ограничение символов — ${maxLength}`,
  tooShort: ({ minLength }: { minLength: string }) =>
    `Слишком короткое значение, минимум символов — ${minLength}`,
  valueMissing: () => 'Пожалуйста, заполните это поле'
};

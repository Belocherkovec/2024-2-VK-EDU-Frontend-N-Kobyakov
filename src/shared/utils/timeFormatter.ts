import { TEXTS } from '@/shared';

export const timeFormatter = new Intl.DateTimeFormat('ru', {
  hour: 'numeric',
  hour12: false,
  minute: 'numeric'
});

export const dayFormatter = new Intl.DateTimeFormat('ru', {
  weekday: 'short'
});

export const monthFormatter = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'short'
});

export const yearFormatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit'
});

export const fullYearFormatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

export const getFormattedDate = (date: Date): string => {
  if (!date || !(date instanceof Date)) {
    return TEXTS.empty;
  }

  const now = new Date();
  const dateDay = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const formattedTime = timeFormatter.format(date);
  const formattedDay = dayFormatter.format(date);
  const formattedMonth = monthFormatter.format(date);
  const formattedYear =
    date.getFullYear() >= 2000
      ? yearFormatter.format(date)
      : fullYearFormatter.format(date);

  let result;

  if (
    dateDay === now.getDate() &&
    month === now.getMonth() &&
    year === now.getFullYear()
  ) {
    result = `${formattedTime}`;
  } else if (month === now.getMonth() && year === now.getFullYear()) {
    result = `${formattedTime}, ${formattedDay}`;
  } else if (year === now.getFullYear()) {
    result = `${formattedMonth}`;
  } else {
    result = `${formattedYear}`;
  }

  return result;
};

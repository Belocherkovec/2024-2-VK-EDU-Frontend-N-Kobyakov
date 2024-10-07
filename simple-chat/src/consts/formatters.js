export const timeFormatter = new Intl.DateTimeFormat('ru', {
  hour: 'numeric',
  hour12: false,
  minute: 'numeric',
});

export const dayFormatter = new Intl.DateTimeFormat('ru', {
  weekday: 'short',
});

export const monthFormatter = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'short',
});

export const yearFormatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
});

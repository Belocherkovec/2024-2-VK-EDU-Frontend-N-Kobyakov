export const buildUrlWithQuery = (
  url: string,
  queryParams: Record<string, number | string>
) => {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  if (queryString) {
    url += `?${queryString}`;
  }

  return url;
};

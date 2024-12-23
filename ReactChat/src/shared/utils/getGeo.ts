export const GEOLOCATION_ERRORS = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT'
} as const;

export type GeolocationErrorType = keyof typeof GEOLOCATION_ERRORS;

export const getGeo = (
  onSuccess: (geo: GeolocationPosition) => void,
  onError?: (error: GeolocationPositionError) => void,
  options?: PositionOptions
) => {
  const defaultOptions = {
    enableHighAccuracy: true
  };
  navigator.geolocation.getCurrentPosition(
    onSuccess,
    onError,
    options || defaultOptions
  );
};

export const memoize = <Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  isDebugMode?: boolean
): ((
  ...args: Args
) => Result | Promise<Result> | { value: Result; cached: boolean }) => {
  const values: Record<string, Result> = {};

  return (...args: Args): Result | { value: Result; cached: boolean } => {
    const key = JSON.stringify(args);
    let isCached = true;
    if (!(key in values)) {
      values[key] = fn(...args);
      isCached = false;
    }

    const cachedValue = values[key];

    if (cachedValue instanceof Promise) {
      return cachedValue.then((resolvedValue) => {
        values[key] = resolvedValue;
        if (isDebugMode) {
          return { value: resolvedValue, cached: isCached };
        }
        return resolvedValue;
      }) as Result | { value: Result; cached: boolean };
    }

    return isDebugMode ? { value: cachedValue, cached: isCached } : cachedValue;
  };
};

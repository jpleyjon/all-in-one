/**
 * Creates a throttled function that invokes at most once every `wait` ms.
 *
 * @param fn Function to throttle.
 * @param wait Throttle window in milliseconds.
 * @returns Throttled function.
 * @throws {TypeError} If `fn` is not a function.
 * @throws {RangeError} If `wait` is not a non-negative finite number.
 */
export function throttle<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  wait: number,
): (...args: TArgs) => TReturn | undefined {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function.');
  }

  if (!Number.isFinite(wait) || wait < 0) {
    throw new RangeError('wait must be a finite non-negative number.');
  }

  let lastExecution = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let latestArgs: TArgs | undefined;
  let latestThis: unknown;
  let result: TReturn;

  const invoke = () => {
    timer = undefined;
    lastExecution = Date.now();

    if (latestArgs === undefined) {
      return;
    }

    const args = latestArgs;
    const context = latestThis;
    latestArgs = undefined;
    latestThis = undefined;

    result = fn.apply(context, args);
  };

  return function throttled(this: unknown, ...args: TArgs): TReturn | undefined {
    const now = Date.now();
    const remaining = wait - (now - lastExecution);

    latestThis = this;
    latestArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timer !== undefined) {
        clearTimeout(timer);
        timer = undefined;
      }

      lastExecution = now;
      result = fn.apply(latestThis, latestArgs);
      latestArgs = undefined;
      latestThis = undefined;
      return result;
    }

    if (timer === undefined) {
      timer = setTimeout(invoke, remaining);
    }

    return result;
  };
}

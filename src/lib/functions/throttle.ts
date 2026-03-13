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
  let latestInvocation: (() => TReturn) | undefined;
  let result: TReturn;

  const invoke = (): void => {
    timer = undefined;
    lastExecution = Date.now();

    if (latestInvocation === undefined) {
      return;
    }

    const invocation = latestInvocation;
    latestInvocation = undefined;

    result = invocation();
  };

  return function throttled(this: unknown, ...args: TArgs): TReturn | undefined {
    const now = Date.now();
    const remaining = wait - (now - lastExecution);

    latestInvocation = () => fn.apply(this, args);

    if (remaining <= 0 || remaining > wait) {
      if (timer !== undefined) {
        clearTimeout(timer);
        timer = undefined;
      }

      lastExecution = now;
      const invocation = latestInvocation;
      result = invocation();
      latestInvocation = undefined;
      return result;
    }

    if (timer === undefined) {
      timer = setTimeout(invoke, remaining);
    }

    return result;
  };
}

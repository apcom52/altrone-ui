import { useCallback, useEffect, useRef } from 'react';

/**
 * Manages an auto-close timer with pause-on-hover support.
 * The remaining time is tracked so hover-resume continues from where it stopped.
 */
export const useAutoClose = (
  autoClose: boolean,
  duration: number,
  onClose: () => void,
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef(duration);
  const lastStartRef = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (!autoClose) return;
    clear();
    lastStartRef.current = Date.now();
    timerRef.current = setTimeout(onClose, remainingRef.current);
  }, [autoClose, clear, onClose]);

  const pause = useCallback(() => {
    if (!timerRef.current || lastStartRef.current === null) return;
    clear();
    remainingRef.current = Math.max(
      0,
      remainingRef.current - (Date.now() - lastStartRef.current),
    );
    lastStartRef.current = null;
  }, [clear]);

  useEffect(() => {
    start();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { pause, resume: start };
};

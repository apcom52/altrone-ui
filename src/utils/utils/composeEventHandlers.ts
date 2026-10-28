import { SyntheticEvent } from 'react';

/** Runs the consumer handler first; the internal one is skipped once it calls `event.preventDefault()`. */
export const composeEventHandlers =
  <E extends SyntheticEvent>(
    consumerHandler: ((event: E) => void) | undefined,
    internalHandler: (event: E) => void,
  ) =>
  (event: E) => {
    consumerHandler?.(event);

    if (!event.defaultPrevented) {
      internalHandler(event);
    }
  };

import React from 'react';

export const mergeRefs = <T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> => {
  return (el) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = el;
      }
    }
  };
};

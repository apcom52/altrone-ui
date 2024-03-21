import { MutableRefObject, Ref, RefObject } from 'react';

export const assignRef = (refObject: Ref<any>, ref: any) => {
  if (typeof refObject === 'function') {
    refObject(ref);
  } else if (refObject) {
    refObject.current = ref;
  }
};

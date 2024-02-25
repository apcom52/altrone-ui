import React, { ReactNode } from 'react';
import { AnyObject } from '../types';

export function replaceNode(source: ReactNode, replacement: ReactNode, props: AnyObject) {
  if (!React.isValidElement(source)) {
    return replacement;
  }

  return React.cloneElement(
    source,
    typeof props === 'function' ? props(source.props || {}) : props
  );
}

export function cloneNode(element: ReactNode, props: AnyObject) {
  return replaceNode(element, element, props);
}

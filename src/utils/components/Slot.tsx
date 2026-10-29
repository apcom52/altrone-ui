import { CSSProperties, isValidElement, ReactElement, Ref } from 'react';
import clsx from 'clsx';
import { DOMUtils } from 'utils/DOMUtils';
import { AnyObject } from 'utils/types';
import { cloneWithRef } from 'utils/utils/cloneWithRef';

type SlotProps<P extends AnyObject = AnyObject> = {
  children: ReactElement<P>;
  ref?: Ref<any>;
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
};

export const Slot = <P extends AnyObject = AnyObject>({
  children,
  ref,
  className,
  style,
  ...slotProps
}: SlotProps<P>) => {
  if (!isValidElement(children)) {
    console.error('[Slot] children must be a valid React element');
    return null;
  }

  const childProps = children.props as P;

  return cloneWithRef(children, {
    ref: DOMUtils.composeRefs(ref, childProps.ref),
    ...slotProps,
    className: clsx(className, childProps.className as string | undefined),
    style: { ...style, ...(childProps.style as CSSProperties | undefined) },
  });
};

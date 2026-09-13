import React from "react";
import { AnyObject } from "utils/types";

export const cloneWithRef = <P extends AnyObject = AnyObject>(
  element: React.ReactElement,
  props: React.HTMLAttributes<P> & { ref?: React.Ref<P> }
) => {
  return React.cloneElement(element, props) as React.ReactElement<P>;
};
import React, { ReactNode } from 'react';
import { AnyObject } from './index.ts';

interface TriggerNativeEventProps {
  element: HTMLElement;
  value: unknown;
  eventType: string;
  senderObject: unknown;
  propertyName: string;
}

export class DOMUtils {
  /**
   * This method is needed to detect fragment
   */
  static isFragment(element: ReactNode) {
    return Boolean(
      element &&
        React.isValidElement(element) &&
        element.type === React.Fragment,
    );
  }

  /**
   * This method is used to replace one element with another
   */
  static replaceNode(
    source: ReactNode,
    replacement: ReactNode,
    props: AnyObject,
  ) {
    if (!React.isValidElement(source)) {
      return replacement;
    }

    return React.cloneElement(
      source,
      typeof props === 'function' ? props(source.props || {}) : props,
    );
  }

  /**
   * This method is used to clone React node
   */
  static cloneNode(element: ReactNode, props: AnyObject) {
    return DOMUtils.replaceNode(element, element, props);
  }

  static triggerEvent = ({
    element,
    value,
    eventType,
    senderObject,
    propertyName,
  }: TriggerNativeEventProps) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      senderObject,
      propertyName,
    )?.set;
    nativeInputValueSetter?.call(element, value);

    const event = new Event(eventType, { bubbles: true });
    element.dispatchEvent(event);
  };
}

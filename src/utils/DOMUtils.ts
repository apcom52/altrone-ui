import React, {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
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

  static getValidChildren(element: ReactNode) {
    if (!isValidElement(element)) {
      return [];
    }

    const result: ReactElement[] = [];

    Children.forEach(element.props.children, (child) => {
      if (isValidElement(child)) {
        result.push(child);
      }
    });

    return result;
  }

  static hasValidChildren(element: ReactNode) {
    return DOMUtils.getValidChildren(element).length > 0;
  }

  static containsElementType(element: ReactNode, types: React.ElementType[]) {
    let result = false;

    const checkNode = (node: ReactNode) => {
      if (result || !isValidElement(node)) return;

      if (types.includes(node.type as React.ElementType)) {
        result = true;
        return;
      }

      const nodeChildren = DOMUtils.getValidChildren(node);

      for (const child of nodeChildren) {
        checkNode(child);
      }
    };

    checkNode(element);

    return result;
  }
}

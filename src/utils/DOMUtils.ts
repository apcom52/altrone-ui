import React, {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import { AnyObject } from './reactNode.ts';

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

  /**
   * This method is used to return flatten children array
   */
  static getFlattenChildrenArray(children: ReactElement[]) {
    let result: ReactElement[] = [];

    for (const elem of children) {
      if (Array.isArray(elem)) {
        result.push(...elem);
      } else {
        result.push(elem);
      }
    }

    return result;
  }

  /**
   * This method is used to return filtered children array
   */
  static getFilteredChildrenArray(
    rootElement: ReactNode | ReactNode[],
    filter: (element: ReactNode, index: number, depth: number) => boolean,
    depth?: number,
  ) {
    const elements: ReactNode[] = [];

    let treeDepth = typeof depth === 'number' ? depth : 1;

    Children.forEach(rootElement, (item, index) => {
      if (filter(item, index, treeDepth)) {
        elements.push(item);
      }

      if (isValidElement(item) && item.props && item.props.children) {
        if (Children.count(item.props.children)) {
          elements.push(
            ...DOMUtils.getFilteredChildrenArray(
              item.props.children,
              filter,
              treeDepth + 1,
            ),
          );
        }
      }
    });

    return elements;
  }
}

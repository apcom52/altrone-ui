import { ChildrenType } from './types.ts';
import { ArrayUtils } from './ArrayUtils.ts';
import { isValidElement } from 'react';

type ArrayIteration = (element: ChildrenType, index: number) => boolean;

export class AltChildren {
  private elements: ChildrenType;

  constructor(childrenElements: ChildrenType) {
    this.elements = ArrayUtils.getSafeArray(childrenElements);
  }

  /**
   * Transform children into list of child nodes
   */
  toArray(): ChildrenType[] {
    return ArrayUtils.getSafeArray(this.elements);
  }

  get size() {
    return this.toArray().length;
  }

  /**
   * This method is used to filter elements to work only with valid elements (expect null)
   */
  filterNodes() {
    this.filter((node) => isValidElement(node));
    return this;
  }

  filter(fn: ArrayIteration) {
    this.elements = this.toArray().filter(fn);
    return this;
  }

  flatten(depth: number = 1) {
    const result: ChildrenType[] = [];

    const checkNode = (node: ChildrenType[], _depth = 1) => {
      for (const element of node) {
        if (
          _depth + 1 <= depth &&
          isValidElement(element) &&
          Array.isArray(element.props.children)
        ) {
          checkNode(
            ArrayUtils.getSafeArray(element.props.children),
            _depth + 1,
          );
        } else {
          result.push(element);
        }
      }
    };

    checkNode(this.toArray(), 1);

    this.elements = result;

    return this;
  }
}

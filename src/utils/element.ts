import { Children, isValidElement, ReactElement, ReactNode } from 'react';

export function getChildElements(
  rootElement: ReactNode | ReactNode[],
  filter: (element: ReactNode) => boolean,
) {
  const elements: ReactNode[] = [];

  Children.forEach(rootElement, (item) => {
    if (filter(item)) {
      elements.push(item);
    }

    if (isValidElement(item) && item.props && item.props.children) {
      if (Children.count(item.props.children)) {
        elements.push(...getChildElements(item.props.children, filter));
      }
    }
  });

  return elements;
}

export function getChildrenArray(children: ReactElement[]) {
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

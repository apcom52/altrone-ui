import { ChildrenType } from '../../src';
import { AltChildren } from '../../src/utils/Children';
import { ReactElement, ReactNode } from 'react';

type WithChildren = ReactElement<{ children: ReactNode[] }>;

const childrenOf = (node: ReactNode) => (node as WithChildren).props.children;

describe('Children Util class', () => {
  let layout: ChildrenType;

  beforeEach(() => {
    layout = (
      <div data-testid="parent">
        <div>Standard element</div>
        {0}
        <span>Second standard element</span>
        {4}
        <div>
          Tree element
          <div>Inner!</div>
          <div>
            <div>Branch</div>
            <div>Leaf</div>
          </div>
        </div>
        Hello!
        {null}
      </div>
    );
  });

  test('has to return correct size', () => {
    const children = childrenOf(layout);

    const inst = new AltChildren(children);

    expect(inst.size).toBe(7);
  });

  test('check toArray method', () => {
    const singleElement = <div>test</div>;

    const singleChildren = new AltChildren(singleElement);
    expect(singleChildren.toArray()).toStrictEqual([singleElement]);

    const children = childrenOf(layout);
    const multiChildren = new AltChildren(children);
    expect(multiChildren.toArray()).toStrictEqual([...children.slice(0, 7)]);
  });

  test('check filterNodes method', () => {
    const children = childrenOf(layout);
    const multiChildren = new AltChildren(children);

    expect(multiChildren.filterNodes().toArray()).toStrictEqual([
      children[0],
      children[2],
      children[4],
    ]);
  });

  test('check flatten method', () => {
    const children = childrenOf(layout);
    const multiChildren = new AltChildren([...children]);

    const flattenedArray = multiChildren.flatten(2).toArray();

    expect(flattenedArray).toStrictEqual([
      children[0],
      children[1],
      children[2],
      children[3],
      childrenOf(children[4])[0],
      childrenOf(children[4])[1],
      childrenOf(children[4])[2],
      children[5],
      children[6],
    ]);

    const normalChildren = new AltChildren([...children]);

    const smartFlattened = normalChildren.flatten(2).filterNodes().toArray();
    expect(smartFlattened).toStrictEqual([
      children[0],
      children[2],
      childrenOf(children[4])[1],
      childrenOf(children[4])[2],
    ]);
  });
});

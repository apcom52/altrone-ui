import { ChildrenType } from '../../src';
import { AltChildren } from '../../src/utils/Children';
import { ReactElement } from 'react';

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
    const children = (layout as ReactElement).props.children;

    const inst = new AltChildren(children);

    expect(inst.size).toBe(7);
  });

  test('check toArray method', () => {
    const singleElement = <div>test</div>;

    const singleChildren = new AltChildren(singleElement);
    expect(singleChildren.toArray()).toStrictEqual([singleElement]);

    const children = (layout as ReactElement).props.children;
    const multiChildren = new AltChildren(children);
    expect(multiChildren.toArray()).toStrictEqual([...children.slice(0, 7)]);
  });

  test('check filterNodes method', () => {
    const children = (layout as ReactElement).props.children;
    const multiChildren = new AltChildren(children);

    expect(multiChildren.filterNodes().toArray()).toStrictEqual([
      children[0],
      children[2],
      children[4],
    ]);
  });

  test('check flatten method', () => {
    const children = (layout as ReactElement).props.children;
    const multiChildren = new AltChildren([...children]);

    const flattenedArray = multiChildren.flatten(2).toArray();

    expect(flattenedArray).toStrictEqual([
      children[0],
      children[1],
      children[2],
      children[3],
      children[4].props.children[0],
      children[4].props.children[1],
      children[4].props.children[2],
      children[5],
      children[6],
    ]);

    const normalChildren = new AltChildren([...children]);

    const smartFlattened = normalChildren.flatten(2).filterNodes().toArray();
    expect(smartFlattened).toStrictEqual([
      children[0],
      children[2],
      children[4].props.children[1],
      children[4].props.children[2],
    ]);
  });
});

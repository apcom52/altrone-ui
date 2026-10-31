import {
  Button,
  DOMUtils,
  Dropdown,
  Flex,
  NavigationList,
  Popover,
  Select,
  TextInput,
} from '../../src';
import { Fragment } from 'react';
import { Home } from 'lucide-react';

describe('DomUtils', () => {
  test('isFragment', async () => {
    expect(DOMUtils.isFragment(<Fragment />)).toBe(true);
    expect(DOMUtils.isFragment(<div />)).toBe(false);
    expect(DOMUtils.isFragment(null)).toBe(false);
  });

  test('hasValidChildren', async () => {
    expect(DOMUtils.hasValidChildren(<div />)).toBe(false);
    expect(DOMUtils.hasValidChildren(<div>test</div>)).toBe(false);
    expect(DOMUtils.hasValidChildren(<div>123</div>)).toBe(false);
    expect(DOMUtils.hasValidChildren(<div>{null}</div>)).toBe(false);
    expect(
      DOMUtils.hasValidChildren(
        <div>
          <span />
        </div>,
      ),
    ).toBe(true);
    expect(
      DOMUtils.hasValidChildren(
        <div>
          <span>
            <span />
          </span>
        </div>,
      ),
    ).toBe(true);
  });

  test('containsElementType', async () => {
    expect(DOMUtils.containsElementType(<Button label="abc" />, [Button])).toBe(
      true,
    );
    expect(
      DOMUtils.containsElementType(<Button label="abc" />, [TextInput]),
    ).toBe(false);

    expect(
      DOMUtils.containsElementType(
        <Popover content={<div />}>
          <Button label="abc" />
        </Popover>,
        [Popover],
      ),
    ).toBe(true);

    expect(
      DOMUtils.containsElementType(
        <Popover content={<div />}>
          <Flex>
            <Button label="abc" />
            <TextInput />
            <Flex>
              <Home />
            </Flex>
          </Flex>
        </Popover>,
        [Button],
      ),
    ).toBe(true);

    expect(
      DOMUtils.containsElementType(
        <Popover content={<div />}>
          <Flex>
            <Button label="abc" />
            <TextInput />
            <Flex>
              <Home />
            </Flex>
          </Flex>
        </Popover>,
        [Home],
      ),
    ).toBe(true);

    expect(
      DOMUtils.containsElementType(
        <Popover content={<div />}>
          <Flex>
            <Button label="abc" />
            <TextInput />
            <Flex>
              <Home />
            </Flex>
          </Flex>
        </Popover>,
        [Button, NavigationList],
      ),
    ).toBe(true);

    expect(
      DOMUtils.containsElementType(
        <Popover content={<div />}>
          <Flex>
            <Button label="abc" />
            <TextInput />
            <Flex>
              <Home />
            </Flex>
          </Flex>
        </Popover>,
        [Select, NavigationList],
      ),
    ).toBe(false);

    expect(
      DOMUtils.containsElementType(
        <Popover content={<div />}>
          <NavigationList.Link label="abc" icon={<Home />} />
        </Popover>,
        [NavigationList.Link],
      ),
    ).toBe(true);

    expect(
      DOMUtils.containsElementType(
        <Dropdown content={<div />}>
          <NavigationList.Link label="abc" icon={<Home />} />
        </Dropdown>,
        [NavigationList.Link],
      ),
    ).toBe(true);
  });
});

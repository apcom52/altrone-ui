import {
  Button,
  DOMUtils,
  Dropdown,
  Flex,
  Icon,
  NavigationList,
  Popover,
  TextInput,
} from '../../src';
import { Fragment } from 'react';

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
    expect(DOMUtils.containsElementType(<Button label="abc" />, Button)).toBe(
      true,
    );
    expect(
      DOMUtils.containsElementType(<Button label="abc" />, TextInput),
    ).toBe(false);

    expect(
      DOMUtils.containsElementType(
        <Popover content={null}>
          <Button label="abc" />
        </Popover>,
        Popover,
      ),
    ).toBe(true);

    expect(
      DOMUtils.containsElementType(
        <Popover content={null}>
          <Button label="abc" />
          <TextInput />
          <Flex>
            <Icon i="abc" />
          </Flex>
        </Popover>,
        Button,
      ),
    ).toBe(true);

    expect(
      DOMUtils.containsElementType(
        <Popover content={null}>
          <Button label="abc" />
          <TextInput />
          <Flex>
            <Icon i="abc" />
          </Flex>
        </Popover>,
        Icon,
      ),
    ).toBe(true);

    expect(
      DOMUtils.containsElementType(
        <Popover content={null}>
          <NavigationList.GroupAction label="abc" icon={<Icon i="test" />} />
        </Popover>,
        NavigationList.GroupAction,
      ),
    ).toBe(true);

    expect(
      DOMUtils.containsElementType(
        <Dropdown content={null}>
          <NavigationList.GroupAction label="abc" icon={<Icon i="test" />} />
        </Dropdown>,
        NavigationList.GroupAction,
      ),
    ).toBe(true);
  });
});

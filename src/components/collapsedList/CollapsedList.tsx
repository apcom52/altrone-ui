import { memo } from 'react';
import {
  CollapsedListContext,
  CollapsedListProps,
} from './CollapsedList.types.ts';
import { getSafeArray, useBoolean } from 'utils';
import { Button, Icon, Flex } from 'components';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';
import { Align, Gap } from 'types';
import s from './collapsed-list.module.scss';

export const CollapsedList = memo<CollapsedListProps>(
  ({
    children,
    limit,
    expandButtonLabel,
    className,
    style,
    gap,
    hideExpandButtonAfterUsage = false,
    ...restProps
  }) => {
    const { collapsedList: collapsedListConfig = {} } = useConfiguration();

    const { value: expanded, toggle } = useBoolean(false);

    const limitValue =
      typeof limit === 'number' ? limit : collapsedListConfig.limit || 5;

    const safeArray = getSafeArray(children);

    const visibleChildren = expanded
      ? safeArray
      : safeArray.slice(0, limitValue);
    const restElementsLength = safeArray.length - limitValue;
    const showExpandButton =
      (restElementsLength > 0 && !expanded) ||
      (!hideExpandButtonAfterUsage && expanded);

    const defaultExpandButtonLabel = expanded
      ? 'Show less'
      : `Show ${restElementsLength} hidden`;

    const collapsedListContext: CollapsedListContext = {
      hiddenItems: restElementsLength,
      totalItems: safeArray.length,
      expanded,
    };

    const customExpandButtonLabel =
      typeof expandButtonLabel !== 'undefined'
        ? expandButtonLabel
        : collapsedListConfig.expandButtonLabel;

    const expandButtonLabelText = customExpandButtonLabel
      ? typeof customExpandButtonLabel === 'function'
        ? customExpandButtonLabel(collapsedListContext)
        : customExpandButtonLabel
      : defaultExpandButtonLabel;

    const cls = clsx(s.CollapsedList, className, collapsedListConfig.className);

    const styles = {
      ...collapsedListConfig.style,
      ...style,
    };

    return (
      <Flex
        className={cls}
        align={Align.start}
        style={styles}
        gap={Gap.medium}
        {...restProps}
      >
        <Flex gap={gap}>{visibleChildren}</Flex>
        {showExpandButton ? (
          <Button
            transparent
            label={expandButtonLabelText}
            rightIcon={<Icon i={expanded ? 'expand_less' : 'expand_more'} />}
            onClick={toggle}
          />
        ) : null}
      </Flex>
    );
  },
);

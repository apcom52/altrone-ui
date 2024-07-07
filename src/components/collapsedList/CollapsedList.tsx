import { memo } from 'react';
import {
  CollapsedListContext,
  CollapsedListProps,
} from './CollapsedList.types.ts';
import { getSafeArray, useBoolean } from 'utils';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Flex } from 'components/flex';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';
import s from './collapsed-list.module.scss';
import { useLocalization } from '../application/useLocalization.tsx';

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
    const t = useLocalization();

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
      ? t('collapsedList.collapse')
      : t('collapsedList.expand', {
          vars: {
            count: restElementsLength,
          },
        });

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
        direction="vertical"
        className={cls}
        align="start"
        style={styles}
        gap="m"
        {...restProps}
      >
        <Flex direction="vertical" gap={gap}>
          {visibleChildren}
        </Flex>
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

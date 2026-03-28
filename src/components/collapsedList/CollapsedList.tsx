import { memo } from 'react';
import {
  CollapsedListContext,
  CollapsedListProps,
} from './CollapsedList.types.ts';
import { ArrayUtils, useBoolean } from 'utils';
import { Button } from 'components/button';
import { Flex } from 'components/flex';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';
import s from './collapsed-list.module.scss';
import { useLocalization } from '../application/useLocalization.tsx';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const CollapsedList = memo<CollapsedListProps>(
  ({
    ref,
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
      typeof limit === 'number' ? limit : (collapsedListConfig.limit ?? 5);

    const safeArray = ArrayUtils.getSafeArray(children);

    const visibleChildren = expanded
      ? safeArray
      : safeArray.slice(0, limitValue);
    const restElementsLength = Math.max(0, safeArray.length - limitValue);
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
        ref={ref}
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
            variant="text"
            label={expandButtonLabelText}
            additionalIcon={expanded ? <ChevronUp /> : <ChevronDown />}
            onClick={toggle}
          />
        ) : null}
      </Flex>
    );
  },
);

import { Ref } from 'react';
import {
  CollapsedListContext,
  CollapsedListProps,
} from './CollapsedList.types.ts';
import { ArrayUtils, useBoolean } from 'utils';
import { Button } from 'components/button';
import { Flex } from 'components/flex';
import clsx from 'clsx';
import s from './collapsed-list.module.scss';
import { useLocalization } from '../application/useLocalization.tsx';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const CollapsedList = ({
  ref,
  children,
  limit,
  expandButtonLabel,
  className,
  style,
  gap,
  hideExpandButtonAfterUsage = false,
  ...restProps
}: CollapsedListProps) => {
  const t = useLocalization();
  const { value: expanded, toggle } = useBoolean(false);

  const limitValue = limit ?? 5;
  const items = ArrayUtils.getSafeArray(children);
  const hiddenItems = Math.max(0, items.length - limitValue);

  const visibleChildren = expanded ? items : items.slice(0, limitValue);
  const showExpandButton =
    (hiddenItems > 0 && !expanded) || (expanded && !hideExpandButtonAfterUsage);

  const context: CollapsedListContext = {
    hiddenItems,
    totalItems: items.length,
    expanded,
  };

  const buttonLabel =
    typeof expandButtonLabel === 'function'
      ? expandButtonLabel(context)
      : (expandButtonLabel ??
        (expanded
          ? t('collapsedList.collapse')
          : t('collapsedList.expand', { vars: { count: hiddenItems } })));

  return (
    <Flex
      ref={ref as Ref<HTMLElement>}
      direction="vertical"
      align="start"
      gap="m"
      className={clsx(s.CollapsedList, className)}
      style={style}
      {...restProps}
    >
      <Flex direction="vertical" gap={gap}>
        {visibleChildren}
      </Flex>
      {showExpandButton ? (
        <Button
          variant="text"
          size="s"
          label={buttonLabel}
          additionalIcon={expanded ? <ChevronUp /> : <ChevronDown />}
          onClick={toggle}
        />
      ) : null}
    </Flex>
  );
};

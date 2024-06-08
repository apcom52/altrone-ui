import { memo } from 'react';
import { useConfiguration } from 'components/configuration';
import { Icon } from 'components/icon';
import { Popover } from 'components/popover';
import { Text } from 'components/text';
import { TooltipTypes } from './Tooltip.types.ts';
import clsx from 'clsx';
import s from './tooltip.module.scss';

export const Tooltip = memo<TooltipTypes>(
  ({
    content,
    children,
    className,
    style,
    childrenClassName,
    ...restProps
  }) => {
    const { tooltip: tooltipConfig = {} } = useConfiguration();

    const cls = clsx(className, tooltipConfig.className);
    const styles = {
      ...tooltipConfig.style,
      ...style,
    };

    const tooltipContent =
      typeof content === 'string' ? (
        <Text.Paragraph size="s" className={cls} style={styles} {...restProps}>
          {content}
        </Text.Paragraph>
      ) : (
        content
      );

    const childrenElement = children || (
      <button type="button" className={clsx(s.QuestionMark, childrenClassName)}>
        <Icon i="help_outline" />
      </button>
    );

    return (
      <Popover
        placement="top"
        trigger={['click', 'hover']}
        content={tooltipContent}
        focusTrap={false}
        showArrow={true}
        {...restProps}
      >
        {childrenElement}
      </Popover>
    );
  },
);

import { memo } from 'react';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import { TooltipTypes } from './Tooltip.types.ts';
import { Icon, Popover, Text } from 'components';
import { Size } from '../../types';
import clsx from 'clsx';
import s from './tooltip.module.scss';

export const Tooltip = memo<TooltipTypes>(
  ({ content, children, className, style, ...restProps }) => {
    const { tooltip: tooltipConfig = {} } = useConfiguration();

    const cls = clsx(className, tooltipConfig.className);
    const styles = {
      ...tooltipConfig.style,
      ...style,
    };

    const tooltipContent =
      typeof content === 'string' ? (
        <Text.Paragraph
          size={Size.small}
          className={cls}
          style={styles}
          {...restProps}
        >
          {content}
        </Text.Paragraph>
      ) : (
        content
      );

    const childrenElement = children || (
      <button type="button" className={s.QuestionMark}>
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

import { memo, useId } from 'react';
import { useConfiguration } from 'components/configuration';
import { Icon } from 'components/icon';
import { Popover } from 'components/popover';
import { Text } from 'components/text';
import { TooltipTypes } from './Tooltip.types.ts';
import clsx from 'clsx';
import s from './tooltip.module.scss';
import { DOMUtils } from '../../utils';

export const Tooltip = memo<TooltipTypes>(
  ({
    content,
    children,
    className,
    style,
    childrenClassName,
    ...restProps
  }) => {
    const contentId = useId();

    const { tooltip: tooltipConfig = {} } = useConfiguration();

    const cls = clsx(className, tooltipConfig.className);
    const styles = {
      ...tooltipConfig.style,
      ...style,
    };

    const tooltipContent =
      typeof content === 'string' ? (
        <Text.Paragraph id={contentId} size="s" className={cls} style={styles}>
          {content}
        </Text.Paragraph>
      ) : (
        DOMUtils.cloneNode(content, { id: contentId })
      );

    const ariaAttributes = {
      role: 'tooltip',
      ariaLabel: String(content),
    };

    const childrenElement = DOMUtils.cloneNode(children, ariaAttributes) || (
      <button
        type="button"
        role="tooltip"
        aria-label={String(content)}
        className={clsx(s.QuestionMark, childrenClassName)}
      >
        <Icon i="help_outline" />
      </button>
    );

    return (
      <>
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
      </>
    );
  },
);

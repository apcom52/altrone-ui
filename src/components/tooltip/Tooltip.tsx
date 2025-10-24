import { memo, useId, useRef, useState } from 'react';
import { useConfiguration } from 'components/configuration';
import { HelpCircle } from 'lucide-react';
import { Text } from 'components/text';
import { TooltipTypes } from './Tooltip.types.ts';
import clsx from 'clsx';
import s from './tooltip.module.scss';
import { DOMUtils } from '../../utils';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  offset,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'motion/react';

export const Tooltip = memo<TooltipTypes>(
  ({
    content,
    children,
    className,
    style,
    kbd,
    childrenClassName,
    ...restProps
  }) => {
    const [opened, setOpened] = useState(false);

    const contentId = useId();
    const arrowRef = useRef<HTMLDivElement>(null);

    const { tooltip: tooltipConfig = {} } = useConfiguration();

    const { refs, floatingStyles, context } = useFloating({
      open: opened,
      placement: 'top',
      onOpenChange: setOpened,
      middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
      whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context);
    const focus = useFocus(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
    ]);

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
      'aria-label': String(content),
    };

    const safeChildElement = DOMUtils.cloneNode(children, ariaAttributes) || (
      <button
        type="button"
        role="tooltip"
        aria-label={String(content)}
        className={clsx(s.QuestionMark, childrenClassName)}
      >
        <HelpCircle />
      </button>
    );

    const childElement = DOMUtils.cloneNode(safeChildElement, {
      ...getReferenceProps({
        ...safeChildElement.props,
      }),
      ref: (elementRef: HTMLElement) => {
        refs.setReference(elementRef);
      },
      tabIndex: safeChildElement.props.tabIndex ?? 0,
    });

    return (
      <AnimatePresence>
        {childElement}
        {opened && (
          <motion.div
            ref={refs.setFloating}
            style={floatingStyles}
            className={s.Tooltip}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            {...getFloatingProps()}
          >
            {content}
            {kbd ? <span className={s.Kbd}>{kbd}</span> : null}
            <FloatingArrow ref={arrowRef} context={context} tipRadius={2} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

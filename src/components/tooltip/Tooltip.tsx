import React, { memo, useId, useRef, useState } from 'react';
import { useConfiguration } from 'components/configuration';
import { HelpCircle } from 'lucide-react';
import { TooltipProps } from './Tooltip.types.ts';
import clsx from 'clsx';
import s from './tooltip.module.scss';
import { DOMUtils } from '../../utils';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'motion/react';

export const Tooltip = memo(
  ({
    ref,
    content,
    title,
    children,
    className,
    style,
    kbd,
    maxWidth,
    childrenClassName,
    placement = 'top',
  }: TooltipProps) => {
    const [opened, setOpened] = useState(false);
    const tooltipId = useId();

    const arrowRef = useRef<SVGSVGElement>(null);

    const { tooltip: tooltipConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Tooltip,
      { [s.WithTitle]: title },
      className,
      tooltipConfig.className,
    );
    const styles = {
      ...tooltipConfig.style,
      ...style,
      ...(maxWidth !== undefined ? { maxWidth } : undefined),
    };

    const { refs, floatingStyles, context } = useFloating({
      open: opened,
      placement: placement,
      onOpenChange: setOpened,
      middleware: [
        offset(10),
        flip(),
        shift(),
        arrow({ element: arrowRef, padding: -1 }),
      ],
      whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, { delay: { open: 500, close: 0 } });
    const focus = useFocus(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
    ]);

    const safeChildElement = DOMUtils.cloneNode(children, {
      'aria-describedby': tooltipId,
    }) || (
      <button
        type="button"
        aria-describedby={tooltipId}
        aria-label={typeof content === 'string' ? content : undefined}
        className={clsx(s.QuestionMark, childrenClassName)}
      >
        <HelpCircle />
      </button>
    );

    const childElement = DOMUtils.cloneNode(safeChildElement, {
      ...getReferenceProps(
        React.isValidElement(safeChildElement)
          ? (safeChildElement.props as any)
          : {},
      ),
      ref: DOMUtils.composeRefs(refs.setReference, ref),
      tabIndex:
        (React.isValidElement(safeChildElement)
          ? (safeChildElement.props as any).tabIndex
          : undefined) ?? 0,
    });

    return (
      <>
        {childElement}
        <AnimatePresence>
          {opened && (
            <FloatingPortal
              root={
                typeof window !== 'undefined'
                  ? ((document.querySelector(
                      '[data-altrone-root]',
                    ) as HTMLElement) ?? undefined)
                  : undefined
              }
            >
              <motion.div
                ref={refs.setFloating}
                id={tooltipId}
                role="tooltip"
                className={cls}
                style={{ ...floatingStyles, ...styles }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                {...getFloatingProps()}
              >
                {title ? <div className={s.Title}>{title}</div> : null}
                <div className={s.Content}>
                  {content}
                  {kbd ? <span className={s.Kbd}>{kbd}</span> : null}
                </div>
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  tipRadius={4}
                  width={8}
                  height={4}
                />
              </motion.div>
            </FloatingPortal>
          )}
        </AnimatePresence>
      </>
    );
  },
);

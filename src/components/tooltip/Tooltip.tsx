import React, { memo, useRef, useState, forwardRef } from 'react';
import { useConfiguration } from 'components/configuration';
import { HelpCircle } from 'lucide-react';
import { TooltipTypes } from './Tooltip.types.ts';
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
  forwardRef<HTMLElement, TooltipTypes>(
    (
      {
        content,
        children,
        className,
        style,
        kbd,
        childrenClassName,
        placement = 'top',
      },
      ref
    ) => {
      const [opened, setOpened] = useState(false);

      const arrowRef = useRef<HTMLDivElement>(null);

      const { tooltip: tooltipConfig = {} } = useConfiguration();

      const { refs, floatingStyles, context } = useFloating({
        open: opened,
        placement: placement,
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
        ...getReferenceProps(
          React.isValidElement(safeChildElement)
            ? (safeChildElement.props as any)
            : {}
        ),
        ref: (elementRef: HTMLElement) => {
          refs.setReference(elementRef);
          // Передаем ref наружу для правильной работы с Popover
          if (ref && typeof ref === 'function') {
            ref(elementRef);
          } else if (ref && typeof ref === 'object' && ref !== null) {
            (ref as React.MutableRefObject<HTMLElement>).current = elementRef;
          }
        },
        tabIndex:
          (React.isValidElement(safeChildElement)
            ? (safeChildElement.props as any).tabIndex
            : undefined) ?? 0,
      });

      return (
        <>
          {childElement}
          {opened && (
            <FloatingPortal
              root={
                document.querySelector('[data-altrone-root]') as HTMLElement
              }
            >
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
                <FloatingArrow
                  ref={arrowRef as any}
                  context={context}
                  tipRadius={2}
                />
              </motion.div>
            </FloatingPortal>
          )}
        </>
      );
    }
  )
);

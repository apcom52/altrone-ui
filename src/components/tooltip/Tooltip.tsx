import React, {
  memo,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TooltipProps } from './Tooltip.types.ts';
import clsx from 'clsx';
import s from './tooltip.module.scss';
import { DOMUtils, mergeRefs, useBoolean } from '../../utils';
import { useIcons } from '../application/useIcons.tsx';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  OpenChangeReason,
  shift,
  useClick,
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
    triggerClassName,
    triggerStyle,
    triggerIcon,
    placement = 'top',
    defaultOpen = false,
    trigger = ['hover', 'focus'],
    onOpenChange,
    ...restProps
  }: TooltipProps) => {
    const icons = useIcons();
    const { value: opened, setValue: setOpened } = useBoolean(defaultOpen);
    const tooltipId = useId();

    const arrowRef = useRef<SVGSVGElement>(null);
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

    const cls = clsx(s.Tooltip, { [s.WithTitle]: title }, className);
    const styles = {
      ...style,
      ...(maxWidth !== undefined ? { maxWidth } : undefined),
    };

    const triggersList = useMemo(
      () => (Array.isArray(trigger) ? trigger : [trigger]),
      [trigger],
    );

    const commitOpenChange = useCallback(
      (state: boolean, event?: Event, reason?: OpenChangeReason) => {
        setOpened(state);
        onOpenChange?.(state, event, reason);
      },
      [setOpened, onOpenChange],
    );

    const { refs, floatingStyles, context } = useFloating({
      open: opened,
      placement: placement,
      onOpenChange: commitOpenChange,
      middleware: [
        offset(10),
        flip(),
        shift(),
        arrow({ element: arrowRef, padding: -1 }),
      ],
      whileElementsMounted: autoUpdate,
    });

    const hoverTrigger = useHover(context, {
      enabled: triggersList.includes('hover'),
      delay: { open: 500, close: 0 },
    });
    const focusTrigger = useFocus(context, {
      enabled: triggersList.includes('focus'),
    });
    const clickTrigger = useClick(context, {
      enabled: triggersList.includes('click'),
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      hoverTrigger,
      focusTrigger,
      clickTrigger,
    ]);

    const safeChildElement = DOMUtils.cloneNode(children, {
      'aria-describedby': tooltipId,
    }) || (
      <button
        type="button"
        aria-describedby={tooltipId}
        aria-label={typeof content === 'string' ? content : undefined}
        className={clsx(s.QuestionMark, triggerClassName)}
        style={triggerStyle}
      >
        {triggerIcon ?? icons.help}
      </button>
    );

    const setReference = useCallback(
      (element: HTMLElement | null) => {
        refs.setReference(element);
        setPortalRoot(
          (element?.closest('[data-altrone-root]') as HTMLElement) ??
            document.body,
        );
      },
      [refs],
    );

    const childElement = DOMUtils.cloneNode(safeChildElement, {
      ...getReferenceProps({
        ...restProps,
        ...(React.isValidElement(safeChildElement)
          ? (safeChildElement.props as any)
          : {}),
      }),
      /* Merges the child's own `ref` (e.g. `<Button ref={x}>` inside a
         Tooltip) instead of overwriting it — see ref-forwarding.md. */
      ref: mergeRefs(
        React.isValidElement(safeChildElement)
          ? (
              safeChildElement as React.ReactElement<{
                ref?: React.Ref<HTMLElement>;
              }>
            ).props.ref
          : undefined,
        setReference,
        ref,
      ),
      tabIndex:
        (React.isValidElement(safeChildElement)
          ? (safeChildElement.props as any).tabIndex
          : undefined) ?? 0,
    });

    return (
      <>
        {childElement}
        <AnimatePresence>
          {opened && portalRoot && (
            <FloatingPortal root={portalRoot}>
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
                  fill="var(--tooltip-arrow-color)"
                />
              </motion.div>
            </FloatingPortal>
          )}
        </AnimatePresence>
      </>
    );
  },
);

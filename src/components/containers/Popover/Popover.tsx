import './popover.scss';
import { PopoverProps, PopoverContext, PopoverRef, PopoverChildrenContext } from './Popover.types';
import {
  useFloating,
  offset,
  useClick,
  useHover,
  useInteractions,
  useFocus,
  useDismiss,
  autoPlacement,
  FloatingFocusManager,
  safePolygon,
  autoUpdate,
  flip,
  shift,
  size,
  FloatingPortal,
  OpenChangeReason
} from '@floating-ui/react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import clsx from 'clsx';
import { useToggledState } from '../../../hooks';
import { cloneNode } from '../../../utils';
import { CloseButton } from '../../atoms';

/**
 * This component is used to make a dropdown or a small popup
 */
export const Popover = forwardRef<PopoverRef, PopoverProps>((props, popoverRef) => {
  const {
    children,
    content,
    enabled = true,
    title,
    placement = 'auto',
    trigger = 'click',
    useRootContainer = true,
    useFocusTrap = true,
    useParentWidth = false,
    showCloseButton = false,
    className
  } = props;

  const lastStateChangeReason = useRef<OpenChangeReason | undefined>(undefined);

  const childrenRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const triggersList = Array.isArray(trigger) ? trigger : [trigger];

  const {
    value: opened,
    enable: open,
    disable: hide,
    setValue: setOpened
  } = useToggledState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: opened,
    onOpenChange: (state, event, reason) => {
      const hasFocusTrigger = triggersList.includes('focus');

      const skipRule = lastStateChangeReason.current === 'click' && reason === 'reference-press';
      if (!(hasFocusTrigger && skipRule)) {
        setOpened(state);
      }

      lastStateChangeReason.current = reason;
    },
    placement: placement !== 'auto' ? placement : 'top',
    middleware: [
      offset(4),
      placement === 'auto' ? autoPlacement() : flip(),
      shift({
        padding: 4
      }),
      size({
        apply({ rects, elements }) {
          if (useParentWidth) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`
            });
          }
        }
      })
    ],
    whileElementsMounted: autoUpdate
  });

  const clickTrigger = useClick(context, {
    enabled: triggersList.includes('click'),
    event: 'click'
  });

  const hoverTrigger = useHover(context, {
    enabled: triggersList.includes('hover'),
    delay: {
      open: 500,
      close: 250
    },
    handleClose: safePolygon()
  });

  const focusTrigger = useFocus(context, {
    enabled: triggersList.includes('focus'),
    visibleOnly: true
  });

  const dismiss = useDismiss(context, {
    enabled: opened,
    referencePress: true,
    referencePressEvent: 'click'
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clickTrigger,
    hoverTrigger,
    focusTrigger,
    dismiss
  ]);

  useImperativeHandle(
    popoverRef,
    () => ({
      opened,
      childrenNode: childrenRef.current,
      contentNode: contentRef.current
    }),
    [opened]
  );

  const popoverContext: PopoverContext = {
    closePopup: hide
  };

  const showHeader = showCloseButton || title;

  const floatingBox = (
    <FloatingFocusManager
      context={context}
      disabled={!useFocusTrap}
      order={['reference', 'content']}>
      <div
        ref={(elementRef: HTMLDivElement) => {
          refs.setFloating(elementRef);
          contentRef.current = elementRef;
        }}
        style={floatingStyles}
        className={clsx('alt-popover', className)}
        {...getFloatingProps()}>
        {showHeader && (
          <div
            className={clsx('alt-popover__header', {
              'alt-popover__header--with-close-button': showCloseButton
            })}>
            {title ? <div className="alt-popover__title">{title}</div> : null}
            {showCloseButton && <CloseButton onClick={hide} className="alt-popover__close" />}
          </div>
        )}
        <div className="alt-popover__content" ref={contentRef ? contentRef : undefined}>
          {typeof content === 'function' ? content(popoverContext) : content}
        </div>
      </div>
    </FloatingFocusManager>
  );

  const childrenContext: PopoverChildrenContext = {
    opened,
    closePopup: hide
  };
  const originChildElement = typeof children === 'function' ? children(childrenContext) : children;
  const safeChildElement = React.isValidElement(originChildElement) ? (
    originChildElement
  ) : (
    <span>{originChildElement}</span>
  );

  const childrenElement = cloneNode(safeChildElement, {
    ...getReferenceProps({
      ...safeChildElement.props
    }),
    ref: (elementRef: HTMLElement) => {
      refs.setReference(elementRef);
      childrenRef.current = elementRef;
    }
  });

  if (!enabled) {
    return <>{childrenElement}</>;
  }

  return (
    <>
      {childrenElement}
      {opened && (
        <FloatingPortal root={(document.querySelector('.altrone') as HTMLElement) || document.body}>
          {floatingBox}
        </FloatingPortal>
      )}
    </>
  );
});

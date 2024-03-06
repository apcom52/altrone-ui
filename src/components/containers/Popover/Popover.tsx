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
  size
} from '@floating-ui/react';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useToggledState } from '../../../hooks';
import { cloneNode } from '../../../utils';
import { CloseButton } from '../../atoms';

/**
 * This component is used to make a dropdown or a small popup
 */
export const Popover = forwardRef<PopoverRef, PopoverProps>((props, popoverRef) => {
  const oldNode = useRef<HTMLElement | null>(null);

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

  const childrenRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { value: opened, disable: hide, setValue: setOpened } = useToggledState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: opened,
    onOpenChange: (state) => {
      console.log('>> changed to', state);
      setOpened(state);
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

  const triggersList = Array.isArray(trigger) ? trigger : [trigger];

  const clickTrigger = useClick(context, {
    enabled: triggersList.includes('click'),
    event: 'click',
    toggle: true
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
    enabled: triggersList.includes('focus')
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

  useEffect(() => {
    if (!oldNode.current) {
      oldNode.current = childrenRef.current;
    }
  }, [opened]);

  const showHeader = showCloseButton || title;

  const floatingBox = (
    <FloatingFocusManager context={context} disabled={!useFocusTrap}>
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
      onClick: safeChildElement.props?.onClick ? () => safeChildElement.props.onClick() : undefined
    }),
    ref: (elementRef: HTMLElement) => {
      refs.setReference(elementRef);
      childrenRef.current = elementRef;
    }
  });

  if (!enabled) {
    return <>{originChildElement}</>;
  }

  return (
    <>
      {childrenElement}
      {opened &&
        (useRootContainer
          ? createPortal(floatingBox, document.querySelector('.altrone') || document.body)
          : floatingBox)}
    </>
  );
});

import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  offset,
  OpenChangeReason,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useListNavigation,
} from '@floating-ui/react';
import React, {
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  PopoverProps,
  PopoverRef,
  PopoverChildrenContext,
  PopoverContentContext,
} from './Popover.types.ts';
import { useToggledState, cloneNode } from 'utils';
import clsx from 'clsx';
import s from './popover.module.scss';
import { CloseButton } from 'components';
import { PopoverArrow } from './inner/PopoverArrow.tsx';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

const PopoverCloseContext = createContext<undefined | (() => void)>(undefined);
const usePopoverCloseContext = () => useContext(PopoverCloseContext);

const PopoverCurrentIndex = createContext<number | null>(null);
export const usePopoverCurrentIndex = () => useContext(PopoverCurrentIndex);

export const Popover = forwardRef<PopoverRef, PopoverProps>((props, ref) => {
  const {
    children,
    content,
    openedByDefault = false,
    enabled = true,
    title,
    placement = 'auto',
    trigger = 'click',
    focusTrap = true,
    parentWidth = false,
    showCloseButton = false,
    showArrow = false,
    listNavigation: enableListNavigation = false,
    defaultListNavigationIndex = null,
    virtualNavigationFocus = false,
    focusTrapTargets = ['reference', 'content'],
    className,
    style,
    ...restProps
  } = props;

  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultListNavigationIndex,
  );

  const { popover: popoverConfig = {} } = useConfiguration();

  const lastStateChangeReason = useRef<OpenChangeReason | undefined>(undefined);

  const childrenRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const triggersList = Array.isArray(trigger) ? trigger : [trigger];

  const {
    value: opened,
    enable: open,
    disable: hide,
    setValue: setOpened,
  } = useToggledState(openedByDefault);

  const { refs, floatingStyles, context } = useFloating({
    open: opened,
    onOpenChange: (state, _, reason) => {
      const hasFocusTrigger = triggersList.includes('focus');

      const skipRule =
        lastStateChangeReason.current === 'click' &&
        reason === 'reference-press';
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
        padding: 4,
      }),
      size({
        apply({ rects, elements }) {
          if (parentWidth) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          }
        },
      }),
      arrow({
        element: arrowRef,
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const clickTrigger = useClick(context, {
    enabled: triggersList.includes('click'),
    event: 'click',
  });

  const hoverTrigger = useHover(context, {
    enabled: triggersList.includes('hover'),
    delay: {
      open: 500,
      close: 250,
    },
    handleClose: safePolygon(),
  });

  const focusTrigger = useFocus(context, {
    enabled: triggersList.includes('focus'),
    visibleOnly: true,
  });

  const dismiss = useDismiss(context, {
    enabled: opened,
    referencePress: true,
    referencePressEvent: 'click',
  });

  const listNavigationRef = useRef([]);

  const listNavigation = useListNavigation(context, {
    listRef: listNavigationRef,
    enabled: enableListNavigation,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    virtual: virtualNavigationFocus,
    allowEscape: true,
    nested: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clickTrigger,
    hoverTrigger,
    focusTrigger,
    dismiss,
    listNavigation,
  ]);

  useImperativeHandle(
    ref,
    () => ({
      opened,
      context,
      activeIndex,
      childrenNode: childrenRef.current,
      contentNode: contentRef.current,
      closePopup: hide,
      openPopup: open,
    }),
    [opened, context, activeIndex],
  );

  const popoverParentClose = usePopoverCloseContext();
  const parentClosePopover = popoverParentClose ? popoverParentClose : hide;

  const popoverContext: PopoverContentContext = {
    closePopup: hide,
    closeAllSequence: parentClosePopover,
  };

  const showHeader = showCloseButton || title;

  const popoverCls = clsx(
    s.Popover,
    {
      [s.GlassEffect]: !showArrow,
    },
    className,
    popoverConfig.className,
  );

  const floatingBox = (
    <FloatingFocusManager
      context={context}
      disabled={!focusTrap}
      order={focusTrapTargets}
    >
      <FloatingList elementsRef={listNavigationRef}>
        <PopoverCurrentIndex.Provider value={activeIndex}>
          <div
            ref={(elementRef: HTMLDivElement) => {
              refs.setFloating(elementRef);
              contentRef.current = elementRef;
            }}
            className={popoverCls}
            role="region"
            {...getFloatingProps({
              ...restProps,
              style: {
                ...popoverConfig.style,
                ...style,
                ...floatingStyles,
              },
            })}
          >
            {showHeader && (
              <div className={s.Header}>
                {title ? <div className={s.Heading}>{title}</div> : null}
                {showCloseButton ? (
                  <CloseButton onClick={hide} className={s.Close} />
                ) : null}
              </div>
            )}
            <div
              className={s.Content}
              ref={contentRef ? contentRef : undefined}
            >
              {typeof content === 'function'
                ? content(popoverContext)
                : content}
            </div>
            {showArrow && <PopoverArrow ref={arrowRef} context={context} />}
          </div>
        </PopoverCurrentIndex.Provider>
      </FloatingList>
    </FloatingFocusManager>
  );

  const childrenContext: PopoverChildrenContext = {
    opened,
    closePopup: hide,
  };
  const originChildElement =
    typeof children === 'function' ? children(childrenContext) : children;
  const safeChildElement = React.isValidElement(originChildElement) ? (
    originChildElement
  ) : (
    <span>{originChildElement}</span>
  );

  const childrenElement = cloneNode(safeChildElement, {
    ...getReferenceProps({
      ...safeChildElement.props,
    }),
    ref: (elementRef: HTMLElement) => {
      refs.setReference(elementRef);
      childrenRef.current = elementRef;
    },
  });

  if (!enabled) {
    return <>{childrenElement}</>;
  }

  return (
    <PopoverCloseContext.Provider value={parentClosePopover}>
      {childrenElement}
      {opened && (
        <FloatingPortal
          root={
            (document.querySelector('[data-altrone-root]') as HTMLElement) ||
            document.body
          }
        >
          {floatingBox}
        </FloatingPortal>
      )}
    </PopoverCloseContext.Provider>
  );
});

import {
  autoUpdate,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  OpenChangeReason,
  safePolygon,
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
import { useBoolean, DOMUtils } from 'utils';
import clsx from 'clsx';
import s from './popover.module.scss';
import { CloseButton } from 'components/closeButton';
import { PopoverArrow } from './inner/PopoverArrow.tsx';
import { useConfiguration } from 'components/configuration';
import { AnimatePresence, motion } from 'motion/react';
import { getPlacementConfig } from './utils/placementUtils';
import {
  createMiddleware,
  createOverlapMiddleware,
} from './utils/middlewareUtils';

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
    overlap = false,
    className,
    style,
    onOpenChange,
    ...restProps
  } = props;

  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultListNavigationIndex
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
  } = useBoolean(openedByDefault);

  // Получаем конфигурацию для placement
  const placementConfig = getPlacementConfig(placement, overlap);

  // Создаем middleware в зависимости от режима
  const middleware = overlap
    ? createOverlapMiddleware(
        placementConfig,
        arrowRef as React.RefObject<HTMLDivElement>,
        parentWidth
      )
    : createMiddleware(
        placementConfig,
        arrowRef as React.RefObject<HTMLDivElement>,
        parentWidth,
        overlap
      );

  const { refs, context, x, y, strategy } = useFloating({
    open: opened,
    onOpenChange: (state, _, reason) => {
      const hasFocusTrigger = triggersList.includes('focus');

      const skipRule =
        lastStateChangeReason.current === 'click' &&
        reason === 'reference-press';
      if (!(hasFocusTrigger && skipRule)) {
        setOpened(state);
      }

      onOpenChange?.(state);
      lastStateChangeReason.current = reason;
    },
    placement: placementConfig.placement,
    middleware,
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
    [opened, context, activeIndex]
  );

  const popoverParentClose = usePopoverCloseContext();
  const parentClosePopover = popoverParentClose ? popoverParentClose : hide;

  const popoverContext: PopoverContentContext = {
    closePopup: hide,
    closeAllSequence: parentClosePopover,
  };

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

  const showHeader = showCloseButton || title;

  const popoverCls = clsx(
    s.Popover,
    {
      [s.GlassEffect]: !showArrow,
      [s.InsideNotification]: childrenRef.current?.closest(
        '[data-notification="true"]'
      ),
    },
    className,
    popoverConfig.className
  );

  const floatingBox = (
    <FloatingFocusManager
      context={context}
      disabled={!focusTrap}
      order={focusTrapTargets}
    >
      <FloatingList elementsRef={listNavigationRef}>
        <PopoverCurrentIndex.Provider value={activeIndex}>
          <motion.div
            ref={(elementRef: HTMLDivElement) => {
              refs.setFloating(elementRef);
              contentRef.current = elementRef;
            }}
            initial={{
              opacity: 0,
              scale: 0.1,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.4,
                ease: 'backOut',
                bounce: 0.2,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.1,
              transition: {
                duration: 0.15,
                ease: [0.4, 0, 1, 1],
              },
            }}
            className={popoverCls}
            role="region"
            {...getFloatingProps({
              ...restProps,
              style: {
                ...popoverConfig.style,
                ...style,
                // INSERT_YOUR_CODE
                ...(placement
                  ? {
                      transformOrigin: ((...args) => {
                        console.log('>> placement', placement, args);

                        switch (placement) {
                          case 'top-start':
                            return overlap ? 'top left' : 'bottom right';
                          case 'top':
                            return overlap ? 'top center' : 'bottom center';
                          case 'top-end':
                            return overlap ? 'top right' : 'bottom left';
                          case 'bottom-start':
                            return overlap ? 'bottom left' : 'top right';
                          case 'bottom':
                            return overlap ? 'bottom center' : 'top center';
                          case 'bottom-end':
                            return overlap ? 'bottom right' : 'top left';
                          case 'left-start':
                            return overlap ? 'top right' : 'center right';
                          case 'left':
                            return overlap ? 'center left' : 'center right';
                          case 'left-end':
                            return overlap ? 'bottom right' : 'top right';
                          case 'right-start':
                            return overlap ? 'top left' : 'center left';
                          case 'right':
                            return overlap ? 'center right' : 'center left';
                          case 'right-end':
                            return overlap ? 'bottom left' : 'top left';
                          default:
                            return overlap ? 'top left' : 'bottom right';
                        }
                      })(),
                    }
                  : {}),
                // Для overlap режима не используем координаты от FloatingUI
                ...(overlap
                  ? {}
                  : {
                      left: x ?? 0,
                      top: y ?? 0,
                      position: strategy,
                    }),
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
          </motion.div>
        </PopoverCurrentIndex.Provider>
      </FloatingList>
    </FloatingFocusManager>
  );

  const childrenElement = DOMUtils.cloneNode(safeChildElement, {
    ...getReferenceProps({
      ...safeChildElement.props,
    }),
    ref: (elementRef: HTMLElement) => {
      refs.setReference(elementRef);
      childrenRef.current = elementRef;
    },
    tabIndex: safeChildElement.props.tabIndex ?? 0,
  });

  if (!enabled) {
    return <>{childrenElement}</>;
  }

  return (
    <PopoverCloseContext.Provider value={parentClosePopover}>
      {childrenElement}
      <AnimatePresence mode="wait" onExitComplete={() => {}}>
        {opened && (
          <FloatingPortal
            data-test="test"
            root={
              (document.querySelector('[data-altrone-root]') as HTMLElement) ||
              document.body
            }
          >
            {floatingBox}
          </FloatingPortal>
        )}
      </AnimatePresence>
    </PopoverCloseContext.Provider>
  );
});

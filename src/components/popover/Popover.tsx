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
  useContext,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  PopoverProps,
  PopoverChildrenContext,
  PopoverContentContext,
} from './Popover.types.ts';
import { useBoolean, DOMUtils } from 'utils';
import clsx from 'clsx';
import s from './popover.module.scss';
import { CloseButton } from 'components/closeButton';
import { AnimatePresence, motion } from 'motion/react';
import { getPlacementConfig } from './utils/placementUtils';
import {
  createMiddleware,
  createOverlapMiddleware,
} from './utils/middlewareUtils';
import { getTransformOrigin } from './utils/getTransformOrigin';

const PopoverCloseContext = createContext<undefined | (() => void)>(undefined);
const usePopoverCloseContext = () => useContext(PopoverCloseContext);

const PopoverCurrentIndex = createContext<number | null>(null);
export const usePopoverCurrentIndex = () => useContext(PopoverCurrentIndex);

const PopoverCurrentId = createContext<string | null>(null);
export const usePopoverCurrentId = () => useContext(PopoverCurrentId);

export const Popover = ({
  ref,
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
  listNavigation: enableListNavigation = false,
  defaultListNavigationIndex = null,
  virtualNavigationFocus = false,
  focusTrapTargets = ['reference', 'content'],
  overlap = false,
  className,
  style,
  onOpenChange,
  ...restProps
}: PopoverProps) => {
  const popoverId = useId();

  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultListNavigationIndex,
  );

  const lastStateChangeReason = useRef<OpenChangeReason | undefined>(undefined);

  const childrenRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const triggersList = Array.isArray(trigger) ? trigger : [trigger];

  const {
    value: opened,
    enable: open,
    disable: hide,
    setValue: setOpened,
  } = useBoolean(openedByDefault);

  const placementConfig = getPlacementConfig(placement, overlap);

  const middleware = overlap
    ? createOverlapMiddleware(placementConfig, parentWidth)
    : createMiddleware(placementConfig, parentWidth, overlap);

  const {
    refs,
    context,
    x,
    y,
    strategy,
    placement: actualPlacement,
  } = useFloating({
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
      actualPlacement,
      transformOrigin: getTransformOrigin(actualPlacement, overlap),
    }),
    [opened, context, activeIndex, actualPlacement, hide, open, overlap],
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
    s.GlassEffect,
    {
      [s.InsideNotification]: childrenRef.current?.closest(
        '[data-notification="true"]',
      ),
    },
    className,
  );

  const floatingBox = (
    <FloatingFocusManager
      context={context}
      disabled={!focusTrap}
      order={focusTrapTargets}
    >
      <FloatingList elementsRef={listNavigationRef}>
        <PopoverCurrentIndex.Provider value={activeIndex}>
          <PopoverCurrentId.Provider value={popoverId}>
            <motion.div
              ref={(elementRef: HTMLDivElement) => {
                refs.setFloating(elementRef);
                contentRef.current = elementRef;
              }}
              layout="size"
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
              {...getFloatingProps({
                ...restProps,
                style: {
                  ...style,
                  ...{
                    transformOrigin: getTransformOrigin(
                      actualPlacement,
                      overlap,
                    ),
                  },
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
                    <CloseButton
                      label="Close"
                      onClick={hide}
                      className={s.Close}
                    />
                  ) : null}
                </div>
              )}
              <div className={s.Content}>
                {typeof content === 'function'
                  ? content(popoverContext)
                  : content}
              </div>
            </motion.div>
          </PopoverCurrentId.Provider>
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
      <AnimatePresence mode="wait">
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
            {floatingBox}
          </FloatingPortal>
        )}
      </AnimatePresence>
    </PopoverCloseContext.Provider>
  );
};

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
  CSSProperties,
  ReactElement,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { PopoverProps, PopoverChildrenContext } from './Popover.types.ts';
import { useBoolean, DOMUtils, mergeRefs } from 'utils';
import clsx from 'clsx';
import s from './popover.module.scss';
import { Box } from 'components/box';
import { CloseButton } from 'components/closeButton';
import { AnimatePresence, motion, type Transition } from 'motion/react';
import { getPlacementConfig } from './utils/placementUtils';
import {
  createMiddleware,
  createOverlapMiddleware,
} from './utils/middlewareUtils';
import { getTransformOrigin } from './utils/getTransformOrigin';
import {
  PopoverCloseContext,
  PopoverCurrentId,
  PopoverCurrentIndex,
  usePopoverCloseContext,
} from './Popover.context.ts';

export {
  usePopoverCurrentId,
  usePopoverCurrentIndex,
} from './Popover.context.ts';

const ENTER_TRANSITION: Transition = {
  duration: 0.4,
  ease: 'backOut',
  bounce: 0.2,
};

const EXIT_TRANSITION: Transition = {
  duration: 0.15,
  ease: [0.4, 0, 1, 1],
};

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
  role,
  'aria-labelledby': ariaLabelledBy,
  onOpenChange,
  ...restProps
}: PopoverProps) => {
  const popoverId = useId();
  const headingId = `${popoverId}-heading`;

  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultListNavigationIndex,
  );
  const [insideNotification, setInsideNotification] = useState(false);
  /* Portal into the trigger's *own* Altrone root, not the first one in the
     document — a global `querySelector` grabs the wrong instance whenever the
     page has more than one (Storybook Docs, multiple apps) or a stale
     `data-altrone-root` left on `<html>`. Resolved from `.closest()` in
     `setReference`, once the trigger has actually mounted — starting `null`
     and gating the portal on it (below) rather than guessing a root up front
     matters for `openedByDefault`: the trigger (and its ancestor app root)
     haven't committed to the document yet on the very first render, so an
     eager `document.querySelector` here would find nothing and portal that
     first paint into `document.body`, outside the app's token scope
     (unstyled) — fixing itself only once something else re-renders it. */
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const lastStateChangeReason = useRef<OpenChangeReason | undefined>(undefined);

  const childrenRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const triggersList = useMemo(
    () => (Array.isArray(trigger) ? trigger : [trigger]),
    [trigger],
  );

  const {
    value: opened,
    enable: open,
    disable: hide,
    setValue: setOpened,
  } = useBoolean(openedByDefault);

  const placementConfig = useMemo(
    () => getPlacementConfig(placement, overlap),
    [placement, overlap],
  );

  const middleware = useMemo(
    () =>
      overlap
        ? createOverlapMiddleware(placementConfig, parentWidth)
        : createMiddleware(placementConfig, parentWidth),
    [overlap, placementConfig, parentWidth],
  );

  const {
    refs,
    context,
    x,
    y,
    strategy,
    placement: actualPlacement,
  } = useFloating({
    open: opened,
    onOpenChange: (state, event, reason) => {
      /* Workaround: with both `click` and `focus` triggers, a click on the
         reference fires a `reference-press` right after the `click` opened it,
         which would immediately close it. Swallow that specific pair. */
      const hasFocusTrigger = triggersList.includes('focus');
      const skipRule =
        lastStateChangeReason.current === 'click' &&
        reason === 'reference-press';

      if (!(hasFocusTrigger && skipRule)) {
        setOpened(state);
      }

      onOpenChange?.(state, event, reason);
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
    delay: { open: 500, close: 250 },
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
  const closeAllSequence = popoverParentClose ?? hide;

  const childrenContext: PopoverChildrenContext = { opened, closePopup: hide };
  const originChildElement =
    typeof children === 'function' ? children(childrenContext) : children;
  const safeChildElement = React.isValidElement(originChildElement) ? (
    originChildElement
  ) : (
    <span>{originChildElement}</span>
  );

  const showHeader = showCloseButton || Boolean(title);

  const popoverCls = clsx(
    s.Popover,
    { [s.InsideNotification]: insideNotification },
    className,
  );

  const setReference = useCallback(
    (element: HTMLElement | null) => {
      refs.setReference(element);
      childrenRef.current = element;
      setInsideNotification(
        Boolean(element?.closest('[data-notification="true"]')),
      );
      /* Falls back to `document.body` (never stays `null`) so a trigger
         rendered outside any `Application` still opens — matching
         `FloatingPortal`'s own default root. */
      setPortalRoot(
        (element?.closest('[data-altrone-root]') as HTMLElement) ??
          document.body,
      );
    },
    [refs],
  );

  const floatingStyle: CSSProperties = {
    ...style,
    transformOrigin: getTransformOrigin(actualPlacement, overlap),
    left: x ?? 0,
    top: y ?? 0,
    position: strategy,
  };

  const floatingBox = (
    <FloatingFocusManager
      context={context}
      disabled={!focusTrap}
      order={focusTrapTargets}
    >
      <FloatingList elementsRef={listNavigationRef}>
        <PopoverCurrentIndex.Provider value={activeIndex}>
          <PopoverCurrentId.Provider value={popoverId}>
            {/* Box owns the surface: glass fill, backdrop blur, rounded corners
                seeded from `--popover-radius`, and the `overlay` elevation
                (shadow + z-index). The `motion.div` it renders through `asChild`
                keeps the enter/exit + `layout` animation and the floating-ui
                positioning. */}
            <Box
              asChild
              material="plate"
              tone="neutral"
              shape="rounded"
              elevation="overlay"
              radius="var(--popover-radius)"
              padding="var(--space-content)"
              className={popoverCls}
              style={floatingStyle}
              {...getFloatingProps(restProps)}
            >
              <motion.div
                ref={(element: HTMLDivElement) => {
                  refs.setFloating(element);
                  contentRef.current = element;
                }}
                layout="size"
                role={role ?? (showHeader ? 'dialog' : undefined)}
                aria-labelledby={title ? headingId : ariaLabelledBy}
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1, transition: ENTER_TRANSITION }}
                exit={{ opacity: 0, scale: 0.1, transition: EXIT_TRANSITION }}
              >
                {showHeader && (
                  <div className={s.Header}>
                    {title ? (
                      <div className={s.Heading} id={headingId}>
                        {title}
                      </div>
                    ) : null}
                    {showCloseButton ? (
                      <CloseButton onClick={hide} className={s.Close} />
                    ) : null}
                  </div>
                )}
                <div className={s.Content}>
                  {typeof content === 'function'
                    ? content({ closePopup: hide, closeAllSequence })
                    : content}
                </div>
              </motion.div>
            </Box>
          </PopoverCurrentId.Provider>
        </PopoverCurrentIndex.Provider>
      </FloatingList>
    </FloatingFocusManager>
  );

  const childrenElement = DOMUtils.cloneNode(safeChildElement, {
    ...getReferenceProps({ ...safeChildElement.props }),
    ref: mergeRefs(
      (safeChildElement as ReactElement<{ ref?: React.Ref<HTMLElement> }>).props
        .ref,
      setReference,
    ),
    tabIndex: safeChildElement.props.tabIndex ?? 0,
  });

  if (!enabled) {
    return <>{childrenElement}</>;
  }

  return (
    <PopoverCloseContext.Provider value={closeAllSequence}>
      {childrenElement}
      <AnimatePresence mode="wait">
        {opened && portalRoot && (
          <FloatingPortal root={portalRoot}>{floatingBox}</FloatingPortal>
        )}
      </AnimatePresence>
    </PopoverCloseContext.Provider>
  );
};

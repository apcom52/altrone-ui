import React, {
  useCallback,
  useEffect,
  useId,
  type MouseEvent,
  type ReactElement,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import FocusTrap from 'focus-trap-react';
import {
  AnimatePresence,
  motion,
  useReducedMotionConfig,
  type HTMLMotionProps,
  type Transition,
} from 'motion/react';
import { Check } from 'lucide-react';
import { DrawerContext, DrawerProps } from './Drawer.types.ts';
import { CloseButton } from '../closeButton';
import { Button } from '../button';
import { Scrollable } from '../scrollable';
import { DOMUtils, GlobalUtils, useBoolean } from '../../utils';
import { useLocalization } from '../application';
import s from './drawer.module.scss';

/** Distance the panel travels beyond its own width, so it starts fully off-screen. */
const OFFSCREEN_MARGIN = 40;

/**
 * Enter: the slide rides an iOS-style curve (decisive start, soft landing)
 * while the scale eases out past 1 — anchored to the screen edge by
 * `transform-origin`, so the panel reads as inflating out of that edge as it
 * arrives. Exit is a shorter accelerating retreat that shrinks a touch.
 */
const PANEL_ENTER_TRANSITION: Transition = {
  x: { duration: 0.52, ease: [0.32, 0.72, 0, 1] },
  scale: { duration: 0.58, ease: [0.34, 1.56, 0.64, 1] },
};

const PANEL_EXIT_TRANSITION: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 1, 1],
};

const BACKDROP_TRANSITION: Transition = {
  duration: 0.35,
  ease: 'easeOut',
};

const getPortalRoot = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    document.querySelector<HTMLElement>('[data-altrone-root="true"]') ??
    document.body
  );
};

export const Drawer = (props: DrawerProps) => {
  const {
    ref,
    children,
    content,
    footer,
    title,
    placement = 'start',
    width = 400,
    onClose,
    onDone,
    startActions,
    endActions,
    className,
    style,
    ...restProps
  } = props;

  const t = useLocalization();
  const titleId = useId();

  const reducedMotion = useReducedMotionConfig() ?? false;

  const { value: isOpen, enable: open, disable: hide } = useBoolean(false);
  const {
    value: isLoading,
    enable: startLoading,
    disable: stopLoading,
  } = useBoolean(false);

  const handleClose = useCallback(() => {
    hide();
    onClose?.();
  }, [hide, onClose]);

  const drawerContext: DrawerContext = { closeDrawer: handleClose };

  const handleDone = async () => {
    if (onDone === undefined) {
      handleClose();
      return;
    }

    startLoading();
    const result = await onDone();
    stopLoading();
    if (result !== false) {
      handleClose();
    }
  };

  const contentElement =
    typeof content === 'function' ? content(drawerContext) : content;
  const footerElement =
    typeof footer === 'function' ? footer(drawerContext) : footer;
  const startActionsElement =
    typeof startActions === 'function'
      ? startActions(drawerContext)
      : startActions;
  const endActionsElement =
    typeof endActions === 'function' ? endActions(drawerContext) : endActions;

  /** `onDone` renders a Done button in the end slot unless `endActions` takes it over. */
  const endContent =
    endActionsElement ??
    (onDone !== undefined ? (
      <Button
        icon={<Check />}
        variant="submit"
        label={t('common.done')}
        showLabel={false}
        onClick={handleDone}
        state={isLoading ? 'loading' : 'idle'}
      />
    ) : null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.body.addEventListener('keydown', onKeyDown);
    return () => document.body.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  /**
   * The resting edge inset lives in CSS (`.Panel` left/right), so `x: 0` is the
   * settled position — keeping it out of the transform means the drawer stays
   * correctly inset even when reduced motion drops the animation entirely.
   */
  const initialX =
    placement === 'start'
      ? -(width + OFFSCREEN_MARGIN)
      : width + OFFSCREEN_MARGIN;

  const panelAnimation: HTMLMotionProps<'div'> = reducedMotion
    ? {}
    : {
        initial: { x: initialX, scale: 0.85 },
        animate: { x: 0, scale: 1, transition: PANEL_ENTER_TRANSITION },
        exit: { x: initialX, scale: 0.88, transition: PANEL_EXIT_TRANSITION },
      };

  const backdropAnimation: HTMLMotionProps<'div'> = reducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: BACKDROP_TRANSITION,
      };

  const safeChild = children as ReactElement<{
    onClick?: React.MouseEventHandler;
  }>;
  const triggerElement = DOMUtils.cloneNode(safeChild, {
    onClick: (event: MouseEvent<HTMLElement>) => {
      safeChild.props.onClick?.(event);
      open();
    },
  });

  const portalRoot = getPortalRoot();

  const drawer = (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={ref}
          className={clsx(
            s.Drawer,
            { [s.End]: placement === 'end' },
            className,
          )}
          style={style}
          {...restProps}
        >
          <motion.div
            className={s.Backdrop}
            onClick={handleClose}
            {...backdropAnimation}
          />
          <FocusTrap
            focusTrapOptions={{
              /**
               * Without this, focus-trap swallows pointer events landing
               * outside the trap, so a click on the backdrop never reaches its
               * own `onClick` and wouldn't close the drawer.
               */
              allowOutsideClick: true,
              tabbableOptions: {
                displayCheck: GlobalUtils.isTestEnvironment() ? 'none' : 'full',
              },
            }}
          >
            <motion.div
              className={s.Panel}
              style={{ width: `${width}px` }}
              {...panelAnimation}
            >
              <div
                className={s.Body}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
              >
                <div className={s.Header}>
                  <div className={s.HeaderSide}>
                    <CloseButton onClick={handleClose} />
                    {startActionsElement}
                  </div>
                  <div className={s.Title} id={titleId}>
                    {title}
                  </div>
                  <div className={clsx(s.HeaderSide, s.HeaderEnd)}>
                    {endContent}
                  </div>
                </div>
                <div className={s.Content}>
                  <Scrollable>
                    <div className={s.ScrollInset}>{contentElement}</div>
                  </Scrollable>
                </div>
                {footerElement && <div className={s.Footer}>{footerElement}</div>}
              </div>
            </motion.div>
          </FocusTrap>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {triggerElement}
      {portalRoot ? createPortal(drawer, portalRoot) : null}
    </>
  );
};

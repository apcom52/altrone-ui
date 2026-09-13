import React, {
  useCallback,
  useEffect,
  useId,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
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
import { ModalContext, ModalProps } from './Modal.types.ts';
import { CloseButton } from '../closeButton';
import { Button } from '../button';
import { DOMUtils, GlobalUtils, useBoolean } from '../../utils';
import { useLocalization } from '../application';
import s from './modal.module.scss';

/** The panel drops in from above its resting spot, overshooting slightly. */
const PANEL_INITIAL = { y: -48, scale: 0.96 };
const PANEL_ENTER = { y: 0, scale: 1 };
const PANEL_ENTER_TRANSITION: Transition = {
  duration: 0.42,
  ease: 'backOut',
  bounce: 0.3,
};

/** Anticipation: a small dip, then the panel retracts back up and shrinks. */
const PANEL_EXIT_KEYFRAMES = {
  scale: [1, 0.99, 0.94],
  y: [0, 10, -64],
};
const PANEL_EXIT_TRANSITION: Transition = {
  duration: 0.24,
  ease: 'easeIn',
  times: [0, 0.3, 1],
};

const hasRenderableNodes = (node: ReactNode) =>
  Array.isArray(node) ? node.some(Boolean) : Boolean(node);

const getPortalRoot = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    document.querySelector<HTMLElement>('[data-altrone-root="true"]') ??
    document.body
  );
};

export const Modal = (props: ModalProps) => {
  const {
    ref,
    children,
    content,
    enabled = true,
    openedByDefault = false,
    title,
    leftActions,
    actions,
    size = 'm',
    className,
    style,
    onClick,
    onClose,
    showCancelButton = true,
    ...restProps
  } = props;

  const t = useLocalization();
  const titleId = useId();

  /**
   * MotionConfig's `reducedMotion="user"` only freezes transform/layout values —
   * the backdrop opacity fade would still play. When reduced motion is asked
   * for, we drop the animation props entirely so `AnimatePresence` mounts and
   * unmounts the tree with no transition at all.
   */
  const reducedMotion = useReducedMotionConfig() ?? false;

  const overlayAnimation: HTMLMotionProps<'div'> = reducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.25 } },
        exit: {
          opacity: 0,
          transition: { duration: 0.22, ease: 'easeIn' },
        },
      };

  const panelAnimation: HTMLMotionProps<'div'> = reducedMotion
    ? {}
    : {
        initial: PANEL_INITIAL,
        animate: { ...PANEL_ENTER, transition: PANEL_ENTER_TRANSITION },
        exit: { ...PANEL_EXIT_KEYFRAMES, transition: PANEL_EXIT_TRANSITION },
      };

  const {
    value: opened,
    enable: open,
    disable: hide,
  } = useBoolean(openedByDefault);

  const handleClose = useCallback(() => {
    hide();
    onClose?.();
  }, [hide, onClose]);

  const modalContext: ModalContext = { closeModal: handleClose };

  const contentElement =
    typeof content === 'function' ? content(modalContext) : content;
  const leftActionsElement =
    typeof leftActions === 'function' ? leftActions(modalContext) : leftActions;
  const actionsElement =
    typeof actions === 'function' ? actions(modalContext) : actions;

  const hasLeftActions = hasRenderableNodes(leftActionsElement);
  const showFooter =
    showCancelButton || hasLeftActions || hasRenderableNodes(actionsElement);

  let triggerElement: React.ReactNode = null;
  if (children != null) {
    const safeChild = (
      React.isValidElement(children) ? children : <span>{children}</span>
    ) as ReactElement<{ onClick?: React.MouseEventHandler }>;

    triggerElement = DOMUtils.cloneNode(safeChild, {
      onClick: (event: MouseEvent<HTMLElement>) => {
        safeChild.props.onClick?.(event);
        open();
      },
    });
  }

  const onBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    /**
     * Close only on a click that lands on the backdrop itself. A DOM `closest()`
     * check would also close on clicks inside overlays the modal content opens
     * (Select menu, Popover, …) — those portal out of `.ModalContent`, so they
     * look "outside" in the DOM even though they belong to the modal.
     */
    if (event.target === event.currentTarget) {
      handleClose();
    }

    onClick?.(event);
  };

  useEffect(() => {
    if (!opened) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.body.addEventListener('keydown', onKeyDown);
    return () => document.body.removeEventListener('keydown', onKeyDown);
  }, [opened, handleClose]);

  const portalRoot = getPortalRoot();

  const modalContent = (
    <AnimatePresence>
      {opened && (
        <div
          ref={ref}
          className={clsx(
            s.Backdrop,
            {
              [s.Small]: size === 's',
              [s.Large]: size === 'l',
            },
            className,
          )}
          style={style}
          {...restProps}
          onClick={onBackdropClick}
        >
          <motion.div className={s.Overlay} {...overlayAnimation} />
          <FocusTrap
            focusTrapOptions={{
              /**
               * Without this, focus-trap cancels pointer events landing outside
               * the trap — the backdrop's own `onClick` never fires, so a click
               * on the backdrop wouldn't close the modal.
               */
              allowOutsideClick: true,
              tabbableOptions: {
                displayCheck: GlobalUtils.isTestEnvironment() ? 'none' : 'full',
              },
            }}
          >
            <motion.div
              className={s.Dialog}
              /**
               * No opacity on the panel: an ancestor with opacity < 1 flattens
               * its subtree into a single group, which kills the panel's
               * `backdrop-filter` for the duration of the fade. The overlay
               * fade already covers the "appearing" beat.
               */
              {...panelAnimation}
            >
              <div
                className={s.ModalContent}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
              >
                <div className={s.Title} id={titleId}>
                  {title}
                  <CloseButton
                    className={s.Close}
                    onClick={handleClose}
                    autoFocus
                  />
                </div>
                <div className={s.Content}>{contentElement}</div>
                {showFooter && (
                  <div className={s.Footer}>
                    {hasLeftActions && (
                      <div className={s.LeftFooter}>{leftActionsElement}</div>
                    )}
                    <div className={s.RightFooter}>
                      {showCancelButton && (
                        <Button
                          label={t('common.cancel')}
                          onClick={handleClose}
                        />
                      )}
                      {actionsElement}
                    </div>
                  </div>
                )}
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
      {enabled && portalRoot ? createPortal(modalContent, portalRoot) : null}
    </>
  );
};

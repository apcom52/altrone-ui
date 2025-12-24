import React, { memo, useEffect, useId, MouseEvent } from 'react';
import { ModalContext, ModalProps } from './Modal.types.ts';
import { CloseButton } from '../closeButton';
import { Button } from '../button';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { DOMUtils, GlobalUtils, useBoolean } from '../../utils';
import { createPortal } from 'react-dom';
import s from './modal.module.scss';
import FocusTrap from 'focus-trap-react';
import { useLocalization } from '../application';
import { AnimatePresence, motion } from 'motion/react';

export const Modal = memo<ModalProps>(
  ({
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
  }) => {
    const t = useLocalization();

    const titleId = useId();

    const { modal: modalConfig = {} } = useConfiguration();
    const {
      value: opened,
      disable: hide,
      enable: show,
    } = useBoolean(openedByDefault);

    const cls = clsx(
      s.Backdrop,
      {
        [s.Small]: size === 's',
        [s.Large]: size === 'l',
      },
      className,
      modalConfig.className
    );

    const styles = {
      ...modalConfig.style,
      ...style,
    };

    const originChildElement = children;
    const safeChildElement = React.isValidElement(originChildElement) ? (
      originChildElement
    ) : (
      <span>{originChildElement}</span>
    );

    const childrenElement = DOMUtils.cloneNode(safeChildElement, {
      onClick: show,
    });

    const onCloseHandler = () => {
      hide();
      if (onClose) onClose();
    };

    const modalContext: ModalContext = { closeModal: onCloseHandler };

    const contentElement =
      typeof content === 'function' ? content(modalContext) : content;
    const leftActionsElement =
      typeof leftActions === 'function'
        ? leftActions(modalContext)
        : leftActions;
    const actionsElement =
      typeof actions === 'function' ? actions(modalContext) : actions;

    const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
      if (!(e.target as HTMLElement)?.closest('[aria-modal="true"]')) {
        onCloseHandler();
      }

      if (onClick) onClick(e);
    };

    const onKeyboardHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseHandler();
      }
    };

    useEffect(() => {
      if (opened) {
        document.body.addEventListener('keydown', onKeyboardHandler);
      }

      return () => {
        document.body.removeEventListener('keydown', onKeyboardHandler);
      };
    }, [opened]);

    const modalContent = (
      <FocusTrap
        focusTrapOptions={{
          tabbableOptions: {
            displayCheck: GlobalUtils.isTestEnvironment() ? 'none' : 'full',
          },
        }}
      >
        <AnimatePresence onExitComplete={onCloseHandler}>
          <div
            className={cls}
            style={styles}
            role="dialog"
            aria-labelledby={titleId}
            {...restProps}
            onClick={onBackdropClick}
          >
            <motion.div
              className={s.Overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={s.Dialog}
            >
              <div className={s.ModalContent} aria-modal="true">
                <div className={s.Title} id={titleId} aria-label={title}>
                  {title}
                  <CloseButton
                    className={s.Close}
                    onClick={onCloseHandler}
                    autoFocus
                  />
                </div>
                <div className={s.Content}>{contentElement}</div>
                <div className={s.Footer}>
                  <div className={s.LeftFooter}>{leftActionsElement}</div>
                  <div className={s.RightFooter}>
                    {showCancelButton && (
                      <Button
                        label={t('common.cancel')}
                        onClick={onCloseHandler}
                      />
                    )}
                    {actionsElement}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      </FocusTrap>
    );

    const altroneRoot =
      document.querySelector('[data-altrone-root="true"]') || document.body;

    if (!enabled) {
      return <>{childrenElement}</>;
    }

    return (
      <>
        {childrenElement}
        {opened ? createPortal(modalContent, altroneRoot) : null}
      </>
    );
  }
);

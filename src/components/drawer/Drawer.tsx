import { cloneElement, useState } from 'react';
import { DrawerProps } from './Drawer.types';
import s from './drawer.module.scss';
import { AnimatePresence, motion } from 'motion/react';
import { CloseButton } from 'components/closeButton';
import { Button } from 'components/button';
import { Check } from 'lucide-react';
import { Scrollable } from 'components/scrollable';
import clsx from 'clsx';
import { useBoolean } from 'utils';
import { createPortal } from 'react-dom';

export const Drawer = (props: DrawerProps) => {
  const {
    children,
    content,
    footer,
    title,
    placement = 'start',
    width = 400,
    onClose,
    onDone,
    renderActionButton,
    className,
    ...rest
  } = props;

  const { value: isOpen, setValue: setIsOpen } = useBoolean(false);
  const {
    value: isLoading,
    enable: startLoading,
    disable: stopLoading,
  } = useBoolean(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const initialPosition = placement === 'start' ? -width - 40 : width + 40;
  const animatePosition = placement === 'start' ? 8 : -8;

  const handleDone = async () => {
    if (onDone === undefined) {
      handleClose();
      return;
    }

    startLoading();
    const result = await onDone?.();
    stopLoading();
    if (result === false) {
      return;
    }

    if (result) {
      handleClose();
    }
  };

  const cls = clsx(
    s.Drawer,
    {
      [s.EndSide]: placement === 'end',
    },
    className
  );

  const altroneRoot =
    document.querySelector('[data-altrone-root="true"]') || document.body;

  return (
    <>
      {cloneElement(children, {
        onClick: () => setIsOpen(true),
      })}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className={s.DrawerWrapper}>
              <motion.div
                className={s.Backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
              />
              <motion.div
                className={cls}
                initial={{ x: initialPosition, scale: 0.8 }}
                animate={{ x: animatePosition, scale: 1 }}
                exit={{ x: initialPosition, scale: 0.8 }}
                style={{
                  width: `${width}px`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 20,
                  mass: 0.75,
                }}
              >
                <div className={s.DrawerBody}>
                  <div className={s.DrawerHeader}>
                    <CloseButton onClick={handleClose} />
                    <div className={s.DrawerTitle}>{title}</div>
                    {renderActionButton ? (
                      renderActionButton({ closeDrawer: handleClose })
                    ) : onDone ? (
                      <Button
                        icon={<Check />}
                        variant="submit"
                        label="Done"
                        showLabel={false}
                        onClick={handleDone}
                        state={isLoading ? 'loading' : 'idle'}
                      />
                    ) : null}
                  </div>
                  <div className={s.DrawerContent}>
                    <Scrollable className={s.Content}>{content}</Scrollable>
                  </div>
                  {footer && <div className={s.DrawerFooter}>{footer}</div>}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        altroneRoot
      )}
    </>
  );
};

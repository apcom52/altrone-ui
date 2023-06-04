import { forwardRef, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import './floating-box.scss';
import { useOutsideClick } from 'rooks';
import { Options, State } from '@popperjs/core';
import { createPortal } from 'react-dom';
import { useWindowSize } from '../../../hooks';
import { Modal } from '../Modal';
import clsx from 'clsx';
import { Surface } from '../../../types';

export enum FloatingBoxMobileBehaviour {
  default = 'default',
  modal = 'modal'
}

interface FloatingBoxProps extends React.PropsWithChildren {
  targetElement: HTMLElement | null;
  onClose: () => void;
  offset?: number;
  placement?: Options['placement'];
  popperProps?: Omit<Partial<Options>, 'modifiers'>;
  useParentWidth?: boolean;
  minWidth?: number | string;
  maxHeight?: number | string;
  useRootContainer?: boolean;
  preventClose?: (e: MouseEvent) => boolean;
  mobileBehaviour?: FloatingBoxMobileBehaviour;
  closeOnAnotherFloatingBoxClick?: boolean;
  className?: string;
  surface?: Surface;
}

const setPopperWidth = (state: State, minWidth: FloatingBoxProps['minWidth']) => {
  const targetRefWidth = state.elements.reference.getBoundingClientRect().width;

  state.elements.popper.style.width = `${
    minWidth ? (targetRefWidth < minWidth ? minWidth : targetRefWidth) : targetRefWidth
  }px`;
};

const FloatingBox = forwardRef<
  Partial<HTMLDivElement> & { modifiers?: Options['modifiers'] },
  FloatingBoxProps
>(
  (
    {
      targetElement,
      onClose,
      offset = 4,
      placement = 'auto',
      popperProps,
      useParentWidth = false,
      minWidth,
      maxHeight = 'auto',
      children,
      preventClose,
      useRootContainer = false,
      mobileBehaviour = FloatingBoxMobileBehaviour.default,
      closeOnAnotherFloatingBoxClick = false,
      className,
      surface = Surface.glass
    },
    ref
  ) => {
    const { ltePhoneL } = useWindowSize();

    const [floatingBoxElement, setFloatingBoxElement] = useState<HTMLDivElement | null>(null);

    if (floatingBoxElement) {
      if (typeof ref === 'function') {
        ref(floatingBoxElement);
      } else if (ref) {
        ref.current = floatingBoxElement;
      }
    }

    const offsets: [number, number] = useMemo(() => {
      return [0, offset];
    }, [offset]);

    const modifiers = useMemo<Options['modifiers']>(() => {
      const result: Options['modifiers'] = [
        {
          name: 'offset',
          options: {
            offset: offsets
          }
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 4
          }
        }
      ];

      if (useParentWidth) {
        result.push({
          name: 'sameWidth',
          enabled: true,
          fn: ({ state }) => {
            setPopperWidth(state, minWidth);
          },
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          effect: ({ state }) => {
            setPopperWidth(state, minWidth);
          }
        });
      }

      return result;
    }, [offsets, useParentWidth, minWidth]);

    const { styles, attributes } = usePopper(targetElement, floatingBoxElement, {
      modifiers,
      placement,
      ...popperProps
    });

    useOutsideClick({ current: floatingBoxElement }, (e: MouseEvent) => {
      if (!closeOnAnotherFloatingBoxClick && (e.target as Element)?.closest('.alt-floating-box')) {
        return;
      }

      if (preventClose && preventClose(e)) {
        return;
      }

      setTimeout(() => {
        onClose();
      }, 1);
    });

    if (mobileBehaviour === FloatingBoxMobileBehaviour.modal && ltePhoneL) {
      return createPortal(
        <Modal onClose={onClose} showClose={false} showCancel={false}>
          {children}
        </Modal>,
        targetElement?.closest('.altrone') || document.body
      );
    }

    return createPortal(
      <div
        className={clsx('alt-floating-box', className, {
          [`alt-floating-box--surface-${surface}`]: surface !== Surface.glass
        })}
        ref={(node: HTMLDivElement) => {
          setFloatingBoxElement(node);
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        style={{
          ...styles.popper,
          maxHeight
        }}
        data-testid="alt-test-floating-box"
        {...attributes.popper}>
        {children}
      </div>,
      useRootContainer || !targetElement
        ? targetElement?.closest('.altrone') || document.body
        : targetElement.parentElement || document.body
    );
  }
);

FloatingBox.displayName = 'FloatingBox';

export default FloatingBox as typeof FloatingBox;

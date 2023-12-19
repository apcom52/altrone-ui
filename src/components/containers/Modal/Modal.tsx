import {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { Align, Elevation, Role, Size, Surface } from '../../../types';
import './modal.scss';
import { Icon } from '../../typography';
import { Button } from '../../form';
import clsx from 'clsx';
import { useLocalization, useToggledState, useWindowSize } from '../../../hooks';
import ReactDOM from 'react-dom';
import { useAltrone } from '../../../contexts';
import { motion } from 'framer-motion';
import { END_DESKTOP, END_MOBILE, INITIAL_DESKTOP, INITIAL_MOBILE } from './Modal.constants';
import { getValueFromSequence } from '../../../utils/getValueFromSequence';

export interface ModalAction {
  label: string;
  onClick: () => void;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  align?: Align;
  role?: Role;
  disabled?: boolean;
}

interface ModalProps extends PropsWithChildren {
  onClose: () => void;
  title?: string;
  size?: Size;
  fluid?: boolean;
  actions?: ModalAction[];
  showClose?: boolean;
  showCancel?: boolean;
  closeOnOverlay?: boolean;
  reduceMotion?: boolean;
  className?: string;
  surface?: Surface;
  elevation?: Elevation;
}

const CLS_UTIL_NOSCROLL = 'alt-util--no-scroll';

/**
 * This components is used to show windows with content over the application
 * @param title
 * @param children
 * @param onClose
 * @param size
 * @param fluid
 * @param actions
 * @param showClose
 * @param showCancel
 * @param closeOnOverlay
 * @param reduceMotion
 * @param className
 * @param surface
 * @param elevation
 * @constructor
 */
const Modal = ({
  title,
  children,
  onClose,
  size = Size.medium,
  fluid = false,
  actions = [],
  showClose = true,
  showCancel = true,
  closeOnOverlay = true,
  reduceMotion,
  className,
  surface = Surface.glass,
  elevation = Elevation.floating
}: ModalProps) => {
  const { ltePhoneL, gtPhoneL } = useWindowSize();
  const t = useLocalization();

  const { options } = useAltrone();

  const _reduceMotion = getValueFromSequence(
    false,
    options.modal.reduceMotion,
    options.global.reduceMotion
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { value: opened, disable: hideModal } = useToggledState(true);

  useEffect(() => {
    document.body.classList.add(CLS_UTIL_NOSCROLL);
    document.body.addEventListener('keypress', onESCPress);

    return () => {
      document.body.classList.remove(CLS_UTIL_NOSCROLL);
      document.body.removeEventListener('keypress', onESCPress);
    };
  }, []);

  const [leftActions, rightActions] = useMemo(() => {
    const leftActions: ModalAction[] = [];
    const rightActions: ModalAction[] = [];

    actions.forEach((action) => {
      if (action.align === Align.start) {
        leftActions.push(action);
      } else {
        rightActions.push(action);
      }
    });

    return [leftActions, rightActions];
  }, [actions]);

  const renderActions = (actions: ModalAction[]) => {
    return actions.map((action, actionIndex) => (
      <Button
        key={actionIndex}
        leftIcon={action.leftIcon}
        rightIcon={action.rightIcon}
        role={action.role}
        onClick={action.onClick}
        disabled={action.disabled}>
        {action.label}
      </Button>
    ));
  };

  const onAnimationComplete = useCallback(() => {
    if (!opened) {
      onClose();
    }
  }, [opened, onClose]);

  const onESCPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideModal();
      }
    },
    [onClose]
  );

  const onBackdropClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (closeOnOverlay && e.target === wrapperRef.current) {
      hideModal();
    }
  };

  const _showCancel = showCancel || (!closeOnOverlay && !showClose);

  let modalAnimation = {};

  if (ltePhoneL) {
    modalAnimation = opened ? END_MOBILE : INITIAL_MOBILE;
  } else {
    modalAnimation = opened ? END_DESKTOP : INITIAL_DESKTOP;
  }

  const transitionDuration = options.global.transitionDuration
    ? options.global.transitionDuration / 1000
    : 0;

  return ReactDOM.createPortal(
    <motion.div
      className="alt-modal-wrapper"
      ref={wrapperRef}
      onClick={closeOnOverlay ? onBackdropClick : undefined}
      initial={
        gtPhoneL && {
          opacity: 0
        }
      }
      animate={
        gtPhoneL && {
          opacity: opened ? 1 : 0
        }
      }
      transition={
        _reduceMotion
          ? { duration: 0, ease: 'linear' }
          : { duration: transitionDuration, ease: 'easeOut' }
      }
      data-testid="alt-test-modalWrapper">
      <div className="alt-modal-wrapper__backdrop">
        <motion.div
          className={clsx('alt-modal', className, {
            'alt-modal--size-small': size === Size.small,
            'alt-modal--size-large': size === Size.large,
            'alt-modal--fluid': fluid,
            [`alt-modal--surface-${surface}`]: surface !== Surface.glass,
            [`alt-modal--elevation-${elevation}`]: elevation !== Elevation.floating
          })}
          initial={ltePhoneL ? INITIAL_MOBILE : INITIAL_DESKTOP}
          animate={modalAnimation}
          onAnimationComplete={onAnimationComplete}
          ref={modalRef}
          transition={
            _reduceMotion
              ? { duration: 0, ease: 'linear' }
              : { duration: transitionDuration, ease: 'easeOut' }
          }
          data-testid="alt-test-modal">
          {title && (
            <div className="alt-modal__title" data-testid="alt-test-modal-title">
              {title}
            </div>
          )}
          {showClose && gtPhoneL && (
            <button
              className="alt-modal__close"
              type="button"
              onClick={hideModal}
              data-testid="alt-test-modal-close">
              <Icon i="close" />
            </button>
          )}

          <div className="alt-modal__content" data-testid="alt-test-modal-content">
            {children}
          </div>
          {(_showCancel || actions.length > 0) && (
            <div className="alt-modal__footer">
              {renderActions(leftActions)}
              <div className="alt-modal__footer-separator" />
              {((_showCancel && gtPhoneL) || _showCancel || ltePhoneL) && (
                <Button
                  onClick={hideModal}
                  className="alt-modal__cancel"
                  data-testid="alt-test-modal-cancel">
                  {t('common.cancel')}
                </Button>
              )}
              {renderActions(rightActions)}
            </div>
          )}
          {ltePhoneL && <div className="alt-modal-wrapper__handle" />}
        </motion.div>
      </div>
    </motion.div>,
    document.body.querySelector('.altrone') || document.body
  );
};

export default Modal;

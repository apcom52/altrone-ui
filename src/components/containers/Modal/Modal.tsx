import {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { Align, Elevation, Role, Size, Surface } from '../../../types';
import './modal.scss';
import { Icon } from '../../typography';
import { Button } from '../../form';
import clsx from 'clsx';
import { useLocalization, useWindowSize } from '../../../hooks';
import ReactDOM from 'react-dom';
import { useThemeContext } from '../../../contexts';

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

const CLS_OPENED = 'alt-modal--opened';
const CLS_UTIL_NOSCROLL = 'alt-util--no-scroll';
const HIDE_DURATION = 300;

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

  const { options } = useThemeContext();

  const _reduceMotion =
    typeof reduceMotion === 'undefined'
      ? options.modal?.reduceMotion || options.global?.reduceMotion
      : reduceMotion;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(_reduceMotion);

  useEffect(() => {
    document.body.classList.add(CLS_UTIL_NOSCROLL);
    document.body.addEventListener('keypress', onESCPress);

    return () => {
      document.body.classList.remove(CLS_UTIL_NOSCROLL);
      document.body.removeEventListener('keypress', onESCPress);
    };
  }, []);

  useEffect(() => {
    if (!opened) {
      modalRef.current?.classList.add(CLS_OPENED);
      setTimeout(() => {
        setOpened(true);
      }, 200);
    }
  });

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

  const handleClose = useCallback(() => {
    modalRef.current?.classList.remove(CLS_OPENED);
    if (_reduceMotion) {
      onClose();
    } else {
      setTimeout(() => {
        onClose();
      }, HIDE_DURATION);
    }
  }, []);

  const onESCPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [onClose]
  );

  const onBackdropClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (closeOnOverlay && e.target === wrapperRef.current) {
      handleClose();
    }
  };

  const _showCancel = showCancel || (!closeOnOverlay && !showClose);

  return ReactDOM.createPortal(
    <div
      className="alt-modal-wrapper"
      ref={wrapperRef}
      onClick={closeOnOverlay ? onBackdropClick : undefined}>
      <div
        className={clsx('alt-modal', className, {
          'alt-modal--size-small': size === Size.small,
          'alt-modal--size-large': size === Size.large,
          'alt-modal--fluid': fluid,
          [`alt-modal--surface-${surface}`]: surface !== Surface.glass,
          [`alt-modal--elevation-${elevation}`]: elevation !== Elevation.floating,
          'alt-modal--opened': opened
        })}
        ref={modalRef}
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
            onClick={handleClose}
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
                onClick={handleClose}
                className="alt-modal__cancel"
                data-testid="alt-test-modal-cancel">
                {t('common.cancel')}
              </Button>
            )}
            {renderActions(rightActions)}
          </div>
        )}
        {ltePhoneL && <div className="alt-modal-wrapper__handle" />}
      </div>
    </div>,
    document.body.querySelector('.altrone') || document.body
  );
};

export default Modal;

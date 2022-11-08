import {memo, ReactNode, useEffect, useMemo, useRef} from "react";
import {Align} from "../../../types/Align";
import {Role, Size} from "../../../types";
import './modal.scss';
import {Icon} from "../../icons";
import {Button} from "../../button";
import clsx from "clsx";
import {useWindowSize} from "../../../hooks";

interface ModalProps {
  children: JSX.Element | JSX.Element[]
  onClose: () => void
  title?: string
  size?: Size
  fluid?: boolean
  actions?: {
    label: string,
    onClick: () => null
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    align?: Align
    role?: Role
  }[]
  showClose?: boolean
  showCancel?: boolean
  closeOnOverlay?: boolean
}

const Modal = ({ title, children, onClose, size = Size.medium, fluid = false, actions = [], showClose = true, showCancel = true, closeOnOverlay = true }: ModalProps) => {
  const { ltePhoneL, gtPhoneL } = useWindowSize()

  const wrapperRef = useRef(null)

  useEffect(() => {
    document.body.classList.add('alt-util--no-scroll')

    return () => {
      document.body.classList.remove('alt-util--no-scroll')
    }
  }, [])

  const [leftActions, rightActions] = useMemo(() => {
    const leftActions = []
    const rightActions = []

    actions.forEach(action => {
      if (action.align === Align.start) {
        leftActions.push(action)
      } else {
        rightActions.push(action)
      }
    })

    return [leftActions, rightActions]
  }, [actions])

  const renderActions = (actions) => {
    return actions.map((action, actionIndex) => (
      <Button
        key={actionIndex}
        leftIcon={action.leftIcon}
        rightIcon={action.rightIcon}
        style={action.role}
        onClick={action.onClick}
      >
        {action.label}
      </Button>
    ))
  }

  const onBackdropClick = e => {
    if (closeOnOverlay && e.target === wrapperRef.current) {
      onClose()
    }
  }

  return <div className='alt-modal-wrapper' ref={wrapperRef} onClick={closeOnOverlay && onBackdropClick}>
    <div className={clsx('alt-modal', {
      'alt-modal--size-small': size === Size.small,
      'alt-modal--size-large': size === Size.large,
      'alt-modal--fluid': fluid
    })}>
      {title && <div className="alt-modal__title">{title}</div>}
      {showClose && gtPhoneL && <button className='alt-modal__close' type='button' onClick={onClose}><Icon i='close' /></button>}
      <div className="alt-modal__content">
        {children}
      </div>
      {(showCancel || actions.length > 0) && <div className='alt-modal__footer'>
        {renderActions(leftActions)}
        <div className="alt-modal__footer-separator" />
        {(showCancel && gtPhoneL) || (showClose || ltePhoneL) && <Button onClick={onClose} className='alt-modal__cancel'>Cancel</Button>}
        {renderActions(rightActions)}
      </div>}
      {ltePhoneL && <div className='alt-modal-wrapper__handle' />}
    </div>
  </div>
}

export default memo(Modal)
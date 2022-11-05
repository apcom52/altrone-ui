import {memo, ReactNode, useEffect, useRef} from "react";
import {Align} from "../../../types/Align";
import {Role} from "../../../types";
import './modal.scss';

interface ModalProps {
  title: string
  children: JSX.Element | JSX.Element[]
  onClose: () => void
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

const Modal = ({ title, children, onClose, actions = [], showClose = true, showCancel = true, closeOnOverlay = true}) => {
  const modalRef = useRef(null)

  useEffect(() => {
    document.body.classList.add('alt-util--no-scroll')

    return () => {
      document.body.classList.remove('alt-util--no-scroll')
    }
  }, [])

  return <div className='alt-modal'>
    <div className='alt-modal__body'>Modal</div>
  </div>
}

export default memo(Modal)
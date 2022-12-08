import {WithoutDefaultOffsets} from "../../../types";
import {forwardRef, useMemo, useState} from "react";
import {usePopper} from 'react-popper';
import './floating-box.scss';
import {useOutsideClick} from "rooks";
import {Options} from "@popperjs/core";
import {createPortal} from "react-dom";
import {useWindowSize} from "../../../hooks";
import {Modal} from "../Modal";

export enum FloatingBoxMobileBehaviour {
  default = 'default',
  modal = 'modal'
}

interface FloatingBoxProps extends WithoutDefaultOffsets {
  // TODO: rename to target
  targetElement: Element
  onClose: () => void
  offset?: number
  placement?: Options['placement']
  popperProps?: Omit<Partial<Options>, "modifiers">
  useParentWidth?: boolean
  minWidth?: number
  maxHeight?: number | string
  useRootContainer?: boolean
  preventClose?: (e: MouseEvent) => boolean
  mobileBehaviour?: FloatingBoxMobileBehaviour
}

const setPopperWidth = (state , minWidth) => {
  const targetRefWidth = state.elements.reference.clientWidth

  state.elements.popper.style.width = `${
    minWidth ? (targetRefWidth < minWidth ? minWidth : targetRefWidth) : targetRefWidth
  }px`;
}

const FloatingBox = forwardRef<HTMLDivElement, FloatingBoxProps>(({
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
  mobileBehaviour = FloatingBoxMobileBehaviour.default
}, ref) => {
  const { ltePhoneL } = useWindowSize()
  const [floatingBoxElement, setFloatingBoxElement] = useState<HTMLDivElement | null>(null)

  if (floatingBoxElement) {
    if (typeof ref === 'function') {
      ref(floatingBoxElement)
    } else if (ref) {
      ref.current = floatingBoxElement
    }
  }

  const offsets: [number, number] = useMemo(() => {
    return [0, offset]
  }, [offset])

  const modifiers = useMemo(() => {
    const result = [{
      name: 'offset',
      options: {
        offset: offsets
      }
    }]

    if (useParentWidth) {
      result.push({
        name: "sameWidth",
        enabled: true,
        fn: ({ state }) => {
          setPopperWidth(state, minWidth)
        },
        phase: "beforeWrite",
        requires: ["computeStyles"],
        effect: ({ state }) => {
          setPopperWidth(state, minWidth)
        }
      })
    }

    if (ref) {
      ref.modifiers = result
    }

    return result
  }, [offsets, useParentWidth, minWidth])

  const { styles, attributes } = usePopper(targetElement, floatingBoxElement, {
    modifiers,
    placement,
    ...popperProps
  })

  useOutsideClick({ current: floatingBoxElement }, (e: MouseEvent) => {
    if ((e.target as Element)?.closest('.alt-floating-box')) {
      return
    }

    if (preventClose && preventClose(e)) {
      return
    }

    setTimeout(() => {
      onClose()
    }, 1)
  })

  if (mobileBehaviour === FloatingBoxMobileBehaviour.modal && ltePhoneL) {
    return createPortal(<Modal onClose={onClose} showClose={false} showCancel={false}>
      {children}
    </Modal>, targetElement?.closest('.altrone') || document.body)
  }

  return createPortal(<div
    className='alt-floating-box'
    ref={(node: HTMLDivElement) => {
      setFloatingBoxElement(node)
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }}
    style={{
      ...styles.popper,
      maxHeight
    }}
    data-testid='alt-test-floating-box'
    {...attributes.popper}
  >
    {children}
  </div>, (useRootContainer || !targetElement) ? (targetElement?.closest('.altrone') || document.body) : targetElement.parentElement)
})

export default FloatingBox

import {WithoutDefaultOffsets} from "../../../types";
import {memo, useMemo, useState} from "react";
import { usePopper } from 'react-popper';
import './floating-box.scss';
import {useOutsideClick} from "rooks";
import { Options } from "@popperjs/core";

interface FloatingBoxProps extends WithoutDefaultOffsets {
  targetRef: Element
  onClose: () => void
  offset?: number
  placement?: Options['placement']
  popperProps?: Omit<Partial<Options>, "modifiers">
  useParentWidth?: boolean
  minWidth?: number
  preventClose?: (e: MouseEvent) => boolean
}

const setPopperWidth = (state , minWidth) => {
  const targetRefWidth = state.elements.reference.clientWidth

  state.elements.popper.style.width = `${
    minWidth ? (targetRefWidth < minWidth ? minWidth : targetRefWidth) : targetRefWidth
  }px`;
}

const FloatingBox = ({
  targetRef,
  onClose,
  offset = 4,
  placement = 'auto',
  popperProps,
  useParentWidth = false,
  minWidth,
  children,
  preventClose
}: FloatingBoxProps) => {
  const [floatingBoxElement, setFloatingBoxElement] = useState(null)

  const offsets: [number, number] = useMemo(() => {
    if (['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'].indexOf(placement) > -1) {
      return [0, offset]
    } else {
      return [0, offset]
    }
  }, [placement, offset])

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

    return result
  }, [offsets, useParentWidth, minWidth])

  const { styles, attributes } = usePopper(targetRef, floatingBoxElement, {
    modifiers,
    placement,
    ...popperProps
  })

  useOutsideClick({ current: floatingBoxElement }, (e) => {
    if (preventClose) {
      if (preventClose(e)) {
        return
      }
    }
    
    setTimeout(() => {
      onClose()
    }, 1)
  })

  return <div
    className='alt-floating-box'
    ref={setFloatingBoxElement}
    style={styles.popper}
    {...attributes.popper}
  >
    {children}
  </div>
}

export default memo(FloatingBox)

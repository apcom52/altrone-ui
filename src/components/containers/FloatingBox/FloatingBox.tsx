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
}

const FloatingBox = ({
  targetRef,
  onClose,
  offset = 4,
  placement = 'auto',
  popperProps,
  children
}: FloatingBoxProps) => {
  const [floatingBoxElement, setFloatingBoxElement] = useState(null)

  const offsets: [number, number] = useMemo(() => {
    if (['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'].indexOf(placement) > -1) {
      return [0, offset]
    } else {
      return [0, offset]
    }
  }, [placement, offset])

  const { styles, attributes } = usePopper(targetRef, floatingBoxElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: offsets
        }
      }
    ],
    placement,
    ...popperProps
  })

  useOutsideClick({ current: floatingBoxElement }, () => {
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

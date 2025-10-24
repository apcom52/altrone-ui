import { forwardRef, useEffect, useRef, useState } from 'react';
import { DropdownMenuProps } from '../Dropdown.types';
import clsx from 'clsx';
import s from './menu.module.scss';
import { useConfiguration } from 'components/configuration';
import { DropdownHoverProvider } from '../DropdownHover.contexts';
import { AnimatePresence, motion } from 'motion/react';
import { usePopoverCurrentId } from '../../popover/Popover.tsx';
import { useDropdownHover } from '../DropdownHover.contexts';

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      children,
      className,
      defaultFocusItemIndex = 0,
      onChangeFocusItemIndex,
      style,
      ...props
    },
    ref
  ) => {
    const { dropdown: { menu: dropdownMenuConfig = {} } = {} } =
      useConfiguration();

    const { hoveredIndex } = useDropdownHover();
    const popoverId = usePopoverCurrentId();
    const menuRef = useRef<HTMLDivElement>(null);
    const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(
      null
    );

    useEffect(() => {
      if (hoveredIndex !== null && menuRef.current) {
        const actionElements = menuRef.current.querySelectorAll(
          '[data-dropdown-action]'
        );
        const targetElement = actionElements[hoveredIndex] as HTMLElement;
        setHoveredElement(targetElement);
      } else {
        setHoveredElement(null);
      }
    }, [hoveredIndex]);

    const cls = clsx(s.Menu, className, dropdownMenuConfig.className);

    const styles = {
      ...dropdownMenuConfig.style,
      ...style,
    };

    return (
      <div
        ref={(node) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(node);
            } else {
              ref.current = node;
            }
          }
          menuRef.current = node;
        }}
        className={cls}
        style={styles}
        {...props}
      >
        <AnimatePresence>
          {/* {hoveredElement && (
            <motion.div
              layoutId={`dropdown-item-bg-${popoverId}`}
              className={s.ItemBackground}
              initial={{
                opacity: 0,
                x: hoveredElement.offsetLeft,
                y: hoveredElement.offsetTop,
                width: hoveredElement.offsetWidth,
                height: hoveredElement.offsetHeight,
              }}
              animate={{
                opacity: 1,
                x: hoveredElement.offsetLeft,
                y: hoveredElement.offsetTop,
                width: hoveredElement.offsetWidth,
                height: hoveredElement.offsetHeight,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            />
          )} */}
        </AnimatePresence>
        {children}
      </div>
    );
  }
);

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (props, ref) => {
    return (
      <DropdownHoverProvider>
        <DropdownMenuContent ref={ref} {...props} />
      </DropdownHoverProvider>
    );
  }
);

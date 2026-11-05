import type { ElementProps, FloatingContext } from '@floating-ui/react';
import { useCallback, useEffect, useRef } from 'react';

export const useContextMenuTrigger = (
  context: FloatingContext,
  {
    enabled,
    onOpen,
  }: { enabled: boolean; onOpen: (event: Event) => void },
): ElementProps => {
  const { refs, elements, open, onOpenChange } = context;
  const touch = useRef<{
    id: number;
    x: number;
    y: number;
    opened: boolean;
    timer: ReturnType<typeof setTimeout>;
  } | null>(null);
  const suppressUntil = useRef(0);
  const keyboardUntil = useRef(0);
  const point = useRef({ x: 0, y: 0 });

  const cancel = useCallback(() => {
    if (touch.current) {
      clearTimeout(touch.current.timer);
      if (touch.current.opened) suppressUntil.current = Date.now() + 1500;
    }
    touch.current = null;
  }, []);

  const showAt = (x: number, y: number, event: Event) => {
    point.current = { x, y };
    refs.setPositionReference({
      contextElement: elements.domReference ?? undefined,
      getBoundingClientRect: () => {
        const { x, y } = point.current;
        return { x, y, top: y, left: x, right: x, bottom: y, width: 0, height: 0 };
      },
    });
    onOpen(event);
  };

  useEffect(() => {
    if (!enabled) return;
    const doc = elements.domReference?.ownerDocument;
    const move = (event: PointerEvent) => {
      const pending = touch.current;
      if (
        pending &&
        pending.id === event.pointerId &&
        Math.hypot(event.clientX - pending.x, event.clientY - pending.y) > 10
      ) {
        cancel();
      }
    };
    const end = (event: PointerEvent) => {
      if (touch.current?.id === event.pointerId) {
        if (touch.current.opened) suppressUntil.current = Date.now() + 1500;
        cancel();
      }
    };
    const start = (event: PointerEvent) => {
      if (touch.current && touch.current.id !== event.pointerId) cancel();
    };
    doc?.addEventListener('pointerdown', start);
    doc?.addEventListener('pointermove', move);
    doc?.addEventListener('pointerup', end);
    doc?.addEventListener('pointercancel', end);
    doc?.addEventListener('scroll', cancel, true);
    return () => {
      cancel();
      doc?.removeEventListener('pointerdown', start);
      doc?.removeEventListener('pointermove', move);
      doc?.removeEventListener('pointerup', end);
      doc?.removeEventListener('pointercancel', end);
      doc?.removeEventListener('scroll', cancel, true);
    };
  }, [enabled, elements.domReference, cancel]);

  useEffect(() => {
    if (!enabled || !open) return;
    const doc = elements.domReference?.ownerDocument;
    const dismiss = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        !elements.domReference?.contains(target) &&
        !elements.floating?.contains(target)
      ) {
        onOpenChange(false, event, 'outside-press');
      }
    };
    doc?.addEventListener('contextmenu', dismiss);
    return () => doc?.removeEventListener('contextmenu', dismiss);
  }, [enabled, open, elements.domReference, elements.floating, onOpenChange]);

  if (!enabled) return {};

  return {
    reference: {
      onContextMenu(event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        if (
          touch.current?.opened ||
          Date.now() < suppressUntil.current ||
          Date.now() < keyboardUntil.current
        ) return;
        if (touch.current) {
          clearTimeout(touch.current.timer);
          touch.current.opened = true;
          suppressUntil.current = Date.now() + 1500;
        }
        if (
          event.button === 0 &&
          event.nativeEvent.detail === 0 &&
          event.clientX === 0 &&
          event.clientY === 0
        ) {
          const rect = elements.domReference?.getBoundingClientRect();
          showAt(rect?.left ?? 0, rect?.bottom ?? 0, event.nativeEvent);
        } else {
          showAt(event.clientX, event.clientY, event.nativeEvent);
        }
      },
      onKeyDown(event) {
        if (event.defaultPrevented) return;
        if (
          event.key !== 'ContextMenu' &&
          !(event.shiftKey && event.key === 'F10')
        ) return;
        event.preventDefault();
        cancel();
        keyboardUntil.current = Date.now() + 500;
        const rect = elements.domReference?.getBoundingClientRect();
        showAt(rect?.left ?? 0, rect?.bottom ?? 0, event.nativeEvent);
      },
      onPointerDown(event) {
        if (event.pointerType === 'mouse') {
          suppressUntil.current = 0;
          keyboardUntil.current = 0;
        }
        if (event.pointerType !== 'touch' || event.defaultPrevented) return;
        if (touch.current || event.isPrimary === false) {
          cancel();
          return;
        }
        suppressUntil.current = 0;
        const { pointerId: id, clientX: x, clientY: y, nativeEvent } = event;
        touch.current = {
          id,
          x,
          y,
          opened: false,
          timer: setTimeout(() => {
            if (touch.current) touch.current.opened = true;
            suppressUntil.current = Date.now() + 1500;
            showAt(x, y, nativeEvent);
          }, 500),
        };
      },
      onClickCapture(event) {
        if (touch.current?.opened || Date.now() < suppressUntil.current) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
    },
  };
};

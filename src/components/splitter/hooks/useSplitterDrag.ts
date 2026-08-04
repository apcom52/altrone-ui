import { useCallback, useRef } from 'react';
import type React from 'react';
import type { SplitterPanelProps } from '../Splitter.types.ts';
import { calcDelta } from '../utils/splitterUtils.ts';

export interface UseSplitterDragOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  panelsRef: React.RefObject<SplitterPanelProps[]>;
  orientationRef: React.RefObject<'horizontal' | 'vertical'>;
  onResizeRef: React.RefObject<((sizes: number[], e: PointerEvent) => void) | undefined>;
  onResizeStartRef: React.RefObject<((sizes: number[], e: PointerEvent) => void) | undefined>;
  onResizeEndRef: React.RefObject<((sizes: number[], e: PointerEvent) => void) | undefined>;
  sizes: number[];
  setSizes: React.Dispatch<React.SetStateAction<number[]>>;
  /** Hashed CSS class names used for DOM class toggling during drag. */
  cssClasses: { dividerActive: string; dragging: string };
}

export function useSplitterDrag({
  containerRef,
  panelsRef,
  orientationRef,
  onResizeRef,
  onResizeStartRef,
  onResizeEndRef,
  sizes,
  setSizes,
  cssClasses,
}: UseSplitterDragOptions) {
  /** Direct refs to panel DOM nodes — mutated during drag without setState. */
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  /** The divider element currently being dragged (for class toggling). */
  const activeDividerRef = useRef<HTMLDivElement | null>(null);
  /** Live sizes during drag — updated every pointermove without setState. */
  const liveSizes = useRef<number[]>([...sizes]);
  /** Set to true during drag to prevent liveSizes being overwritten by stale state. */
  const isDragging = useRef(false);

  const dragRef = useRef<{
    index: number;
    startPos: number;
    startSizes: number[];
  } | null>(null);

  // Keep liveSizes in sync with React state when no drag is active.
  if (!isDragging.current) {
    liveSizes.current = sizes;
  }

  const getContainerSize = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 1;
    return orientationRef.current === 'horizontal' ? el.offsetWidth : el.offsetHeight;
  }, [containerRef, orientationRef]);

  /** Write sizes directly to panel DOM nodes — no React re-render. */
  const applyToDOM = useCallback((newSizes: number[]) => {
    newSizes.forEach((size, i) => {
      const el = panelRefs.current[i];
      if (!el) return;
      el.style.flex = `${size} ${size} 0`;
    });
  }, []);

  const handlePointerDown = useCallback(
    (index: number, e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();

      const el = e.currentTarget as HTMLDivElement;
      el.setPointerCapture(e.pointerId);
      el.classList.add(cssClasses.dividerActive);
      activeDividerRef.current = el;
      containerRef.current?.classList.add(cssClasses.dragging);

      const startPos = orientationRef.current === 'horizontal' ? e.clientX : e.clientY;
      isDragging.current = true;
      dragRef.current = { index, startPos, startSizes: [...liveSizes.current] };

      onResizeStartRef.current?.(liveSizes.current, e.nativeEvent);
    },
    // cssClasses values are CSS-module constants — stable across renders.
    [cssClasses.dividerActive, cssClasses.dragging, containerRef, orientationRef, onResizeStartRef],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current) return;
      const { index, startPos, startSizes } = dragRef.current;

      const currentPos = orientationRef.current === 'horizontal' ? e.clientX : e.clientY;
      const delta = ((currentPos - startPos) / getContainerSize()) * 100;
      const newSizes = calcDelta([...startSizes], panelsRef.current, index, delta);

      liveSizes.current = newSizes;
      applyToDOM(newSizes);
      onResizeRef.current?.(newSizes, e.nativeEvent);
    },
    [getContainerSize, applyToDOM, orientationRef, panelsRef, onResizeRef],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current) return;

      activeDividerRef.current?.classList.remove(cssClasses.dividerActive);
      activeDividerRef.current = null;
      containerRef.current?.classList.remove(cssClasses.dragging);
      dragRef.current = null;
      isDragging.current = false;

      // Sync React state once at the end of the drag.
      const finalSizes = [...liveSizes.current];
      setSizes(finalSizes);
      onResizeEndRef.current?.(finalSizes, e.nativeEvent);
    },
    [cssClasses.dividerActive, cssClasses.dragging, containerRef, setSizes, onResizeEndRef],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
      const step = e.shiftKey ? 10 : 1;
      let delta = 0;

      if (orientationRef.current === 'horizontal') {
        if (e.key === 'ArrowLeft') delta = -step;
        else if (e.key === 'ArrowRight') delta = step;
        else if (e.key === 'Home') delta = -liveSizes.current[index];
        else if (e.key === 'End') delta = 100 - liveSizes.current[index];
        else return;
      } else {
        if (e.key === 'ArrowUp') delta = -step;
        else if (e.key === 'ArrowDown') delta = step;
        else if (e.key === 'Home') delta = -liveSizes.current[index];
        else if (e.key === 'End') delta = 100 - liveSizes.current[index];
        else return;
      }

      e.preventDefault();
      setSizes((prev) => calcDelta([...prev], panelsRef.current, index, delta));
    },
    [orientationRef, panelsRef, setSizes],
  );

  return {
    panelRefs,
    liveSizes,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleKeyDown,
  };
}

import React, {
  isValidElement,
  memo,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import s from './splitter.module.scss';
import clsx from 'clsx';
import type { SplitterHandle as SplitterHandleType, SplitterPanelProps, SplitterProps } from './Splitter.types.ts';
import { Panel } from './components/Panel.tsx';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';

// ─── Helpers ────────────────────────────────────────────────────────────────

function isPanelElement(
  child: React.ReactNode,
): child is React.ReactElement<SplitterPanelProps> {
  return isValidElement(child) && child.type === Panel;
}

function initSizes(panels: SplitterPanelProps[]): number[] {
  const n = panels.length;
  if (n === 0) return [];

  const sizes = new Array<number>(n).fill(-1);
  let totalAssigned = 0;
  let unassigned = 0;

  for (let i = 0; i < n; i++) {
    const p = panels[i];
    const raw = p.size ?? p.defaultSize;
    if (raw !== undefined) {
      sizes[i] = Math.max(p.min ?? 0, Math.min(p.max ?? 100, raw));
      totalAssigned += sizes[i];
    } else {
      unassigned++;
    }
  }

  if (unassigned > 0) {
    const share = Math.max(0, 100 - totalAssigned) / unassigned;
    for (let i = 0; i < n; i++) {
      if (sizes[i] === -1) sizes[i] = share;
    }
  }

  return sizes;
}

function calcDelta(
  sizes: number[],
  panels: SplitterPanelProps[],
  dividerIndex: number,
  delta: number,
): number[] {
  const next = [...sizes];
  const li = dividerIndex;
  const ri = dividerIndex + 1;

  const minL = panels[li].min ?? 0;
  const maxL = panels[li].max ?? 100;
  const minR = panels[ri].min ?? 0;
  const maxR = panels[ri].max ?? 100;

  const canGrow = Math.min(maxL - next[li], next[ri] - minR);
  const canShrink = Math.min(next[li] - minL, maxR - next[ri]);
  const clamped = Math.max(-canShrink, Math.min(canGrow, delta));

  next[li] += clamped;
  next[ri] -= clamped;
  return next;
}

// ─── Internal Divider ───────────────────────────────────────────────────────

interface DividerProps {
  id: string;
  index: number;
  isHorizontal: boolean;
  isDisabled: boolean;
  showControls: boolean;
  sizeLeft: number;
  minLeft: number;
  maxLeft: number;
  leftCollapsible: boolean;
  rightCollapsible: boolean;
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  onPointerDown: (i: number, e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  onKeyDown: (i: number, e: React.KeyboardEvent<HTMLDivElement>) => void;
  onCollapseLeft: () => void;
  onCollapseRight: () => void;
}

const SplitterDivider = memo(
  ({
    id,
    index,
    isHorizontal,
    isDisabled,
    showControls,
    sizeLeft,
    minLeft,
    maxLeft,
    leftCollapsible,
    rightCollapsible,
    leftCollapsed,
    rightCollapsed,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onKeyDown,
    onCollapseLeft,
    onCollapseRight,
  }: DividerProps) => {
    const hasCollapse = showControls && (leftCollapsible || rightCollapsible);

    const CollapseLeftIcon = isHorizontal
      ? leftCollapsed
        ? ChevronRight
        : ChevronLeft
      : leftCollapsed
        ? ChevronDown
        : ChevronUp;

    const CollapseRightIcon = isHorizontal
      ? rightCollapsed
        ? ChevronLeft
        : ChevronRight
      : rightCollapsed
        ? ChevronUp
        : ChevronDown;

    return (
      <div
        role="separator"
        aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
        aria-valuemin={minLeft}
        aria-valuemax={maxLeft}
        aria-valuenow={Math.round(sizeLeft)}
        aria-controls={id}
        tabIndex={isDisabled ? -1 : 0}
        className={clsx(s.Divider, {
          [s.DividerVertical]: !isHorizontal,
          [s.DividerDisabled]: isDisabled,
        })}
        onPointerDown={isDisabled ? undefined : (e) => onPointerDown(index, e)}
        onPointerMove={isDisabled ? undefined : onPointerMove}
        onPointerUp={isDisabled ? undefined : onPointerUp}
        onKeyDown={isDisabled ? undefined : (e) => onKeyDown(index, e)}
      >
        <div
          className={clsx(s.Handle, {
            [s.HandleVertical]: !isHorizontal,
            [s.HandleHidden]: isDisabled,
          })}
        />

        {hasCollapse && (
          <>
            {leftCollapsible && (
              <button
                type="button"
                className={clsx(
                  s.CollapseBtn,
                  isHorizontal ? s.CollapseBtnBefore : s.CollapseBtnBeforeV,
                  { [s.CollapseBtnVisible]: leftCollapsed },
                )}
                aria-label={
                  leftCollapsed
                    ? `Expand panel ${index + 1}`
                    : `Collapse panel ${index + 1}`
                }
                onPointerDown={(e) => e.stopPropagation()}
                onClick={onCollapseLeft}
              >
                <CollapseLeftIcon size={10} />
              </button>
            )}

            {rightCollapsible && (
              <button
                type="button"
                className={clsx(
                  s.CollapseBtn,
                  isHorizontal ? s.CollapseBtnAfter : s.CollapseBtnAfterV,
                  { [s.CollapseBtnVisible]: rightCollapsed },
                )}
                aria-label={
                  rightCollapsed
                    ? `Expand panel ${index + 2}`
                    : `Collapse panel ${index + 2}`
                }
                onPointerDown={(e) => e.stopPropagation()}
                onClick={onCollapseRight}
              >
                <CollapseRightIcon size={10} />
              </button>
            )}
          </>
        )}
      </div>
    );
  },
);

SplitterDivider.displayName = 'SplitterDivider';

// ─── Main component ──────────────────────────────────────────────────────────

const SplitterBase = ({
  ref,
  children,
  orientation = 'horizontal',
  className,
  style,
  onResize,
  onResizeStart,
  onResizeEnd,
  onCollapse,
  showControls = true,
  controlRef,
  ...restProps
}: SplitterProps) => {
  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const panelElements = React.Children.toArray(children).filter(isPanelElement);
  const panels = panelElements.map((el) => el.props);
  const n = panels.length;

  const [sizes, setSizes] = useState<number[]>(() => initSizes(panels));
  const [collapsed, setCollapsed] = useState<boolean[]>(() =>
    new Array(n).fill(false),
  );

  const preCollapseSizes = useRef<number[]>(new Array(n).fill(0));

  // ── Refs for zero-re-render drag ──────────────────────────────
  // Direct access to panel DOM nodes for style mutation during drag.
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  // The divider element currently being dragged (for class toggling).
  const activeDividerRef = useRef<HTMLDivElement | null>(null);
  // Live sizes during drag — updated every pointermove without setState.
  const liveSizes = useRef<number[]>([...sizes]);
  // During a drag we must not overwrite liveSizes from stale state.
  const isDragging = useRef(false);

  // Keep liveSizes in sync with React state when no drag is active.
  if (!isDragging.current) {
    liveSizes.current = sizes;
  }

  // Stable refs for panels config and orientation so hot-path callbacks
  // have zero React state dependencies and are never recreated.
  const panelsRef = useRef(panels);
  panelsRef.current = panels;
  const orientationRef = useRef(orientation);
  orientationRef.current = orientation;

  // Callback refs — consumers can change callbacks without causing
  // the pointer handlers to be recreated.
  const onResizeRef = useRef(onResize);
  onResizeRef.current = onResize;
  const onResizeStartRef = useRef(onResizeStart);
  onResizeStartRef.current = onResizeStart;
  const onResizeEndRef = useRef(onResizeEnd);
  onResizeEndRef.current = onResizeEnd;

  const dragRef = useRef<{
    index: number;
    startPos: number;
    startSizes: number[];
  } | null>(null);

  // ── DOM helpers ────────────────────────────────────────────────

  const getContainerSize = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 1;
    return orientationRef.current === 'horizontal'
      ? el.offsetWidth
      : el.offsetHeight;
  }, []);

  /** Write sizes directly to panel DOM nodes — no React re-render. */
  const applyToDOM = useCallback((newSizes: number[]) => {
    newSizes.forEach((size, i) => {
      const el = panelRefs.current[i];
      if (!el) return;
      el.style.flex = `${size} ${size} 0`;
    });
  }, []);

  // ── Collapse / expand ──────────────────────────────────────────

  // force=true → collapse, force=false → expand, force=undefined → toggle
  const handleCollapse = useCallback(
    (panelIndex: number, force?: boolean) => {
      const alreadyCollapsed = collapsed[panelIndex];
      const willCollapse = force !== undefined ? force : !alreadyCollapsed;

      // No-op if panel is already in the desired state
      if (willCollapse === alreadyCollapsed) return;

      if (!willCollapse) {
        // Expand
        const restore = preCollapseSizes.current[panelIndex];
        setSizes((prev) => {
          const next = [...prev];
          const neighbor = panelIndex > 0 ? panelIndex - 1 : panelIndex + 1;
          const available =
            next[neighbor] - (panelsRef.current[neighbor].min ?? 0);
          const actual = Math.min(restore, available);
          next[panelIndex] = actual;
          next[neighbor] -= actual;
          return next;
        });
        setCollapsed((prev) => {
          const next = [...prev];
          next[panelIndex] = false;
          return next;
        });
        onCollapse?.(panelIndex, false);
      } else {
        // Collapse
        setSizes((prev) => {
          preCollapseSizes.current[panelIndex] = prev[panelIndex];
          const next = [...prev];
          const neighbor = panelIndex > 0 ? panelIndex - 1 : panelIndex + 1;
          next[neighbor] += next[panelIndex];
          next[panelIndex] = 0;
          return next;
        });
        setCollapsed((prev) => {
          const next = [...prev];
          next[panelIndex] = true;
          return next;
        });
        onCollapse?.(panelIndex, true);
      }
    },
    [collapsed, onCollapse],
  );

  // ── Imperative handle ──────────────────────────────────────────

  const collapsedRef = useRef(collapsed);
  collapsedRef.current = collapsed;

  useImperativeHandle(
    controlRef,
    (): SplitterHandleType => ({
      collapse: (panelIndex: number) => handleCollapse(panelIndex, true),
      expand: (panelIndex: number) => handleCollapse(panelIndex, false),
      toggle: (panelIndex: number) => handleCollapse(panelIndex),
      getSizes: () => [...liveSizes.current],
      getCollapsed: () => [...collapsedRef.current],
    }),
    [handleCollapse],
  );

  // ── Pointer handlers (zero setState in move) ───────────────────

  const handlePointerDown = useCallback(
    (index: number, e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();

      const el = e.currentTarget as HTMLDivElement;
      el.setPointerCapture(e.pointerId);
      el.classList.add(s.DividerActive);
      activeDividerRef.current = el;
      containerRef.current?.classList.add(s.Dragging);

      const startPos =
        orientationRef.current === 'horizontal' ? e.clientX : e.clientY;

      isDragging.current = true;
      dragRef.current = {
        index,
        startPos,
        startSizes: [...liveSizes.current],
      };

      onResizeStartRef.current?.(liveSizes.current, e.nativeEvent);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current) return;
      const { index, startPos, startSizes } = dragRef.current;

      const currentPos =
        orientationRef.current === 'horizontal' ? e.clientX : e.clientY;
      const delta = ((currentPos - startPos) / getContainerSize()) * 100;

      const newSizes = calcDelta(
        [...startSizes],
        panelsRef.current,
        index,
        delta,
      );
      liveSizes.current = newSizes;

      // Mutate DOM directly — no React setState, no re-render.
      applyToDOM(newSizes);

      onResizeRef.current?.(newSizes, e.nativeEvent);
    },
    [getContainerSize, applyToDOM],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current) return;

      activeDividerRef.current?.classList.remove(s.DividerActive);
      activeDividerRef.current = null;
      containerRef.current?.classList.remove(s.Dragging);
      dragRef.current = null;
      isDragging.current = false;

      // Sync React state once at the end of the drag.
      const finalSizes = [...liveSizes.current];
      setSizes(finalSizes);
      onResizeEndRef.current?.(finalSizes, e.nativeEvent);
    },
    [],
  );

  // ── Keyboard (setState is fine — discrete action) ──────────────

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
    [],
  );

  // ── Render ─────────────────────────────────────────────────────

  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      ref={mergedRef}
      className={clsx(s.Splitter, { [s.Vertical]: !isHorizontal }, className)}
      style={style}
      {...restProps}
    >
      {panelElements.map((panel, i) => {
        const isCollapsed = collapsed[i];
        const size = isCollapsed ? 0 : sizes[i];
        const panelId = `${uid}-panel-${i}`;

        return (
          <React.Fragment key={i}>
            <div
              id={panelId}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className={s.Panel}
              style={{
                flex: `${size} ${size} 0`,
                overflow: isCollapsed ? 'hidden' : undefined,
              }}
              aria-label={`Panel ${i + 1}`}
            >
              {panel.props.children}
            </div>

            {i < n - 1 && (
              <SplitterDivider
                key={`divider-${i}`}
                id={panelId}
                index={i}
                isHorizontal={isHorizontal}
                isDisabled={
                  panels[i].resizable === false ||
                  panels[i + 1].resizable === false ||
                  collapsed[i] ||
                  collapsed[i + 1]
                }
                showControls={showControls}
                sizeLeft={sizes[i]}
                minLeft={panels[i].min ?? 0}
                maxLeft={panels[i].max ?? 100}
                leftCollapsible={panels[i].collapsible ?? false}
                rightCollapsible={panels[i + 1].collapsible ?? false}
                leftCollapsed={collapsed[i]}
                rightCollapsed={collapsed[i + 1]}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onKeyDown={handleKeyDown}
                onCollapseLeft={() => handleCollapse(i)}
                onCollapseRight={() => handleCollapse(i + 1)}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const Splitter = Object.assign(memo(SplitterBase), {
  Panel,
});

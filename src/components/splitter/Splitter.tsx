import {
  Children,
  Fragment,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';
import clsx from 'clsx';
import { useLocalization } from '../application';
import s from './splitter.module.scss';
import type {
  SplitterHandle as SplitterHandleType,
  SplitterProps,
} from './Splitter.types.ts';
import { Panel } from './components/Panel.tsx';
import { SplitterDivider, dividerActiveClass } from './inner/Divider.tsx';
import { isPanelElement, initSizes } from './utils/splitterUtils.ts';
import { useSplitterDrag } from './hooks/useSplitterDrag.ts';
import { useSplitterCollapse } from './hooks/useSplitterCollapse.ts';

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
  collapsedControlsVisibility = 'always',
  controlRef,
  ...restProps
}: SplitterProps) => {
  const uid = useId();
  const t = useLocalization();
  const containerRef = useRef<HTMLDivElement>(null);

  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const panelElements = Children.toArray(children).filter(isPanelElement);
  const panels = panelElements.map((el) => el.props);
  const n = panels.length;

  const [sizes, setSizes] = useState<number[]>(() => initSizes(panels));
  const [collapsed, setCollapsed] = useState<boolean[]>(() =>
    new Array(n).fill(false),
  );

  // Stable refs so hot-path callbacks have zero React state dependencies.
  const panelsRef = useRef(panels);
  panelsRef.current = panels;
  const orientationRef = useRef(orientation);
  orientationRef.current = orientation;

  // Callback refs — consumers can swap callbacks without recreating pointer handlers.
  const onResizeRef = useRef(onResize);
  onResizeRef.current = onResize;
  const onResizeStartRef = useRef(onResizeStart);
  onResizeStartRef.current = onResizeStart;
  const onResizeEndRef = useRef(onResizeEnd);
  onResizeEndRef.current = onResizeEnd;

  const {
    panelRefs,
    liveSizes,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleKeyDown,
  } = useSplitterDrag({
    containerRef,
    panelsRef,
    orientationRef,
    onResizeRef,
    onResizeStartRef,
    onResizeEndRef,
    sizes,
    setSizes,
    cssClasses: { dividerActive: dividerActiveClass, dragging: s.Dragging },
  });

  const { handleCollapse } = useSplitterCollapse({
    collapsed,
    setCollapsed,
    setSizes,
    panelsRef,
    onCollapse,
  });

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
    [handleCollapse, liveSizes],
  );

  /**
   * Suppress the liveSizes sync warning: `isDragging` is a ref updated in the
   * pointer handlers (which run after render), so this render-time sync is
   * intentional and safe.
   */
  if (!isDragging.current) {
    liveSizes.current = sizes;
  }

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
          <Fragment key={i}>
            <div
              id={panelId}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className={clsx(s.Panel, { [s.PanelCollapsed]: isCollapsed })}
              style={{ flex: `${size} ${size} 0` }}
              aria-label={t('splitter.panel', { vars: { index: i + 1 } })}
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
                collapsedControlsVisibility={collapsedControlsVisibility}
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
                onCollapseLeft={(e) => handleCollapse(i, undefined, e)}
                onCollapseRight={(e) => handleCollapse(i + 1, undefined, e)}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export const Splitter = Object.assign(SplitterBase, { Panel });

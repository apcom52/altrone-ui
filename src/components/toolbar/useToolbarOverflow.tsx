import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dropdown } from 'components/dropdown';
import { useLocalization } from 'components/application';
import { Action, Group, Separator } from './components';
import {
  ToolbarActionPriority,
  ToolbarActionProps,
  ToolbarGroupProps,
  ToolbarIconSet,
  ToolbarSeparatorProps,
} from './Toolbar.types.ts';

const PRIORITY_WEIGHT: Record<ToolbarActionPriority, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

interface OverflowItem {
  key: string;
  priority: ToolbarActionPriority;
}

/**
 * Given each item's measured size, decides which ones no longer fit —
 * `low` priority collapses before `medium`, `high` never collapses (the row
 * may still overflow in that case). Within a tier, items collapse in
 * reading order (lowest index / leftmost or topmost first). Pure so the
 * collapse order can be unit-tested without a real layout engine.
 */
export function resolveToolbarOverflow(
  items: OverflowItem[],
  sizes: Map<string, number>,
  availableSize: number,
  gap: number,
  triggerSize: number,
): Set<string> {
  const totalSize =
    items.reduce((sum, item) => sum + (sizes.get(item.key) ?? 0), 0) +
    gap * Math.max(items.length - 1, 0);

  if (totalSize <= availableSize) return new Set();

  const removable = items
    .map((item, index) => ({ ...item, index }))
    .filter((item) => item.priority !== 'high')
    .sort((a, b) =>
      PRIORITY_WEIGHT[a.priority] !== PRIORITY_WEIGHT[b.priority]
        ? PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
        : a.index - b.index,
    );

  const hidden = new Set<string>();
  let remaining = totalSize + gap + triggerSize;

  for (const item of removable) {
    if (remaining <= availableSize) break;
    hidden.add(item.key);
    remaining -= (sizes.get(item.key) ?? 0) + gap;
  }

  return hidden;
}

/** A flexible `Toolbar.Separator` (`variant="space"`, the default) grows to fill leftover
 *  space — its stretched rendered width isn't a real requirement, so it must never be
 *  counted toward how much room the row needs. */
export function isFlexibleSpacer(child: ReactElement): boolean {
  return (
    child.type === Separator &&
    ((child.props as ToolbarSeparatorProps).variant ?? 'space') === 'space'
  );
}

function getItemPriority(child: ReactElement): ToolbarActionPriority {
  if (child.type === Action || child.type === Group) {
    return (
      (child.props as { priority?: ToolbarActionPriority }).priority ??
      'medium'
    );
  }
  return 'high';
}

function toDropdownAction(action: ReactElement<ToolbarActionProps>) {
  const { label, icon, additionalIcon, danger, disabled, onClick } =
    action.props;

  return (
    <Dropdown.Action
      key={action.key}
      label={label}
      icon={icon ?? additionalIcon}
      danger={danger}
      disabled={disabled}
      onClick={onClick}
    />
  );
}

/** A collapsed `Toolbar.Group` flattens its own actions into the overflow menu — no nested grouping in the `Dropdown.Menu`. */
function flattenHiddenItem(child: ReactElement): ReactElement[] {
  if (child.type === Group) {
    return Children.toArray((child.props as ToolbarGroupProps).children)
      .filter(
        (c): c is ReactElement<ToolbarActionProps> =>
          isValidElement(c) && c.type === Action,
      )
      .map(toDropdownAction);
  }

  if (child.type === Action) {
    return [toDropdownAction(child as ReactElement<ToolbarActionProps>)];
  }

  return [];
}

const EMPTY_SET: ReadonlySet<string> = new Set();

/**
 * Where the overflow trigger renders within its own region's children, and
 * which way its chevrons point. `Toolbar.Leading` (and `Center`, and a flat
 * `Toolbar`) render left-to-right/top-to-bottom starting from the toolbar's
 * own start edge, so their trigger sits at the region's own end — closest
 * to the toolbar's center — pointing further inward (`'end'`).
 * `Toolbar.Trailing` is anchored to the toolbar's end edge instead, so its
 * children's *first* position is the one closest to the center — the
 * trigger goes there, pointing back inward (`'start'`).
 */
export type ToolbarOverflowTriggerEdge = 'start' | 'end';

function getTriggerIcon(
  icons: ToolbarIconSet,
  orientation: 'horizontal' | 'vertical',
  triggerEdge: ToolbarOverflowTriggerEdge,
) {
  if (orientation === 'vertical') {
    return triggerEdge === 'end' ? icons.overflowDown : icons.overflowUp;
  }
  return triggerEdge === 'end' ? icons.overflowRight : icons.overflowLeft;
}

export interface UseToolbarOverflowOptions {
  triggerEdge?: ToolbarOverflowTriggerEdge;
  /** Called whenever the region's full (uncollapsed) content size changes — lets `Toolbar` balance `Leading`/`Trailing`'s shared track width by actual need instead of a rigid 50/50 split. */
  onNaturalSizeChange?: (size: number) => void;
  /** Resolved icon set for the overflow trigger's directional chevron. */
  overflowIcons: ToolbarIconSet;
}

/**
 * Collapses the direct children of a toolbar row (`Toolbar.Action` /
 * `Toolbar.Group`, each an atomic unit) into an overflow `Dropdown` once
 * they no longer fit, respecting each item's `priority`. Children that
 * don't support `priority` (Title, Logo, Separator, arbitrary nodes) are
 * measured but never collapsed.
 *
 * `orientation` is taken as a parameter rather than read from
 * `ToolbarContext` — the bare `Toolbar` root calls this before it provides
 * that context to its own children, so it can't consume its own value.
 */
export function useToolbarOverflow(
  children: ReactNode,
  orientation: 'horizontal' | 'vertical',
  {
    triggerEdge = 'end',
    onNaturalSizeChange,
    overflowIcons,
  }: UseToolbarOverflowOptions,
) {
  const t = useLocalization();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const sizesRef = useRef(new Map<string, number>());
  const hiddenKeysRef = useRef<ReadonlySet<string>>(EMPTY_SET);
  const [hiddenKeys, setHiddenKeys] =
    useState<ReadonlySet<string>>(EMPTY_SET);

  const childArray = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );

  const items = useMemo<OverflowItem[]>(
    () =>
      childArray.map((child) => ({
        key: String(child.key),
        priority: getItemPriority(child),
      })),
    [childArray],
  );

  const flexibleSpacerKeys = useMemo(
    () =>
      new Set(
        childArray
          .filter((child) => isFlexibleSpacer(child))
          .map((child) => String(child.key)),
      ),
    [childArray],
  );

  /**
   * `hiddenKeys` is a dep so this reruns once the trigger itself mounts,
   * letting the second pass size it correctly instead of assuming 0.
   */
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const recalculate = () => {
      const visibleItems = items.filter(
        (item) => !hiddenKeysRef.current.has(item.key),
      );
      const nodes = Array.from(container.children) as HTMLElement[];
      /** The trigger renders before the items when `triggerEdge` is `'start'` — offset past it. */
      const nodeOffset =
        triggerEdge === 'start' && hiddenKeysRef.current.size > 0 ? 1 : 0;

      visibleItems.forEach((item, index) => {
        const node = nodes[index + nodeOffset];
        if (!node || flexibleSpacerKeys.has(item.key)) return;
        const measured =
          orientation === 'vertical' ? node.offsetHeight : node.offsetWidth;
        if (measured > 0) sizesRef.current.set(item.key, measured);
      });

      const style = getComputedStyle(container);
      const available =
        orientation === 'vertical'
          ? container.clientHeight -
            parseFloat(style.paddingTop) -
            parseFloat(style.paddingBottom)
          : container.clientWidth -
            parseFloat(style.paddingLeft) -
            parseFloat(style.paddingRight);
      const gap =
        parseFloat(
          orientation === 'vertical' ? style.rowGap : style.columnGap,
        ) || 0;

      const naturalSize =
        items.reduce((sum, item) => sum + (sizesRef.current.get(item.key) ?? 0), 0) +
        gap * Math.max(items.length - 1, 0);
      onNaturalSizeChange?.(naturalSize);

      const triggerSize = triggerRef.current
        ? orientation === 'vertical'
          ? triggerRef.current.offsetHeight
          : triggerRef.current.offsetWidth
        : 0;

      const nextHidden = resolveToolbarOverflow(
        items,
        sizesRef.current,
        available,
        gap,
        triggerSize,
      );

      const changed =
        nextHidden.size !== hiddenKeysRef.current.size ||
        [...nextHidden].some((key) => !hiddenKeysRef.current.has(key));

      if (changed) {
        hiddenKeysRef.current = nextHidden;
        setHiddenKeys(nextHidden);
      }
    };

    recalculate();

    const observer = new ResizeObserver(recalculate);
    observer.observe(container);
    return () => observer.disconnect();
  }, [
    items,
    orientation,
    hiddenKeys,
    triggerEdge,
    onNaturalSizeChange,
    flexibleSpacerKeys,
  ]);

  const visibleChildren: ReactNode[] = [];
  const hiddenElements: ReactElement[] = [];

  childArray.forEach((child) => {
    if (hiddenKeys.has(String(child.key))) {
      hiddenElements.push(child);
    } else {
      visibleChildren.push(child);
    }
  });

  const overflowMenuItems = hiddenElements.flatMap(flattenHiddenItem);

  const trigger = overflowMenuItems.length > 0 && (
    <Dropdown content={<Dropdown.Menu>{overflowMenuItems}</Dropdown.Menu>}>
      <Group ref={triggerRef}>
        <Action
          label={t('toolbar.moreActions')}
          showLabel={false}
          icon={getTriggerIcon(overflowIcons, orientation, triggerEdge)}
        />
      </Group>
    </Dropdown>
  );

  const content = (
    <>
      {triggerEdge === 'start' && trigger}
      {visibleChildren}
      {triggerEdge === 'end' && trigger}
    </>
  );

  return { containerRef, content };
}

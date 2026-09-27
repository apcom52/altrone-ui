import { isValidElement } from 'react';
import type React from 'react';
import type { SplitterPanelProps } from '../Splitter.types.ts';
import { Panel } from '../components/Panel.tsx';

/** Checks whether a React node is a Splitter.Panel element. */
export function isPanelElement(
  child: React.ReactNode,
): child is React.ReactElement<SplitterPanelProps> {
  return isValidElement(child) && child.type === Panel;
}

/**
 * Builds the initial sizes array (percentages, sum ≈ 100).
 * Panels with an explicit size/defaultSize get that value (clamped to minSize/maxSize).
 * Remaining space is split equally among unsized panels.
 */
export function initSizes(panels: SplitterPanelProps[]): number[] {
  const n = panels.length;
  if (n === 0) return [];

  const sizes = new Array<number>(n).fill(-1);
  let totalAssigned = 0;
  let unassigned = 0;

  for (let i = 0; i < n; i++) {
    const p = panels[i];
    const raw = p.defaultSize;
    if (raw !== undefined) {
      sizes[i] = Math.max(p.minSize ?? 0, Math.min(p.maxSize ?? 100, raw));
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

/**
 * Applies a resize delta (in %) to the two panels on either side of a divider.
 * Respects minSize/maxSize constraints of both panels.
 */
export function calcDelta(
  sizes: number[],
  panels: SplitterPanelProps[],
  dividerIndex: number,
  delta: number,
): number[] {
  const next = [...sizes];
  const li = dividerIndex;
  const ri = dividerIndex + 1;

  const minL = panels[li].minSize ?? 0;
  const maxL = panels[li].maxSize ?? 100;
  const minR = panels[ri].minSize ?? 0;
  const maxR = panels[ri].maxSize ?? 100;

  const canGrow = Math.min(maxL - next[li], next[ri] - minR);
  const canShrink = Math.min(next[li] - minL, maxR - next[ri]);
  const clamped = Math.max(-canShrink, Math.min(canGrow, delta));

  next[li] += clamped;
  next[ri] -= clamped;
  return next;
}

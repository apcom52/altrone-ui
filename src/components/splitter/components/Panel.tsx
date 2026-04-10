import type { SplitterPanelProps } from '../Splitter.types.ts';

/**
 * Descriptor component — carries configuration and children.
 * Splitter reads its props and renders children inside sized containers.
 * Panel itself renders nothing.
 */
export const Panel = (_props: SplitterPanelProps): null => null;
Panel.displayName = 'Splitter.Panel';

import type { SplitterPanelProps } from '../Splitter.types.ts';

/**
 * Descriptor component — carries configuration, children, and DOM attributes
 * (`ref`/`className`/`style`/...). `Splitter` reads its props and renders each
 * panel as its own sized `<div>`, forwarding those attributes onto it.
 * `Panel` itself renders nothing.
 */
export const Panel = (_props: SplitterPanelProps): null => null;
Panel.displayName = 'Splitter.Panel';

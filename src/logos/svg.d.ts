/**
 * Ambient decls so this repo's own build/typecheck resolves the `?react` SVG
 * imports in `index.ts`. Mirrors `vite-plugin-svgr/client`. The published types
 * for `altrone-ui/logos` are synthesized standalone (see `dts()` in vite.config).
 */
declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.svg?react' {
  import type * as React from 'react';
  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export default ReactComponent;
}

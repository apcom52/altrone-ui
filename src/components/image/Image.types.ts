import type {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  SyntheticEvent,
} from 'react';
import type { BasicComponentStyleConfig } from 'types';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export interface ImageProps
  extends
    BasicComponentStyleConfig,
    Omit<
      HTMLAttributes<HTMLElement>,
      keyof BasicComponentStyleConfig | 'children' | 'onLoad' | 'onError'
    > {
  ref?: Ref<HTMLElement>;

  /** URL of the picture. Ignored when `children` is passed. */
  src?: string;
  alt?: string;

  /**
   * Any custom picture element — `next/image`'s `Image`, a raw `<svg>`, a
   * `<picture>` with sources, a video poster, anything. Takes over from
   * `src`/`alt` entirely; `fit`/`objectPosition` still apply to it via CSS,
   * since they target the rendered `img`/`svg`/`video` regardless of who
   * rendered it.
   *
   * @example
   * <Image fit="cover" caption="Aurora over Reykjavik">
   *   <NextImage src={photo} alt="Aurora over Reykjavik" fill />
   * </Image>
   */
  children?: ReactNode;

  fit?: ImageFit;
  objectPosition?: string;

  width?: number | string;
  height?: number | string;
  radius?: number | string;

  /** Rendered centered below the frame. */
  caption?: ReactNode;

  /**
   * Controls the preloader for custom `children` (arbitrary elements we
   * can't hook a native `load` event on). Ignored in `src` mode, where the
   * loaded/error state is tracked automatically from the `img` itself.
   */
  isLoading?: boolean;

  /** Overrides the default `Skeleton` preloader. */
  preloader?: ReactElement;

  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

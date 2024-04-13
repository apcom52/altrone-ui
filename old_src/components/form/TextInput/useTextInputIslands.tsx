import { ReactElement, useMemo, useRef } from 'react';
import { useResizeObserver } from '../../../hooks';

export function useTextInputIslands(
  actions: ReactElement | ReactElement[] | null | undefined,
) {
  const leftIslandsContainerRef = useRef<HTMLDivElement | null>(null);
  const rightIslandsContainerRef = useRef<HTMLDivElement | null>(null);

  useResizeObserver(leftIslandsContainerRef);
  useResizeObserver(rightIslandsContainerRef);

  const [leftIslands, rightIslands] = useMemo(() => {
    const safeChildren = (Array.isArray(actions) ? actions : [actions]).filter(
      (childElement) => Boolean(childElement),
    );

    const left = safeChildren.filter(
      (island) =>
        !island?.props.placement || island?.props.placement === 'left',
    );
    const right = safeChildren.filter(
      (island) => island?.props.placement === 'right',
    );

    // if (loading) {
    //   right.push(
    //     <TextInputIsland.Custom placement="right" className="alt-text-input__loading">
    //       <Loading color="var(--secondaryTextColor)" />
    //     </TextInputIsland.Custom>
    //   );
    // }

    return [left, right];
  }, [actions]);

  return {
    leftIslands,
    rightIslands,
    paddingLeft:
      leftIslandsContainerRef.current && leftIslands.length
        ? leftIslandsContainerRef.current.offsetWidth + 'px'
        : undefined,
    paddingRight:
      rightIslandsContainerRef.current && rightIslands.length
        ? rightIslandsContainerRef.current.offsetWidth + 'px'
        : undefined,
  };
}

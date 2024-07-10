import {
  createContext,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import s from './rainbow.module.scss';
import { Point } from 'types';
import { useMutationObserver } from 'utils';

interface RainbowEffectContextType {
  setElement: (
    element: HTMLElement,
    params: {
      opacity: number;
      blur: number;
    },
  ) => void;
  setCursor: (cursor: Point) => void;
  removeRainbow: () => void;
  hasCurrentElement: () => boolean;
}

interface RainbowEffectHookProps {
  onMouseEnter?: MouseEventHandler;
  onMouseMove?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  opacity?: number;
  blur?: number;
}

export const useRainbowEffect = (
  enabled: boolean,
  options?: RainbowEffectHookProps,
) => {
  const { setElement, setCursor, removeRainbow } = useRainbowContext();

  const {
    onMouseEnter: userOnMouseEnter,
    onMouseMove: userOnMouseMove,
    onMouseLeave: userOnMouseLeave,
    opacity = 1,
    blur = 11,
  } = options || {};

  const onMouseEnter = useCallback<MouseEventHandler<HTMLElement>>((e) => {
    const currentElement = e.currentTarget;

    setElement(currentElement, {
      opacity: Number(currentElement.dataset.rainbowOpacity) || opacity,
      blur: Number(currentElement.dataset.rainbowBlur) || blur,
    });

    const targetRect = currentElement.getBoundingClientRect();

    setCursor({
      x: e.clientX - targetRect.left,
      y: e.clientY - targetRect.top,
    });

    userOnMouseEnter?.(e);
  }, []);

  const onMouseMove = useCallback<MouseEventHandler<HTMLElement>>((e) => {
    const targetRect = e.currentTarget.getBoundingClientRect();

    if (targetRect) {
      setCursor({
        x: e.clientX - targetRect.left,
        y: e.clientY - targetRect.top,
      });
    }

    userOnMouseMove?.(e);
  }, []);

  const onMouseLeave = useCallback<MouseEventHandler<HTMLElement>>((e) => {
    removeRainbow();
    userOnMouseLeave?.(e);
  }, []);

  if (!enabled) {
    return {};
  }

  return {
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onWheel: onMouseMove,
    'data-rainbow-opacity': opacity,
    'data-rainbow-blur': `${blur}px`,
  };
};

const RainbowEffectContext = createContext<RainbowEffectContextType>({
  setElement: () => null,
  setCursor: () => null,
  removeRainbow: () => null,
  hasCurrentElement: () => false,
});
export const useRainbowContext = () => useContext(RainbowEffectContext);

const mutationOptions = {
  subtree: true,
  childList: true,
};

export const RainbowEffect = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false);
  const [containerPosition, setContainerPosition] = useState<Point>({
    x: 0,
    y: 0,
  });
  const [cursor, setCursor] = useState<Point>({
    x: 0,
    y: 0,
  });
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [borderRadius, setBorderRadius] = useState('0');
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(11);

  const currentElementRef = useRef<HTMLElement | null>(null);

  const setElement = useCallback<RainbowEffectContextType['setElement']>(
    (element, options) => {
      currentElementRef.current = element;

      setBorderRadius(getComputedStyle(currentElementRef.current).borderRadius);
      setOpacity(options.opacity);
      setBlur(options.blur);

      const targetRect = currentElementRef.current?.getBoundingClientRect();
      setContainerPosition({ x: targetRect?.x || 0, y: targetRect?.y || 0 });

      setRotation(Math.round(Math.random() * 360));

      setWidth(targetRect.width || 0);
      setHeight(targetRect.height || 0);
      setVisible(true);
    },
    [],
  );

  const setMouseCursor = useCallback<RainbowEffectContextType['setCursor']>(
    (cursor) => {
      const targetRect = currentElementRef.current?.getBoundingClientRect();

      setContainerPosition({ x: targetRect?.x || 0, y: targetRect?.y || 0 });

      if (targetRect) {
        setCursor(cursor);
      }

      setWidth(targetRect?.width || 0);
      setHeight(targetRect?.height || 0);
      setVisible(true);
    },
    [],
  );

  const removeRainbow = useCallback(() => {
    setContainerPosition({ x: 0, y: 0 });
    setCursor({ x: 0, y: 0 });

    setBorderRadius('0');

    currentElementRef.current = null;
    setWidth(0);
    setHeight(0);
    setVisible(false);
  }, []);

  const mutationObserverCallback = useCallback<MutationCallback>(
    (entities) => {
      entities.forEach((entity) => {
        if (
          visible &&
          Array.from(entity.removedNodes).findIndex(
            (node) => node === currentElementRef.current,
          )
        ) {
          removeRainbow();
        }
      });
    },
    [visible],
  );

  const hasCurrentElement = useCallback(() => {
    return Boolean(currentElementRef.current);
  }, []);

  useMutationObserver(document.body, mutationObserverCallback, mutationOptions);

  const context = useMemo<RainbowEffectContextType>(() => {
    return {
      setElement,
      setCursor: setMouseCursor,
      removeRainbow,
      hasCurrentElement,
    };
  }, [setElement, setMouseCursor, removeRainbow, hasCurrentElement]);

  return (
    <RainbowEffectContext.Provider value={context}>
      {children}
      {visible && (
        <div
          className={s.Rainbow}
          style={{
            top: `${containerPosition.y}px`,
            left: `${containerPosition.x}px`,
            width: `${width}px`,
            height: `${height}px`,
            opacity,
            borderRadius,
          }}
          data-testid="rainbow"
        >
          <div className={s.Container}>
            <div
              className={s.Gradient}
              style={{
                background: `conic-gradient(from 164.05deg at 50% 50%, #FF0200 0deg, #FFC100 10.8deg, #FFA800 42.56deg, #EBFF00 70.11deg, #24FF00 106.2deg, #00F0FF 149.4deg, #00FFF0 190.8deg, #0066FF 237.6deg, #AD00FF 275.4deg, #FF00A8 316.8deg, #FF0200 360deg)`,
                rotate: `${rotation}deg`,
                top: `${cursor.y}px`,
                left: `${cursor.x}px`,
                width: `${width * 2}px`,
                height: `${width * 2}px`,
                filter: `blur(${blur}px)`,
              }}
            ></div>
          </div>
        </div>
      )}
    </RainbowEffectContext.Provider>
  );
};

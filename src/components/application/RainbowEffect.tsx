import {
  createContext,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import s from './rainbow.module.scss';
import { Point } from 'types';
import { useMutationObserver } from '../../utils/hooks/useMutationObserver.ts';

interface RainbowEffectContextType {
  onMouseEnter: MouseEventHandler;
  onMouseMove: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}

const RainbowEffectContext = createContext<RainbowEffectContextType>({
  onMouseEnter: () => null,
  onMouseMove: () => null,
  onMouseLeave: () => null,
});
export const useRainbowEffect = (enabled: boolean = true) => {
  if (!enabled) {
    return {};
  }

  return useContext(RainbowEffectContext);
};

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

  const onMouseEnter = useCallback<MouseEventHandler<HTMLElement>>((e) => {
    setVisible(true);

    currentElementRef.current = e.currentTarget;

    setBorderRadius(getComputedStyle(currentElementRef.current).borderRadius);
    setOpacity(
      currentElementRef.current?.dataset.rainbowOpacity
        ? Number(currentElementRef.current.dataset.rainbowOpacity)
        : 1,
    );
    setBlur(
      currentElementRef.current?.dataset.rainbowBlur
        ? Number(currentElementRef.current.dataset.rainbowBlur)
        : 11,
    );

    const targetRect = currentElementRef.current?.getBoundingClientRect();
    setContainerPosition({
      x: currentElementRef.current?.offsetLeft || 0,
      y: currentElementRef.current?.offsetTop || 0,
    });

    setCursor({
      x: e.clientX - targetRect.left,
      y: e.clientY - targetRect.top,
    });

    setRotation(Math.round(Math.random() * 360));

    setWidth(targetRect.width * 2);
    setHeight(targetRect.height * 2);
  }, []);

  const onMouseMove = useCallback<MouseEventHandler>((e) => {
    const targetRect = currentElementRef.current?.getBoundingClientRect();
    setContainerPosition({
      x: currentElementRef.current?.offsetLeft || 0,
      y: currentElementRef.current?.offsetTop || 0,
    });

    // setContainerPosition({ x: targetRect?.x || 0, y: targetRect?.y || 0 });

    if (targetRect) {
      setCursor({
        x: e.clientX - targetRect.left,
        y: e.clientY - targetRect.top,
      });
    }

    setWidth((targetRect?.width || 0) * 2);
    setHeight((targetRect?.height || 0) * 2);
  }, []);

  const onMouseLeave = useCallback(() => {
    setVisible(false);
    setContainerPosition({ x: 0, y: 0 });
    setCursor({ x: 0, y: 0 });

    setBorderRadius('0');

    currentElementRef.current = null;
    setWidth(0);
    setHeight(0);
  }, []);

  const mutationObserverCallback = useCallback(() => {
    const nodeExists =
      currentElementRef.current && currentElementRef.current?.parentElement;

    if (!nodeExists) {
      onMouseLeave();
    }
  }, []);

  useMutationObserver(document.body, mutationObserverCallback, mutationOptions);

  return (
    <RainbowEffectContext.Provider
      value={{
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
      }}
    >
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
                width: `${width}px`,
                height: `${width}px`,
                filter: `blur(${blur}px)`,
              }}
            ></div>
          </div>
        </div>
      )}
    </RainbowEffectContext.Provider>
  );
};

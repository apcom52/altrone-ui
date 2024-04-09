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
import { Point } from '../../types';

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
export const useRainbowEffect = () => useContext(RainbowEffectContext);

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

  const currentElementRef = useRef<HTMLElement | null>(null);

  const onMouseEnter = useCallback<MouseEventHandler<HTMLElement>>((e) => {
    setVisible(true);

    currentElementRef.current = e.currentTarget;

    setBorderRadius(getComputedStyle(currentElementRef.current).borderRadius);

    const targetRect = currentElementRef.current?.getBoundingClientRect();
    setContainerPosition({ x: targetRect.x, y: targetRect.y });

    setCursor({
      x: e.clientX - targetRect.left,
      y: e.clientY - targetRect.top,
    });

    setRotation(Math.round(Math.random() * 360));

    setWidth(targetRect.width);
    setHeight(targetRect.height);
  }, []);

  const onMouseMove = useCallback<MouseEventHandler>((e) => {
    const targetRect = currentElementRef.current?.getBoundingClientRect();
    setContainerPosition({ x: targetRect?.x || 0, y: targetRect?.y || 0 });

    if (targetRect) {
      setCursor({
        x: e.clientX - targetRect.left,
        y: e.clientY - targetRect.top,
      });
    }

    setWidth(targetRect?.width || 0);
    setHeight(targetRect?.height || 0);
  }, []);

  const onMouseLeave = useCallback<MouseEventHandler>(() => {
    setVisible(false);
    setContainerPosition({ x: 0, y: 0 });
    setCursor({ x: 0, y: 0 });

    setBorderRadius('0');

    currentElementRef.current = null;
    setWidth(0);
    setHeight(0);
  }, []);

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
              }}
            ></div>
          </div>
        </div>
      )}
    </RainbowEffectContext.Provider>
  );
};

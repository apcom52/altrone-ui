import { useEffect, useMemo, useState } from 'react';

const SIZES_VALUES: Record<string, number> = {
  DesktopXL: 1920,
  DesktopL: 1600,
  DesktopM: 1440,
  DesktopS: 1366,
  DesktopXS: 1280,
  TabletL: 1024,
  TabletM: 834,
  TabletS: 768,
  PhoneL: 430,
  PhoneM: 393,
  PhoneS: 320
};

interface SizeResult extends Record<string, number | boolean | any> {
  width: number;
  height: number;
  DesktopXL: boolean;
  DesktopL: boolean;
  DesktopM: boolean;
  DesktopS: boolean;
  DesktopXS: boolean;
  TabletL: boolean;
  TabletM: boolean;
  TabletS: boolean;
  PhoneL: boolean;
  PhoneM: boolean;
  PhoneS: boolean;
  gtDesktopXL: boolean;
  gtDesktopL: boolean;
  gtDesktopM: boolean;
  gtDesktopS: boolean;
  gtDesktopXS: boolean;
  gtTabletL: boolean;
  gtTabletM: boolean;
  gtTabletS: boolean;
  gtPhoneL: boolean;
  gtPhoneM: boolean;
  gtPhoneS: boolean;
  ltDesktopXL: boolean;
  ltDesktopL: boolean;
  ltDesktopM: boolean;
  ltDesktopS: boolean;
  ltDesktopXS: boolean;
  ltTabletL: boolean;
  ltTabletM: boolean;
  ltTabletS: boolean;
  ltPhoneL: boolean;
  ltPhoneM: boolean;
  ltPhoneS: boolean;
  gteDesktopXL: boolean;
  gteDesktopL: boolean;
  gteDesktopM: boolean;
  gteDesktopS: boolean;
  gteDesktopXS: boolean;
  gteTabletL: boolean;
  gteTabletM: boolean;
  gteTabletS: boolean;
  gtePhoneL: boolean;
  gtePhoneM: boolean;
  gtePhoneS: boolean;
  lteDesktopXL: boolean;
  lteDesktopL: boolean;
  lteDesktopM: boolean;
  lteDesktopS: boolean;
  lteDesktopXS: boolean;
  lteTabletL: boolean;
  lteTabletM: boolean;
  lteTabletS: boolean;
  ltePhoneL: boolean;
  ltePhoneM: boolean;
  ltePhoneS: boolean;
  between: (from: string, to: string) => boolean;
}

const useDeviceSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return [width, height];
};

export const useWindowSize = () => {
  const [width, height] = useDeviceSize();

  return useMemo(() => {
    if (width === 0 && height === 0) {
      return {};
    }

    const result: Partial<SizeResult> = {
      width,
      height,
      between: (from, to) => {
        return width >= SIZES_VALUES[from] && width <= SIZES_VALUES[to];
      }
    };

    const SIZES_NAMES = Object.keys(SIZES_VALUES);
    for (let i = 0; i < SIZES_NAMES.length; i++) {
      const name = SIZES_NAMES[i];
      const value = SIZES_VALUES[name];
      result['gt' + name] = width > value;
      result['gte' + name] = width >= value;
      result['lt' + name] = width < value;
      result['lte' + name] = width <= value;

      if (i === 0) {
        result[name] = width >= value;
      } else if (i === SIZES_NAMES.length - 1) {
        result[name] = width <= value;
      } else {
        result[name] = width >= value && width <= SIZES_VALUES[SIZES_NAMES[i - 1]];
      }
    }

    return result;
  }, [width, height]);
};

import { createContext, useCallback, useMemo, useState } from 'react';

type PortalScope = { element: HTMLElement; trapped: boolean };
type RegisterPortal = (element: HTMLElement, trapped: boolean) => () => void;

export const SheetFocusContext = createContext<RegisterPortal | null>(null);

export const useSheetFocusScope = () => {
  const [portals, setPortals] = useState<PortalScope[]>([]);
  const registerPortal = useCallback<RegisterPortal>((element, trapped) => {
    const portal = { element, trapped };
    setPortals((previous) => [...previous, portal]);
    return () =>
      setPortals((previous) => previous.filter((entry) => entry !== portal));
  }, []);
  const portalElements = useMemo(
    () => portals.map(({ element }) => element),
    [portals],
  );

  return {
    registerPortal,
    portalElements,
    paused: portals.some(({ trapped }) => trapped),
  };
};

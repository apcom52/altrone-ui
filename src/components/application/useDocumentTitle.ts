import { useEffect, useLayoutEffect, useState } from 'react';
import {
  DocumentTitleController,
  registerDocumentTitleController,
  unregisterDocumentTitleController,
} from './documentTitle';

/**
 * Combines `Screen.title` (reported via `setScreenTitle`) with
 * `applicationName` into `document.title`, as "<screen title> - <app name>".
 * `setPageTitle`/`resetPageTitle` take priority over the computed value while
 * an override is active. `manageTitle={false}` turns off the automatic
 * computation only — an active override still applies.
 */
export const useDocumentTitle = (
  applicationName: string | undefined,
  manageTitle: boolean,
) => {
  const [screenTitle, setScreenTitle] = useState<string | undefined>(
    undefined,
  );
  const [override, setOverride] = useState<string | null>(null);

  /**
   * `useLayoutEffect`, not `useEffect`: child effects fire before parent
   * effects, so a descendant `Screen` reporting its title in its own
   * `useEffect` would otherwise run before this registration on initial
   * mount. All layout effects in the tree run before any passive effect,
   * so this is guaranteed to be registered first regardless of nesting.
   */
  useLayoutEffect(() => {
    const controller: DocumentTitleController = {
      setScreenTitle,
      setOverride,
      resetOverride: () => setOverride(null),
    };
    registerDocumentTitleController(controller);
    return () => unregisterDocumentTitleController(controller);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    if (override !== null) {
      document.title = override;
      return;
    }

    if (!manageTitle) {
      return;
    }

    const computed = [screenTitle, applicationName]
      .filter(Boolean)
      .join(' - ');
    if (computed) {
      document.title = computed;
    }
  }, [screenTitle, applicationName, manageTitle, override]);
};

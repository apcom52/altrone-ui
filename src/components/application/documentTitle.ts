export type DocumentTitleController = {
  setScreenTitle: (title: string | undefined) => void;
  setOverride: (title: string) => void;
  resetOverride: () => void;
};

/**
 * A stack rather than a single ref so nested `Application`s (and tests that
 * mount/unmount their own) don't clobber each other — the most recently
 * mounted instance handles new calls, and unmounting one falls back to the
 * previous.
 */
const controllers: DocumentTitleController[] = [];

export const registerDocumentTitleController = (
  controller: DocumentTitleController,
) => {
  controllers.push(controller);
};

export const unregisterDocumentTitleController = (
  controller: DocumentTitleController,
) => {
  const index = controllers.lastIndexOf(controller);
  if (index !== -1) {
    controllers.splice(index, 1);
  }
};

const getController = (): DocumentTitleController | undefined => {
  const controller = controllers[controllers.length - 1];
  if (!controller) {
    console.warn('Application is not mounted');
  }
  return controller;
};

/**
 * Internal channel `Screen` uses to report its `title` up to the mounted
 * `Application`, which combines it with `applicationName`. Not part of the
 * public API (not re-exported from `index.ts`) — silent no-op with no
 * `Application` mounted, since a `Screen` without a `title` calls this on
 * every mount regardless of whether the feature is in use.
 */
export const setScreenTitle = (title: string | undefined): void => {
  controllers[controllers.length - 1]?.setScreenTitle(title);
};

/** Overrides the document title `Application` computes from `Screen.title`/`applicationName`, until `resetPageTitle()` is called. */
export const setPageTitle = (title: string): void => {
  getController()?.setOverride(title);
};

/** Reverts to the title `Application` computes automatically (a no-op if `setPageTitle` was never called). */
export const resetPageTitle = (): void => {
  getController()?.resetOverride();
};

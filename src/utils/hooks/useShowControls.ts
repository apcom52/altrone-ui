interface UseShowControlsParams {
  propValue?: boolean;
  configValue?: boolean;
  readOnly?: boolean;
}

/**
 * Resolves whether controls should be shown, following this priority:
 * 1. readOnly=true → always false
 * 2. propValue (if explicitly provided)
 * 3. configValue (if explicitly provided)
 * 4. default → true
 */
export const useShowControls = ({
  propValue,
  configValue,
  readOnly,
}: UseShowControlsParams): boolean => {
  if (readOnly) return false;
  if (typeof propValue === 'boolean') return propValue;
  if (typeof configValue === 'boolean') return configValue;
  return true;
};

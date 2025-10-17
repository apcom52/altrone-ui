import { useAltroneTheme } from 'components/application';

interface GlassValues {
  BACKGROUND_DEFAULT: number;
  BACKGROUND_ACTIVE: number;
  GLOW_OPACITY: number;
  GLOW_ACTIVE_OPACITY: number;
}

const DARK_DEFAULT_VALUES: GlassValues = {
  BACKGROUND_DEFAULT: 0.2,
  BACKGROUND_ACTIVE: 0.3,
  GLOW_OPACITY: 0.15,
  GLOW_ACTIVE_OPACITY: 0.25,
};

const LIGHT_DEFAULT_VALUES: GlassValues = {
  BACKGROUND_DEFAULT: 1,
  BACKGROUND_ACTIVE: 0.9,
  GLOW_OPACITY: 0.5,
  GLOW_ACTIVE_OPACITY: 0.75,
};

export const useGlassValues = () => {
  const { theme } = useAltroneTheme();

  if (theme === 'dark') {
    return DARK_DEFAULT_VALUES;
  }

  return LIGHT_DEFAULT_VALUES;
};

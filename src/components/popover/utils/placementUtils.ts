import { Placement } from '@floating-ui/react';

export interface PlacementConfig {
  offset: number;
  placement: Placement;
  shouldUseAutoPlacement: boolean;
}

/**
 * Получает конфигурацию для placement в зависимости от режима overlap
 */
export const getPlacementConfig = (
  placement: 'auto' | Placement,
  overlap: boolean
): PlacementConfig => {
  if (overlap) {
    // Для overlap режима используем специальные placement'ы
    const overlapPlacements: Record<string, PlacementConfig> = {
      top: {
        offset: -4,
        placement: 'top-start',
        shouldUseAutoPlacement: false,
      },
      bottom: {
        offset: -4,
        placement: 'bottom-start',
        shouldUseAutoPlacement: false,
      },
      left: {
        offset: -4,
        placement: 'left-start',
        shouldUseAutoPlacement: false,
      },
      right: {
        offset: -4,
        placement: 'right-start',
        shouldUseAutoPlacement: false,
      },
      'top-start': {
        offset: -4,
        placement: 'top-start',
        shouldUseAutoPlacement: false,
      },
      'top-end': {
        offset: -4,
        placement: 'top-end',
        shouldUseAutoPlacement: false,
      },
      'bottom-start': {
        offset: -4,
        placement: 'bottom-start',
        shouldUseAutoPlacement: false,
      },
      'bottom-end': {
        offset: -4,
        placement: 'bottom-end',
        shouldUseAutoPlacement: false,
      },
      'left-start': {
        offset: -4,
        placement: 'left-start',
        shouldUseAutoPlacement: false,
      },
      'left-end': {
        offset: -4,
        placement: 'left-end',
        shouldUseAutoPlacement: false,
      },
      'right-start': {
        offset: -4,
        placement: 'right-start',
        shouldUseAutoPlacement: false,
      },
      'right-end': {
        offset: -4,
        placement: 'right-end',
        shouldUseAutoPlacement: false,
      },
    };

    return (
      overlapPlacements[placement] || {
        offset: -4,
        placement: 'top-start',
        shouldUseAutoPlacement: false,
      }
    );
  }

  // Обычный режим
  return {
    offset: 4,
    placement: placement === 'auto' ? 'top' : placement,
    shouldUseAutoPlacement: placement === 'auto',
  };
};

/**
 * Применяет стили для overlap режима
 */
export const applyOverlapStyles = (
  elements: { floating: HTMLElement },
  rects: { reference: { x: number; y: number; width: number; height: number } },
  _placement: Placement
): void => {
  const { floating } = elements;
  const { reference } = rects;

  // Для overlap режима всегда используем точные координаты reference элемента
  Object.assign(floating.style, {
    left: `${reference.x - 4}px`,
    top: `${reference.y - 4}px`,
    position: 'absolute',
  });
};

/**
 * Получает список всех доступных placement'ов для демонстрации
 */
export const getAllPlacements = (): Array<{
  value: Placement;
  label: string;
}> => [
  { value: 'top', label: 'Top' },
  { value: 'top-start', label: 'Top Start' },
  { value: 'top-end', label: 'Top End' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'bottom-start', label: 'Bottom Start' },
  { value: 'bottom-end', label: 'Bottom End' },
  { value: 'left', label: 'Left' },
  { value: 'left-start', label: 'Left Start' },
  { value: 'left-end', label: 'Left End' },
  { value: 'right', label: 'Right' },
  { value: 'right-start', label: 'Right Start' },
  { value: 'right-end', label: 'Right End' },
];

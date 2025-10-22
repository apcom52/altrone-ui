import {
  arrow,
  autoPlacement,
  flip,
  offset,
  shift,
  size,
} from '@floating-ui/react';
import { PlacementConfig, applyOverlapStyles } from './placementUtils';

/**
 * Создает middleware для FloatingUI в зависимости от конфигурации
 */
export const createMiddleware = (
  config: PlacementConfig,
  arrowRef: React.RefObject<HTMLDivElement | null>,
  parentWidth: boolean,
  _overlap: boolean
) => {
  const middleware = [
    offset(config.offset),
    config.shouldUseAutoPlacement ? autoPlacement() : flip(),
    shift({ padding: 4 }),
    size({
      apply({ rects, elements }) {
        if (parentWidth) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        }
      },
    }),
  ];

  // Добавляем arrow middleware только если есть arrowRef
  if (arrowRef.current) {
    middleware.push(
      arrow({
        element: arrowRef as React.RefObject<HTMLDivElement>,
        padding: 8,
      })
    );
  }

  return middleware;
};

/**
 * Создает middleware для overlap режима с дополнительными стилями
 */
export const createOverlapMiddleware = (
  config: PlacementConfig,
  arrowRef: React.RefObject<HTMLDivElement | null>,
  parentWidth: boolean
) => {
  const middleware = [
    // Для overlap режима не используем offset, flip, shift
    // так как мы хотим точное позиционирование
    size({
      apply({ rects, elements }) {
        if (parentWidth) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        }

        // Применяем overlap стили - это основной способ позиционирования
        applyOverlapStyles(elements, rects, config.placement);
      },
    }),
  ];

  // Добавляем arrow middleware только если есть arrowRef
  if (arrowRef.current) {
    middleware.push(
      arrow({
        element: arrowRef as React.RefObject<HTMLDivElement>,
        padding: 8,
      })
    );
  }

  return middleware;
};

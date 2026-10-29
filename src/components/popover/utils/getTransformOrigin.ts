export const getTransformOrigin = (
  placement: string,
  overlap: boolean
): string => {
  switch (placement) {
    case 'top-start':
      return 'bottom left';
    case 'top':
      return 'bottom center';
    case 'top-end':
      return 'bottom right';
    case 'bottom-start':
      return 'top left';
    case 'bottom':
      return 'top center';
    case 'bottom-end':
      return 'top right';
    case 'left-start':
      return 'top right';
    case 'left':
      return overlap ? 'center left' : 'center right';
    case 'left-end':
      return 'bottom right';
    case 'right-start':
      return 'top left';
    case 'right':
      return overlap ? 'center right' : 'center left';
    case 'right-end':
      return 'bottom left';
    default:
      return overlap ? 'top left' : 'bottom right';
  }
};

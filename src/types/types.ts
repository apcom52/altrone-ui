import { Ref } from 'react';

export type Point = {
  x: number;
  y: number;
};

export type Offset = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export type RenderFuncProp<HTMLElementType, ElementProperties> = (
  ref: Ref<HTMLElementType>,
  props: Omit<ElementProperties, 'renderFunc'>,
) => JSX.Element;

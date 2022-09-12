import {Offset} from "../hooks/useOffset/useOffset";

export type WithoutDefaultOffsets<T = React.HTMLProps<HTMLDivElement>> = Omit<T, 'margin' | 'padding'>

export type WithAltroneOffsets = {
  margin?: number | Offset
  padding?: number | Offset
}
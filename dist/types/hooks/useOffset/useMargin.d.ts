import { Offset } from "./useOffset";
export interface Margin {
    margin?: number | string;
    marginTop?: number;
    marginLeft?: number;
    marginRight?: number;
    marginBottom?: number;
}
export declare const useMargin: (params: number | Offset) => Margin;

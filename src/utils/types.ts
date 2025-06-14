import { ReactElement, ReactNode } from 'react';

export type NestedKeys<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeys<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & (string | number)];

export type ChildrenType = ReactNode | undefined;

export type AnyObject = Record<PropertyKey, any>;

export type RenderFunction<ReturnType, Arguments = undefined> =
  | ReturnType
  | ((data: Arguments) => ReturnType);

export type CustomRenderFunction<Arguments> = (data: Arguments) => ReactNode;

export type StrictReactElements<T extends object> =
  | ReactElement<T>
  | null
  | undefined
  | Array<ReactElement<T> | null | undefined>;

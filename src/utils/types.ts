import { ReactNode } from 'react';

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

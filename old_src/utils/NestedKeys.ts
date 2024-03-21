export type NestedKeys<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeys<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & (string | number)];

export type RenderFunction<ReturnType, Arguments = undefined> =
  | ReturnType
  | ((data: Arguments) => ReturnType);

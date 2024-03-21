export type OptionValue<T, Multiple extends boolean | undefined = false> = Multiple extends true
  ? T[]
  : T | undefined;

export const getValueFromSequence = (defaultValue: boolean, ...args: (boolean | undefined)[]) => {
  for (const argument of args) {
    if (typeof argument === 'boolean') {
      return argument;
    }
  }

  return defaultValue;
};

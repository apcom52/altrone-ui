export const makeDateString = (date = new Date()) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

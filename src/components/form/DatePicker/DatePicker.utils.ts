export const date2Number = (date: Date) => {
  return date.getFullYear() * 1000 + date.getMonth() * 50 + date.getDate();
};

export const number2Date = (number: number | undefined) => {
  if (typeof number === 'undefined') {
    return undefined;
  }

  const year = number / 1000;
  const monthAndDate = number % 1000;
  return new Date(year, Math.floor(monthAndDate / 50), monthAndDate % 50);
};

export const numberDate2Year = (number: number | undefined) => {
  if (typeof number === 'undefined') {
    return undefined;
  }

  return Math.floor(number / ONE_YEAR);
};

export const year2NumberDate = (year: number) => {
  return year * ONE_YEAR;
};

export const getMonthFromNumber = (number: number | undefined) => {
  if (typeof number === 'undefined') {
    return undefined;
  }

  return Math.floor((number % ONE_YEAR) / ONE_MONTH);
};

export const numberDate2YearAndMonth = (number: number | undefined) => {
  if (typeof number === 'undefined') {
    return undefined;
  }

  const year = numberDate2Year(number) || 0;
  const month = getMonthFromNumber(number) || 0;

  return year * ONE_YEAR + month * ONE_MONTH;
};

export const numberDate2Day = (number: number | undefined) => {
  if (typeof number === 'undefined') {
    return undefined;
  }

  const yearAndMonth = numberDate2YearAndMonth(number) || 0;

  return number - yearAndMonth + 1;
};

export const ONE_YEAR = 1000;
export const ONE_MONTH = 50;

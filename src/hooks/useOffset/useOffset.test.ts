import { useOffset } from './index';

describe('hooks: useOffset', () => {
  test('should returned valid value, if pass number', () => {
    expect(useOffset(5)).toStrictEqual({
      offset: 5,
      top: 5,
      left: 5,
      right: 5,
      bottom: 5
    });
  });

  test('should returned valid value, if pass vertical value', () => {
    expect(useOffset({ vertical: 3 })).toStrictEqual({
      top: 3,
      bottom: 3
    });
  });

  test('should returned valid value, if pass horizontal value', () => {
    expect(useOffset({ horizontal: 3 })).toStrictEqual({
      left: 3,
      right: 3
    });
  });

  test('should returned valid value, if pass horizontal and vertical value', () => {
    expect(useOffset({ vertical: 4, horizontal: 3 })).toStrictEqual({
      top: 4,
      bottom: 4,
      left: 3,
      right: 3
    });
  });

  test('should returned valid value, if pass left and top values', () => {
    expect(useOffset({ left: 5, top: 10 })).toStrictEqual({
      left: 5,
      top: 10
    });
  });

  test('should returned valid value, if pass vertical, left and bottom values', () => {
    expect(useOffset({ vertical: 10, left: 4, bottom: 5 })).toStrictEqual({
      top: 10,
      left: 4,
      bottom: 5
    });
  });

  test('should returned valid value, if pass equal values', () => {
    expect(useOffset({ vertical: 5, horizontal: 5 })).toStrictEqual({
      offset: 5,
      top: 5,
      left: 5,
      right: 5,
      bottom: 5
    });
  });
});

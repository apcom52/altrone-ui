import { useMargin } from './index';

describe('hooks: useMargin', () => {
  test('should returned valid value, if pass number', () => {
    expect(useMargin(5)).toStrictEqual({
      margin: 20
    });
  });

  test('should returned valid value, if pass top and bottom', () => {
    expect(useMargin({ vertical: 5 })).toStrictEqual({
      marginTop: 20,
      marginBottom: 20
    });
  });

  test('should returned valid value, if pass left and right', () => {
    expect(useMargin({ horizontal: 5 })).toStrictEqual({
      marginLeft: 20,
      marginRight: 20
    });
  });

  test('should returned valid value, if pass top and right', () => {
    expect(useMargin({ top: 5, right: 10 })).toStrictEqual({
      marginTop: 20,
      marginRight: 40
    });
  });

  test('should returned valid value, if pass top, bottom and right', () => {
    expect(useMargin({ vertical: 5, right: 10 })).toStrictEqual({
      marginTop: 20,
      marginBottom: 20,
      marginRight: 40
    });
  });

  test('should returned valid value, if pass all values', () => {
    expect(useMargin({ vertical: 5, horizontal: 10 })).toStrictEqual({
      margin: '20px 40px'
    });
  });

  test('should returned valid value, if pass all equal values', () => {
    expect(useMargin({ vertical: 5, horizontal: 5 })).toStrictEqual({
      margin: 20
    });
  });
});

import {usePadding} from "./index";

describe('hooks: usePadding', () => {
  test('should returned valid value, if pass number', () => {
    expect(usePadding(5)).toStrictEqual({
      padding: 20
    })
  })

  test('should returned valid value, if pass top and bottom', () => {
    expect(usePadding({ vertical: 5 })).toStrictEqual({
      paddingTop: 20,
      paddingBottom: 20
    })
  })

  test('should returned valid value, if pass left and right', () => {
    expect(usePadding({ horizontal: 5 })).toStrictEqual({
      paddingLeft: 20,
      paddingRight: 20
    })
  })

  test('should returned valid value, if pass top and right', () => {
    expect(usePadding({ top: 5, right: 10 })).toStrictEqual({
      paddingTop: 20,
      paddingRight: 40
    })
  })

  test('should returned valid value, if pass top, bottom and right', () => {
    expect(usePadding({ vertical: 5, right: 10 })).toStrictEqual({
      paddingTop: 20,
      paddingBottom: 20,
      paddingRight: 40
    })
  })

  test('should returned valid value, if pass all values', () => {
    expect(usePadding({ vertical: 5, horizontal: 10 })).toStrictEqual({
      padding: '20px 40px'
    })
  })

  test('should returned valid value, if pass all equal values', () => {
    expect(usePadding({ vertical: 5, horizontal: 5 })).toStrictEqual({
      padding: 20
    })
  })


})
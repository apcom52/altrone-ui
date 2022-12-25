module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  fakeTimers: {
    enableGlobally: true
  }
};

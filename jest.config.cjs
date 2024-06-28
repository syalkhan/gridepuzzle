module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};

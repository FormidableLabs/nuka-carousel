module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/test/jest/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};

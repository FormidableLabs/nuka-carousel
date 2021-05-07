module.exports = {
  testEnvironment: 'enzyme',
  setupFilesAfterEnv: [
    './node_modules/jest-enzyme/lib/index.js',
    '<rootDir>/jest.setup.js'
  ],
  roots: ['<rootDir>/test/specs/']
};

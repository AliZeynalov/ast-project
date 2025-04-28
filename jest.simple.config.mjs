// Jest configuration for simple tests without mocks
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js)x?$': 'babel-jest',
  },
  setupFiles: [], // No setup files means no mocking
  extensionsToTreatAsEsm: ['.ts'],
}; 
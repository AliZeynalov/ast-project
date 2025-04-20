// Jest configuration for simple tests without mocks
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: [], // No setup files means no mocking
}; 
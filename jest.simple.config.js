// Jest configuration for simple tests without mocks
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: [], // No setup files means no mocking
}; 
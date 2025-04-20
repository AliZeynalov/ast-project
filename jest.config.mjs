export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // Mock fetch globally
  setupFiles: ['./jest.setup.js'],
}; 
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|js)x?$': 'babel-jest',
  },
  setupFiles: ['./jest.setup.js'],
  extensionsToTreatAsEsm: ['.ts'],
}; 
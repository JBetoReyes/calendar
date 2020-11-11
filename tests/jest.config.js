module.exports = {
  roots: ['..', '<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Setup Enzyme
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/setupEnzyme.ts'],

  // Setup Fetch Mock
  setupFiles: ['<rootDir>/setupFetch.ts'],

  // Alias
  moduleNameMapper: {
    '\\.(s?css)$': '<rootDir>/__mocks__/styleMock.js',
  },
};

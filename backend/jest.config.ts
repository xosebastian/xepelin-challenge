module.exports = {
  verbose: true,
  clearMocks: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  setupFiles: ['<rootDir>/jest-setup-file.ts'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '\\\\node_modules\\\\',
    'migrations',
    'main.ts',
    'index.ts',
    '.exception.ts',
    '.error.ts',
    '.entity.ts',
    '.module.ts',
    '.dto.ts',
    '.enum.ts',
    '.type.ts',
    '.interface.ts',
    '.mock.ts',
    '.spec.ts',
    'datasource.ts',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '@core/(.*)': '<rootDir>/src/core/$1',
    '@account/(.*)': '<rootDir>/src/account/$1',
  },
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  reporters: ['default'],
};

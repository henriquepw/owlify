const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig');

const { name } = require('./package.json');

module.exports = {
  displayName: name,
  name,

  collectCoverage: true,
  collectCoverageFrom: ['src/modules/**/services/*.ts'],

  coverageDirectory: '__tests__/coverage',
  coverageReporters: ['text', 'lcov'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),

  transform: { '^.+\\.ts$': 'ts-jest' },
};

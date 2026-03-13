/** @type {import('jest').Config} */
module.exports = {
  transform: { '^.+\\.tsx?$': ['ts-jest', { diagnostics: false }] },
  testEnvironment: 'node',
};

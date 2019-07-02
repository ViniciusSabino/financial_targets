// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    name: 'accounts-api',
    displayName: 'accounts-api',
    verbose: true,
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: '__tests__/coverage',
    testEnvironment: 'node',
    testMatch: ['**/api/**/*+(spec|test).[jt]s?(x)'],
    coveragePathIgnorePatterns: ['/node_modules'],
    coverageThreshold: {
        global: {
            statements: 40,
            branches: 40,
            functions: 40,
            lines: 40,
        },
    },
};

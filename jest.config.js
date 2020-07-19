module.exports = {
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],
    coverageDirectory: '__tests__/coverage',
    coveragePathIgnorePatterns: [
        '/node_modules',
        '/__tests__',

        '/src/database',
        '/src/config',
        '/src/routes',
        '/src/server.js',
        '/src/controllers/home.js',
    ],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
        },
    },
    displayName: {
        name: '@financial-targets/accounts',
        color: 'red',
    },
    moduleFileExtensions: ['js'],
    name: '@financial-targets/accounts',
    testEnvironment: 'node',
    testMatch: ['**/src/**/*+(spec|test).[jt]s?(x)'],
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    verbose: true,
};

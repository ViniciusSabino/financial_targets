// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    name: "accounts-api",
    displayName: "accounts-api",
    verbose: true,
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "__tests__/coverage",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*+(spec|test).[jt]s?(x)"],
};

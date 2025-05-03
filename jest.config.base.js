// Base Jest config for monorepo

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: [
    "<rootDir>/packages/reark",
    "<rootDir>/packages/submodule-a",
    "<rootDir>/packages/submodule-b",
    "<rootDir>/examples/react-app",
  ],
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js|jsx)",
    "**/?(*.)+(spec|test).(ts|tsx|js|jsx)",
  ],
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "packages/**/*.{ts,tsx,js,jsx}",
    "examples/**/*.{ts,tsx,js,jsx}",
  ],
};

module.exports = {
  rootDir: "../../",
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/packages/renderer/tsconfig.json",
    },
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules"],
  roots: ["<rootDir>/packages/renderer/src/components"],
  testMatch: [
    "**/tests/blocks/**/*.(ts|tsx|js|jsx)",
    "**/?(*.)+(spec|test).(ts|tsx|js|jsx)",
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "<rootDir>/packages/renderer/jest.setup.js",
  ],
  coverageDirectory: "<rootDir>/packages/renderer/coverage",
  collectCoverageFrom: [
    "packages/renderer/src/components/**/*.{ts,tsx,js,jsx}",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^ws$": "<rootDir>/node_modules/ws/index.js",
  },
};

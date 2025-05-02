/* eslint-env node */
// Root ESLint config for monorepo

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: [
          "./renderer/tsconfig.json",
          "./lark-api/tsconfig.json",
          "./examples/reark-next/tsconfig.json",
        ],
      },
    },
  },
  overrides: [
    {
      files: ["examples/react-app/**/*.{js,jsx,ts,tsx}"],
      extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
      rules: {
        // Add or override React-specific rules here
      },
    },
  ],
};

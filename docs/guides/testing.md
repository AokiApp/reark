# Testing & Development Guide

This guide describes the testing strategy, test organization, running tests, best practices, and CI integration for the AokiApp Reark monorepo.

---

## Testing Strategy

AokiApp Reark uses a comprehensive testing approach to ensure code quality and reliability:

- **Unit Tests:** Validate individual functions and components in isolation.
- **Integration Tests:** Ensure that multiple components or modules work together as expected.
- **Visual Regression Testing (VRT):** Used in the renderer package to ensure UI consistency by comparing rendered output against snapshots.

Tests are written using [Jest](https://jestjs.io/) and [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/). Visual regression tests use Jest snapshots.

---

## Test Organization

- **Location:**
  - Most tests are located in `packages/renderer/src/components/tests/` and follow the pattern `*.test.tsx` for component tests.
  - Snapshots for VRT are stored in `__snapshots__/` directories alongside their test files.
- **Naming Conventions:**
  - Test files use `.test.ts` or `.test.tsx` suffixes.
  - Snapshots are automatically managed by Jest.

---

## Running Tests

- **All Packages:**  
  Run all tests in the monorepo:
  ```sh
  pnpm test
  ```
- **Single Package:**  
  From a package directory (e.g., `packages/renderer`):
  ```sh
  pnpm test
  ```
- **Visual Regression Tests:**  
  The renderer package uses VRT. **Japanese fonts (e.g., Noto Sans CJK JP) must be installed** for consistent results.

  ### Installing Japanese Fonts

  - **Ubuntu / Debian:**
    ```sh
    sudo apt update
    sudo apt install fonts-noto-cjk
    ```
  - **CentOS / RHEL:**
    ```sh
    sudo yum install google-noto-sans-cjk-fonts
    ```
  - **macOS (Homebrew):**
    ```sh
    brew tap homebrew/cask-fonts
    brew install --cask font-noto-sans-cjk
    ```
  - **Windows (Chocolatey):**
    ```sh
    choco install noto
    ```
  - Or download from [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+JP).

  After installing fonts:

  - Restart your test runner or development server.
  - Ensure CI environments include font installation steps.

---

## Best Practices

- Write clear, focused tests for each function or component.
- Use descriptive test names.
- Update snapshots only when intentional UI changes are made.
- Review test failures carefully; see the [Troubleshooting Guide](../troubleshooting.md) for help.
- Keep tests up to date with code changes.

---

## CI Integration & Quality Gates

- All pull requests must pass tests before merging.
- CI runs `pnpm lint`, `pnpm typecheck`, and `pnpm test` as quality gates.
- Visual regression tests are run in CI; ensure required fonts are installed in the CI environment.
- See the [Contributing Guide](contributing.md) for more on required checks and the contribution process.

---

For troubleshooting test failures, see the [Troubleshooting Guide](../troubleshooting.md).

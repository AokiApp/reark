# Contributing Guide

Thank you for your interest in contributing to AokiApp Reark! This guide explains how to contribute, the code style and review process, and the quality gates required for all changes.

---

## How to Contribute

1. **Fork the repository** and create your own feature branch.
2. **Make your changes** following the code style and testing guidelines.
3. **Run all checks** (lint, typecheck, test) before submitting.
4. **Submit a pull request (PR)** with a clear description of your changes.
5. For major changes, **open an issue** first to discuss your proposal.

---

## Code Review Process

- All PRs are reviewed for code quality, correctness, and adherence to project standards.
- Required checks before merging:
  - **Lint:** Code must pass ESLint (`pnpm lint`).
  - **Typecheck:** Code must pass TypeScript checks (`pnpm typecheck`).
  - **Tests:** All tests must pass (`pnpm test`), including visual regression tests.
- Reviewers may request changes or additional tests before approval.

---

## Code Style

- **Linting:**
  - Uses [ESLint](https://eslint.org/) with TypeScript, React, and import plugins.
  - Run lint checks with:
    ```sh
    pnpm lint
    ```
- **Formatting:**
  - Uses [Prettier](https://prettier.io/) with default settings.
  - Check formatting:
    ```sh
    pnpm format
    ```
  - Auto-format code:
    ```sh
    pnpm format:write
    ```
- **Configuration:**
  - See `.eslintrc.cjs` and `.prettierrc` in the repo root for details.

---

## Quality Gates & CI/CD

- All PRs must pass lint, typecheck, and test checks before merging.
- CI/CD is managed via [GitHub Actions](https://github.com/aokiapp/reark/actions) and [Turborepo](https://turbo.build/).
- The build status badge is shown in the [README](../../README.md).
- Visual regression tests require Japanese fonts; see the [Testing Guide](testing.md) for setup.

---

## Submitting Issues & Getting Help

- For bugs, feature requests, or questions, [open an issue](https://github.com/aokiapp/reark/issues).
- For major changes, discuss your proposal in an issue before starting work.
- See the [Troubleshooting Guide](../troubleshooting.md) for common problems.

---

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code.

---

## Related Guides

- [Testing Guide](testing.md)
- [Troubleshooting Guide](../troubleshooting.md)

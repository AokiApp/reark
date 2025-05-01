# Development Workflow

This document describes the daily workflow for developing, testing, and maintaining the Aokiapp Reark monorepo.

## 1. Install Dependencies

```sh
pnpm install
```

## 2. Lint, Type-Check, and Test

Run all checks from the root:

```sh
pnpm lint
pnpm type-check
pnpm test
```

## 3. Build Packages

Build all packages in parallel:

```sh
pnpm build
```

Or build a single package:

```sh
cd packages/reark
pnpm build
```

## 4. Develop the Example App

Start the dev server:

```sh
cd examples/react-app
pnpm dev
```

## 5. Making Changes

- Edit code in the relevant package under `packages/`.
- If you add new exports, update the package's `index.ts`.
- If you change dependencies between packages, update their `package.json` and re-run `pnpm install`.

## 6. Adding a New Package

1. Create a new directory under `packages/`.
2. Copy and adapt the Vite, TypeScript, and package.json configs from an existing package.
3. Add your code and exports.
4. Add the new package to `pnpm-workspace.yaml` if needed.

## 7. Running CI/CD Locally

You can simulate CI steps locally:

```sh
pnpm lint
pnpm type-check
pnpm test
pnpm build
```

## 8. Publishing

Library packages are published to npm via GitHub Actions on main branch pushes. See [CI/CD & Automation](./ci-cd.md).

---

For more on project philosophy and conventions, see [Conventions & Rationale](./rationale.md).
# Development Workflow

This document describes the daily workflow for developing, testing, and maintaining the Aokiapp Reark monorepo.

## 1. Install Dependencies

```sh
npm install
```

## 2. Lint, Type-Check, and Test

Run all checks from the root:

```sh
npm run lint
npm run typecheck
npm run test
```

## 3. Build Packages

Build all packages in parallel:

```sh
npm run build
```

Or build a single package:

```sh
cd packages/reark
npm run build
```

## 4. Develop the Example App

Start the dev server:

```sh
cd examples/react-app
npm run dev
```

## 5. Making Changes

- Edit code in the relevant package under `packages/`.
- If you add new exports, update the package's `index.ts`.
- If you change dependencies between packages, update their `package.json` and re-run `npm install`.

## 6. Adding a New Package

1. Create a new directory under `packages/`.
2. Copy and adapt the Vite, TypeScript, and package.json configs from an existing package.
3. Add your code and exports.

## 7. Running CI/CD Locally

You can simulate CI steps locally:

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

## 8. Publishing

Library packages are published to npm via GitHub Actions on main branch pushes. See [CI/CD & Automation](./ci-cd.md).

---

For more on project philosophy and conventions, see [Conventions & Rationale](./rationale.md).

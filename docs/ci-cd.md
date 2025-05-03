# CI/CD & Automation

This project uses GitHub Actions for continuous integration and delivery, with all builds and bundles performed by Vite.

## What is Automated?

- **Install & Cache:** Uses npm (the package manager) for reliable installs.
- **Lint:** Runs centralized ESLint across all packages and apps.
- **Type-Check:** Runs strict TypeScript checks for all code.
- **Test:** Runs Jest tests for all packages and apps.
- **Build:** Uses Vite to bundle all packages (library mode) and the example app (app mode).
- **Publish:** On main branch pushes, library packages are published to npm (requires NPM_TOKEN secret).

## Workflow File

See `.github/workflows/ci.yml` for the full workflow definition.

## How to Simulate CI Locally

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

## How to Publish

1. Ensure you have publish access and NPM_TOKEN set up.
2. Push to the main branch.
3. The workflow will build (with Vite) and publish changed packages.

## Why This Setup?

- **Reproducibility:** LLMs and humans can follow the same steps, with all tools and choices made explicit.
- **Reliability:** Automated checks catch issues early.
- **Speed:** Caching and parallelization via Turborepo.
- **Modern Tooling:** Vite is used for all builds, as explicitly required by project preferences.

---

For more on project philosophy, see [Conventions & Rationale](./rationale.md).

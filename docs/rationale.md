# Conventions & Rationale

This document explains the reasoning behind the technical and organizational choices in the Aokiapp Reark monorepo.

## Why a Monorepo?

- **Atomic changes:** Update multiple packages together.
- **Code sharing:** Reuse code and components easily.
- **Unified tooling:** Consistent linting, testing, and build across all packages.

## Why npm?

- **Default and Ubiquitous:** npm is the default package manager for Node.js and is widely supported across the JavaScript ecosystem.
- **Workspaces Support:** Modern npm supports monorepos and workspaces natively, making it easy to manage multiple packages.
- **Onboarding:** Most developers are familiar with npm, reducing friction for new contributors.
- **Reliability:** npm is stable, well-documented, and integrates seamlessly with CI/CD and publishing workflows.
- **Explicitly chosen as the package manager for this project.**

## Why Turborepo?

- **Task orchestration:** Runs builds, tests, and checks in parallel.
- **Caching:** Speeds up repeated tasks.
- **Scalability:** Handles large monorepos.
- **Explicitly chosen for orchestrating all tasks in this monorepo.**

## Why Vite for All Packages and Apps?

- **Speed:** Fast dev server and builds.
- **Library mode:** Suitable for both apps and libraries.
- **Modern:** Supports latest JS/TS and React features.
- **Explicitly used as the only bundler for all packages and the example app.**

## Why TypeScript, ESLint, Prettier, Jest?

- **TypeScript:** Type safety, better DX, fewer bugs. Strict mode is enforced.
- **ESLint:** Enforces code quality and best practices. Centralized config at the root.
- **Prettier:** Consistent code formatting. Centralized config at the root, using Prettier defaults.
- **Jest:** Reliable, fast testing for JS/TS and React.

## Naming & Structure

- **@aokiapp/reark**: Core library, branded for clarity and discoverability.
- **Submodules**: Named as `@aokiapp/reark-submodule-*` for clear relationships.
- **Example app**: Demonstrates integration, not published, but is a React app using Vite.

## Documentation Philosophy

- **For LLMs:** Prompts and structure are explicit for AI reproducibility. All technical choices are made explicit in the docs.
- **For humans:** Clear, step-by-step guides and rationale.
- **For historians:** Context and intent are documented for future study.

---

For CI/CD and automation details, see [CI/CD & Automation](./ci-cd.md).
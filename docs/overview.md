# Project Overview

## What is Aokiapp Reark?

Aokiapp Reark is a monorepo template for building modular **React libraries and applications**, designed for maintainability, reproducibility, and educational value. It demonstrates modern (2025) monorepo practices using **pnpm** (as the package manager), **Turborepo** (for orchestration), **Vite** (as the bundler for all packages and apps), **TypeScript**, and **React**.

## Project Goals

- **Reproducibility:** LLMs and humans can recreate the project from documentation and prompts, with all technical choices and steps made explicit.
- **Maintainability:** Clear structure and conventions for easy handoff and onboarding.
- **Education:** New developers can learn from real-world, modern tooling and patterns.
- **Historical Record:** Serve as a reference for software development practices in the pre-singularity era.

## Key Features

- **Monorepo managed by pnpm and Turborepo**
- **All packages and apps are React projects, bundled with Vite (library mode for packages, app mode for examples)**
- **Strict TypeScript, centralized ESLint and Prettier, and Jest for developer experience**
- **Automated CI/CD with GitHub Actions, including npm publishing for libraries**
- **Comprehensive documentation for LLMs, human maintainers, newbies, and software historians**
- **Naming conventions:** All packages are branded as `@aokiapp/reark*` for clarity and reproducibility

## Who is this for?

- LLMs (for prompt-based project generation and reproducibility)
- Human maintainers and contributors
- Newbie programmers
- Software historians and archaeologists

---

See [Getting Started](./getting-started.md) to set up and build the project.
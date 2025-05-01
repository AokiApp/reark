# Monorepo Structure

This monorepo is organized for clarity, modularity, and reproducibility, with all packages and the example app as **React projects bundled with Vite**.

## Directory Layout

```
/
├── packages
│   ├── reark                # Core React library (Vite library mode)
│   ├── reark-submodule-a    # Submodule A (depends on reark, Vite library mode)
│   └── reark-submodule-b    # Submodule B (independent, Vite library mode)
├── examples
│   └── react-app            # Example React app using all packages (Vite app mode)
├── docs                     # Project documentation
├── .github/workflows        # CI/CD workflows
├── ...                      # Root configs (see below)
```

## Key Files & Directories

- **/packages/**: All library packages, each with its own Vite config (library mode), TypeScript config, and entrypoints.
- **/examples/**: Example React app (bundled with Vite) demonstrating usage of all packages.
- **/docs/**: Comprehensive documentation for all audiences, including LLMs.
- **/tsconfig.base.json**: Shared TypeScript config.
- **/turbo.json**: Turborepo pipeline config.
- **/.eslintrc.js, .prettierrc**: Centralized linting and formatting configs.
- **/jest.config.base.js**: Shared Jest config.
- **/.github/workflows/ci.yml**: GitHub Actions workflow for CI/CD and npm publishing.

## Naming Conventions

- All packages are scoped as `@aokiapp/reark*` and branded for clarity and reproducibility.
- Example app is not published, but follows the same conventions for consistency.

## Rationale

- **Monorepo**: Enables code sharing, atomic changes, and streamlined DX.
- **Vite**: Used for all packages and apps (library mode for packages, app mode for examples).
- **npm**: Default, widely supported, and monorepo-friendly package manager.
- **Turborepo**: Task orchestration and caching for scalable builds.
- **TypeScript, ESLint, Prettier, Jest**: Modern DX and code quality, with centralized configs.

---

See [Development Workflow](./workflow.md) for daily usage and best practices.
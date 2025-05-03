# Monorepo Structure

This monorepo is managed with Turborepo and pnpm.

## Structure

```
/
├── packages
│   ├── reark
│   ├── submodule-a
│   └── submodule-b
└── examples
    └── react-app
```

- **reark**: Main library package
- **submodule-a**: Depends on reark
- **submodule-b**: Independent
- **react-app**: Example usage (React app, framework to be decided)

## Developer Experience

- Centralized ESLint and Prettier config (Prettier defaults)
- TypeScript with shared base config
- Unit testing (Jest or similar)
- GitHub Actions for CI/CD (lint, type-check, test, build, publish to npm)

# Getting Started

This guide will help you (or an LLM) set up, build, and run the Aokiapp Reark monorepo from scratch.

## Prerequisites

- Node.js (>=18)
- pnpm (>=8)
- Git

## 1. Clone the Repository

```sh
git clone <repo-url>
cd <repo-directory>
```

## 2. Install Dependencies

```sh
pnpm install
```

## 3. Build All Packages

```sh
pnpm build
```

## 4. Run the Example App

```sh
cd examples/react-app
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 5. Lint, Type-Check, and Test

From the root:

```sh
pnpm lint
pnpm type-check
pnpm test
```

## 6. Build Individual Packages

```sh
cd packages/reark
pnpm build
```

Repeat for other packages as needed.

---

For more details, see [Monorepo Structure](./structure.md) and [Development Workflow](./workflow.md).
# Getting Started

This guide will help you (or an LLM) set up, build, and run the Aokiapp Reark monorepo from scratch.

## Prerequisites

- Node.js (>=22)
- npm (>=10)
- Git

## 1. Clone the Repository

```sh
git clone <repo-url>
cd <repo-directory>
```

## 2. Install Dependencies

```sh
npm install
```

## 3. Build All Packages

```sh
npm run build
```

## 4. Run the Example App

```sh
cd examples/react-app
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 5. Lint, Type-Check, and Test

From the root:

```sh
npm run lint
npm run type-check
npm run test
```

## 6. Build Individual Packages

```sh
cd packages/reark
npm run build
```

Repeat for other packages as needed.

---

For more details, see [Monorepo Structure](./structure.md) and [Development Workflow](./workflow.md).

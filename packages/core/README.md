# @aokiapp/reark

> Unified entry point for the AokiApp Reark monorepo: Lark API utilities and React renderer in one package.

## Overview

**@aokiapp/reark** provides a single, convenient entry point for working with Lark document APIs and rendering in React. It aggregates and re-exports all public APIs from:

- [`@aokiapp/reark-lark-api`](../lark-api)
- [`@aokiapp/reark-renderer`](../renderer)

This package ensures that all required CSS for rendering is included automatically, making integration seamless for React projects.

## Key Features

- **Unified import** for Lark API utilities and React renderer components.
- **Simple credential management** for Lark API access.
- **React components** for rendering Lark documents and table of contents.
- **TypeScript support** with all relevant types re-exported.
- **Automatic CSS inclusion** for consistent, ready-to-use styling.

## Installation

```sh
npm install @aokiapp/reark
# or
yarn add @aokiapp/reark
```

> **Peer dependencies:** React 18+ or 19+, ReactDOM 18+ or 19+

## Usage

### Setting Credentials

```ts
import { setCredentials } from "@aokiapp/reark";

setCredentials("your-app-id", "your-app-secret");
```

### Fetching Document Blocks

```ts
import { fetchAllDocumentBlocks } from "@aokiapp/reark";

const blocks = await fetchAllDocumentBlocks("doc-id");
```

### Rendering a Document

```tsx
import { LarkRenderer } from "@aokiapp/reark";

<LarkRenderer blocks={blocks} />;
```

### Table of Contents

```tsx
import { TableOfContents } from "@aokiapp/reark";

<TableOfContents blocks={blocks} />;
```

## API Reference

See the [Core API Reference](../../docs/api/core.md) for a full list of exports and usage details.

- [Lark API Reference](../../docs/api/lark-api.md)
- [Renderer Reference](../../docs/api/renderer.md)

## Extension & Customization

- All types and utilities from the sub-packages are available for advanced use.
- For low-level or advanced features, import directly from the sub-packages.

## License

MIT

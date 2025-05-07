# @aokiapp/reark-lark-api

[![npm version](https://img.shields.io/npm/v/@aokiapp/reark-lark-api.svg)](https://www.npmjs.com/package/@aokiapp/reark-lark-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)

> Utilities and TypeScript types for interacting with the Lark (Feishu) API.  
> Provides a unified data-fetching and transformation layer for the reark monorepo.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [Functions](#functions)
  - [Types](#types)
- [Extension & Customization](#extension--customization)
- [Related Documentation](#related-documentation)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

`@aokiapp/reark-lark-api` provides utilities and types for interacting with the Lark (Feishu) API, focusing on:

- Fetching and processing document blocks and comments
- Downloading files
- Accessing Bitable (Base) records
- Ensuring type safety and consistency across the monorepo

**Role in Monorepo:**  
This package is used by the core, renderer, and server packages to provide a unified, type-safe data model for Lark content.

---

## Key Features

- Fetch Lark document blocks (paged or all)
- Download files and fetch comments
- Batch file download URL retrieval (with chunking/rate limit handling)
- Access Lark Bitable (Base) records
- Comprehensive TypeScript types for all API objects

---

## Installation

```bash
npm install @aokiapp/reark-lark-api
# or
yarn add @aokiapp/reark-lark-api
# or
pnpm add @aokiapp/reark-lark-api
```

---

## Usage

### 1. Authentication

Before making any API calls, set your Lark app credentials:

```ts
import { setCredentials } from "@aokiapp/reark-lark-api";

setCredentials("your-app-id", "your-app-secret");
```

### 2. Fetch Document Blocks

```ts
import {
  getDocumentBlocks,
  fetchAllDocumentBlocks,
} from "@aokiapp/reark-lark-api";

// Fetch a single page of blocks
const page = await getDocumentBlocks("doc-id");

// Fetch all blocks (handles pagination)
const allBlocks = await fetchAllDocumentBlocks("doc-id");
```

### 3. Download a File

```ts
import { getFile } from "@aokiapp/reark-lark-api";

const blob = await getFile("file-token");
// Use blob as needed (e.g., download, display)
```

### 4. Fetch Comments

```ts
import { getComments } from "@aokiapp/reark-lark-api";

const comments = await getComments("file-token");
```

### 5. Batch Download URLs

```ts
import {
  batchGetTmpDownloadUrls,
  batchGetTmpDownloadUrlsChunked,
} from "@aokiapp/reark-lark-api";

const urls = await batchGetTmpDownloadUrls(["token1", "token2"]);
const chunkedUrls = await batchGetTmpDownloadUrlsChunked(
  ["token1", "token2"],
  10,
);
```

### 6. Access Bitable (Base) Records

```ts
import { listBaseRecords } from "@aokiapp/reark-lark-api";

const records = await listBaseRecords({
  appToken: "app-token",
  tableId: "table-id",
  pageSize: 100,
});
```

---

## API Reference

### Functions

#### `setCredentials(appId: string, appSecret: string): void`

Set the Lark app credentials for all subsequent API calls.

#### `getDocumentBlocks(documentId: string, pageToken?: string): Promise<DocumentBlockResponse>`

Fetch a single page of blocks for a given document.

#### `fetchAllDocumentBlocks(documentId: string): Promise<Block[]>`

Fetch all blocks for a document, handling pagination.

#### `getFile(fileToken: string): Promise<Blob>`

Download a file as a Blob.

#### `getComments(fileToken: string): Promise<CommentListResponse>`

Fetch comments for a given file (docx).

#### `batchGetTmpDownloadUrls(fileTokens: string[]): Promise<Record<string, string>>`

Fetch temporary download URLs for multiple file tokens.

#### `batchGetTmpDownloadUrlsChunked(fileTokens: string[], batchSize?: number): Promise<Record<string, string>>`

Fetch temporary download URLs for multiple file tokens, splitting requests into chunks to avoid rate limits.

#### `listBaseRecords(params: ListBaseRecordsParams): Promise<ListBaseRecordsResponse>`

Fetch records from a Lark Bitable (Base) table.

---

### Types

#### `Block`

<details>
<summary>Click to expand</summary>

```ts
export type Block = {
  block_id: string;
  block_type: number;
  parent_id?: string;
  // ...plus all fields as per Lark API (see source for full details)
  // Includes text, style, children, etc.
};
```

- See [types/block.ts](./src/types/block.ts) for all fields and subtypes (Align, CodeLanguage, TextStyle, TextElementStyle, Link, TextRun, MentionUser, MentionDoc, Reminder, etc.)

</details>

#### `DocumentBlockResponse`

```ts
export type DocumentBlockResponse = {
  code: number;
  msg: string;
  data: {
    has_more?: boolean;
    page_token?: string;
    items: (Partial<Block> & {
      block_id?: string;
      block_type?: number;
      parent_id?: string;
    })[];
  };
};
```

#### `CommentListResponse`

```ts
export type CommentListResponse = {
  code: number;
  msg: string;
  data: {
    has_more?: boolean;
    page_token?: string;
    items: CommentData[];
  };
};
```

#### `CommentData`

```ts
export type CommentData = {
  comment_id: string;
  user_id: string;
  create_time: number;
  update_time: number;
  is_solved: boolean;
  solved_time: number;
  solver_user_id: string;
  has_more: boolean;
  page_token: string;
  is_whole: boolean;
  quote: string;
  reply_list?: ReplyList;
};
```

#### `ListBaseRecordsParams`

```ts
export type ListBaseRecordsParams = {
  appToken: string;
  tableId: string;
  viewId?: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
  sort?: string[];
  fieldNames?: string[];
  textFieldAsArray?: boolean;
  userIdType?: "open_id" | "union_id" | "user_id";
  displayFormulaRef?: boolean;
  automaticFields?: boolean;
};
```

#### `BaseRecord`

```ts
export type BaseRecord = {
  record_id: string;
  fields: Record<string, unknown>;
  created_by?: Person;
  created_time?: number;
  last_modified_by?: Person;
  last_modified_time?: number;
};
```

#### `ListBaseRecordsResponse`

```ts
export type ListBaseRecordsResponse = {
  code: number;
  msg: string;
  data: {
    items: BaseRecord[];
    page_token?: string;
    has_more?: boolean;
    total?: number;
  };
};
```

#### All other types (Align, CodeLanguage, TextStyle, etc.)

See [src/types/block.ts](./src/types/block.ts) and [src/types/api.ts](./src/types/api.ts) for exhaustive details.

---

## Extension & Customization

- **Authentication:** Use `setCredentials` to provide your Lark app credentials.
- **Advanced Usage:** You may extend or wrap API utilities for custom needs (e.g., custom error handling, logging, etc.).
- **Type Safety:** All API responses are fully typed for safe integration.

---

## Related Documentation

- [Lark API Reference (deeper details)](../../docs/api/lark-api.md)
- [Core Package API](../../docs/api/core.md)
- [Renderer Package API](../../docs/api/renderer.md)

---

## Contributing

Contributions are welcome! Please see the [monorepo root README](../../README.md) for guidelines.

- Run tests and lint before submitting PRs.
- Keep documentation and types up to date with code changes.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

---

## License

MIT © AokiApp Contributors

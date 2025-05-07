# Lark API Reference

This document describes the main exports and usage of the **@aokiapp/reark-lark-api** package.

---

## Overview

The `@aokiapp/reark-lark-api` package provides utilities and TypeScript types for interacting with the Lark (Feishu) API.  
It is responsible for fetching, processing, and transforming Lark document data for use in the renderer, server, and core packages.

- Fetch document blocks (paged or all)
- Download files and fetch comments
- Batch file download URL retrieval (with chunking/rate limit handling)
- Access Lark Bitable (Base) records
- Comprehensive TypeScript types for all API objects

---

## Main Exports

- **API Utilities:**  
  Functions for fetching Lark documents, blocks, comments, files, and Bitable records:

  - `setCredentials(appId, appSecret)`
  - `getDocumentBlocks(documentId, pageToken?)`
  - `fetchAllDocumentBlocks(documentId)`
  - `getFile(fileToken)`
  - `getComments(fileToken)`
  - `batchGetTmpDownloadUrls(fileTokens)`
  - `batchGetTmpDownloadUrlsChunked(fileTokens, batchSize?)`
  - `listBaseRecords(params)`

- **Type Definitions:**  
  Comprehensive TypeScript types for Lark API objects, including:
  - `Block`
  - `DocumentBlockResponse`
  - `CommentListResponse`
  - `ListBaseRecordsParams`
  - `BaseRecord`
  - `ListBaseRecordsResponse`
  - ...and more (see [README](../../packages/lark-api/README.md#types) for full details)

---

## Usage Example

See the [README](../../packages/lark-api/README.md#usage) for full installation and usage instructions.

```ts
import {
  setCredentials,
  fetchAllDocumentBlocks,
  getComments,
} from "@aokiapp/reark-lark-api";

setCredentials("your-app-id", "your-app-secret");

const blocks = await fetchAllDocumentBlocks("doc-id");
const comments = await getComments("file-token");
```

---

## Integration

- Used by the core, renderer, and server packages to provide a unified data model.
- Ensures type safety and consistency when working with Lark data.

---

## Advanced

- Extend or customize API utilities as needed for your application.
- Refer to the [source code](../../packages/lark-api/src/) and [README](../../packages/lark-api/README.md) for detailed type definitions and advanced usage.

---

For rendering and UI integration, see the [Renderer Reference](renderer.md).

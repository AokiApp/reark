# Core API Reference

This document describes the main exports and usage of the **@aokiapp/reark** core package.

## Overview

The core package serves as the main entry point for the AokiApp Reark monorepo. It re-exports all public APIs and types from the Lark API and Renderer packages, providing a unified interface for consumers and ensuring required CSS is included automatically.

## Main Exports

All exports from the following packages are available via `@aokiapp/reark`:

- [`@aokiapp/reark-lark-api`](../../packages/lark-api)
- [`@aokiapp/reark-renderer`](../../packages/renderer)

### Key Functions (from Lark API)

- **setCredentials(appId: string, appSecret: string): void**  
  Set Lark API credentials for use throughout the application.

- **fetchAllDocumentBlocks(documentId: string): Promise<Block[]>**  
  Fetch all blocks for a given document, handling pagination.

- **getDocumentBlocks(documentId: string, pageToken?: string): Promise<DocumentBlockResponse>**  
  Fetch a page of blocks for a given document.

- **getFile(fileToken: string): Promise<Blob>**  
  Download a file by its token.

- **getComments(fileToken: string): Promise<CommentListResponse>**  
  Fetch comments for a given file (docx).

- **batchGetTmpDownloadUrls(fileTokens: string[]): Promise<Record<string, string>>**  
  Fetch temporary download URLs for multiple file tokens.

- **batchGetTmpDownloadUrlsChunked(fileTokens: string[], batchSize?: number): Promise<Record<string, string>>**  
  Fetch temporary download URLs in chunks to avoid rate limits.

- **listBaseRecords(params: ListBaseRecordsParams): Promise<ListBaseRecordsResponse>**  
  Fetch records from a Lark Base (Bitable) table.

### Key Components (from Renderer)

- **LarkRenderer**  
  React component for rendering Lark document blocks.

- **TableOfContents**  
  React component for rendering a table of contents from blocks.

### Types

All types from the Lark API and Renderer packages are re-exported for convenience, including:

- `Block`, `DocumentBlockResponse`, `CommentListResponse`, `ListBaseRecordsParams`, `ListBaseRecordsResponse`
- `LarkApiContextValue`
- And more

## Usage Example

```tsx
import {
  setCredentials,
  fetchAllDocumentBlocks,
  LarkRenderer,
  TableOfContents
} from "@aokiapp/reark";

setCredentials(process.env.LARK_APP_ID, process.env.LARK_APP_SECRET);

const blocks = await fetchAllDocumentBlocks("doc-id");

// In your React component:
<LarkRenderer blocks={blocks} />
<TableOfContents blocks={blocks} />
```

## Extension Points

- All types and utilities from the sub-packages are available for advanced use.
- For advanced features, you may import directly from the Lark API or Renderer packages.

---

For more details, see the [Lark API Reference](lark-api.md) and [Renderer Reference](renderer.md).

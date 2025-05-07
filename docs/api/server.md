# @aokiapp/reark-server – API Reference

This document provides a detailed API reference for the **@aokiapp/reark-server** package. For a high-level overview, installation, and usage instructions, see the [package README](../../packages/server/README.md).

---

## Overview

**@aokiapp/reark-server** offers backend utilities for server-side rendering (SSR), asset management, and data aggregation for Lark (Feishu) documents. It is designed for seamless integration with frameworks like Next.js and works in concert with the core, lark-api, and renderer packages.

---

## Main Exports

- **getLarkInitialDataForSSR(documentId, publicDir, publicUrlBase?)**  
  Fetches and prepares Lark document data for SSR, handling asset storage and URL mapping.

- **LarkInitialData**  
  Interface describing the SSR data structure.

- **setCredentials(appId, appSecret)**  
  Re-exported from `@aokiapp/reark-lark-api` for convenience.

---

## API Reference

### getLarkInitialDataForSSR

```ts
async function getLarkInitialDataForSSR(
  documentId: string,
  publicDir: string,
  publicUrlBase: string = "/lark-files/",
): Promise<LarkInitialData>;
```

- **documentId**: Lark document ID (string)
- **publicDir**: Directory to store downloaded files (string)
- **publicUrlBase**: Public URL prefix for files (string, default: `/lark-files/`)

**Returns:**  
A Promise resolving to a `LarkInitialData` object.

#### LarkInitialData

```ts
export interface LarkInitialData {
  version: number;
  blocks: Block[];
  comments: CommentData[];
  files: Record<string, string>; // fileToken → public URL
}
```

- `blocks`: Array of Lark document blocks (see [@aokiapp/reark-lark-api](../../packages/lark-api/README.md) for types)
- `comments`: Array of comment data
- `files`: Map of file tokens to public URLs

#### Behavior

- Downloads and caches files referenced in the document.
- Skips already-downloaded files.
- Handles errors gracefully (logs and continues).
- Fetches comments for the document.

---

### setCredentials

```ts
function setCredentials(appId: string, appSecret: string): void;
```

Sets Lark API credentials for all subsequent requests.

---

## Usage Example

```ts
import { setCredentials } from "@aokiapp/reark-lark-api";
import { getLarkInitialDataForSSR } from "@aokiapp/reark-server";

setCredentials(process.env.LARK_APP_ID, process.env.LARK_APP_SECRET);

const initialData = await getLarkInitialDataForSSR(
  documentId,
  "public/lark-files",
  "/lark-files/",
);
```

---

## Integration

- Use in Next.js `getServerSideProps` or API routes for dynamic document rendering.
- Works seamlessly with [@aokiapp/reark](../../packages/core/README.md) and [@aokiapp/reark-renderer](../../packages/renderer/README.md).
- See [example apps](../../examples/) for full integration patterns.

---

## Related Documentation

- [@aokiapp/reark-server README](../../packages/server/README.md)
- [@aokiapp/reark-lark-api](../../packages/lark-api/README.md)
- [@aokiapp/reark-renderer](../../packages/renderer/README.md)
- [Monorepo README](../../README.md)
- [Example Apps](../../examples/)

---
